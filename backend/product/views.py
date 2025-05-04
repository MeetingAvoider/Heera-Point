from .models import Product
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import permission_classes, api_view
from django.db.models import Q
import google.generativeai as genai
import json
from django.http import JsonResponse

# Configure the Gemini API
genai.configure(api_key="AIzaSyBArAt3Mz6GTZ1M5DumBI6VboJYWcCxaCA")


class ProductView(APIView):

    def get(self, request):
        query = request.query_params.get('keyword', '')
        category = request.query_params.get('category', '')
        
        if category:
            products = Product.objects.filter(category=category)
        elif query:
            products = Product.objects.filter(
                Q(name__icontains=query) | 
                Q(description__icontains=query)
            )
        else:
            products = Product.objects.all()
            
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_product_categories(request):
    """Get all product categories"""
    categories = dict(Product.CATEGORY_CHOICES)
    formatted_categories = [
        {"id": key, "name": value} 
        for key, value in categories.items()
    ]
    return Response(formatted_categories)


@api_view(['GET'])
def get_products_by_category(request, category):
    """Get products by category"""
    products = Product.objects.filter(category=category)
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)


class ProductDetailView(APIView):

    def get(self, request, pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductCreateView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        user = request.user
        data = request.data

        product = {
            "name": data["name"],
            "description": data["description"],
            "price": data["price"],
            "stock": data["stock"],
            "image": data["image"],
            "category": data.get("category", "smart_gadgets"),
            "rating": data.get("rating", 0),
            "numReviews": data.get("numReviews", 0),
        }

        serializer = ProductSerializer(data=product, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProductDeleteView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
            product.delete()
            return Response({"detail": "Product successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class ProductEditView(APIView):
    
    permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk):
        data = request.data
        product = Product.objects.get(id=pk)
        
        updated_product = {
            "name": data["name"] if data["name"] else product.name,
            "description": data["description"] if data["description"] else product.description,
            "price": data["price"] if data["price"] else product.price,
            "stock": data["stock"],
            "image": data["image"] if data["image"] else product.image,
            "category": data.get("category", product.category),
            "rating": data.get("rating", product.rating),
            "numReviews": data.get("numReviews", product.numReviews),
        }

        serializer = ProductSerializer(product, data=updated_product)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def nlp_search(request):
    """
    Search products using natural language processing with Google Gemini API
    """
    try:
        # Get the search query from the request
        search_query = request.data.get('query', '')
        if not search_query:
            return Response({"detail": "Please provide a search query"}, status=400)
        
        # Get all products
        products = Product.objects.all()
        
        # Prepare product data for the model
        product_data = []
        for product in products:
            product_data.append({
                'id': product.id,
                'name': product.name,
                'description': product.description or "",
                'category': product.category,
                'price': float(product.price)
            })
        
        # Create a prompt for the Gemini model
        prompt = f"""
        I have a list of products from an e-commerce store selling mobile and electronic accessories.
        Product list: {json.dumps(product_data)}
        
        A user is searching for: "{search_query}"
        
        Return a JSON array of product IDs that best match this search query. 
        Group them by relevance and category. Format should be:
        {{
            "relevantProducts": [list of most relevant product IDs],
            "categorySuggestions": {{
                "category_id_1": [list of product IDs in this category],
                "category_id_2": [list of product IDs in this category],
                ...
            }}
        }}
        Return only the JSON object, no additional text.
        """
        
        # Call the Gemini API with correct model name
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        try:
            # Parse the response - handle the updated response format
            result_text = response.text
            # Clean up the response if it contains markdown code blocks
            if "```json" in result_text:
                result_text = result_text.split("```json")[1].split("```")[0].strip()
            elif "```" in result_text:
                result_text = result_text.split("```")[1].split("```")[0].strip()
                
            result = json.loads(result_text)
            
            # Get the products based on returned IDs
            relevant_ids = result.get('relevantProducts', [])
            relevant_products = Product.objects.filter(id__in=relevant_ids)
            relevant_serializer = ProductSerializer(relevant_products, many=True, context={'request': request})
            
            # Get category suggestions
            category_suggestions = {}
            for category, product_ids in result.get('categorySuggestions', {}).items():
                category_products = Product.objects.filter(id__in=product_ids)
                category_serializer = ProductSerializer(category_products, many=True, context={'request': request})
                category_suggestions[category] = category_serializer.data
            
            return Response({
                'relevantProducts': relevant_serializer.data,
                'categorySuggestions': category_suggestions,
                'query': search_query
            })
        except json.JSONDecodeError:
            # If we couldn't parse the JSON, fall back to a standard search
            products = Product.objects.filter(
                Q(name__icontains=search_query) | 
                Q(description__icontains=search_query)
            )
            serializer = ProductSerializer(products, many=True, context={'request': request})
            
            # Organize by category
            categories = {}
            for product in products:
                if product.category not in categories:
                    categories[product.category] = []
                categories[product.category].append(product.id)
            
            # Get products by category
            category_suggestions = {}
            for category, product_ids in categories.items():
                category_products = Product.objects.filter(id__in=product_ids)
                category_serializer = ProductSerializer(category_products, many=True, context={'request': request})
                category_suggestions[category] = category_serializer.data
            
            return Response({
                'relevantProducts': serializer.data,
                'categorySuggestions': category_suggestions,
                'query': search_query
            })
            
    except Exception as e:
        # Return a meaningful error message
        error_message = str(e)
        return Response({"detail": error_message}, status=500)
