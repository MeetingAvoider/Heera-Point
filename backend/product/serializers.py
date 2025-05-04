from rest_framework import serializers
from urllib.parse import unquote
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'image', 'category', 'rating', 'numReviews', 'createdAt']

    def get_image(self, obj):
        name = obj.image.name if obj.image else ''
        # Decode percent-encoded name
        decoded = unquote(name)
        # If decoded name is a full URL, return it directly
        if decoded.startswith('http'):
            return decoded
        # Fall back to media URL
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return None
