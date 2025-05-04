# views.py

from django.shortcuts import render, get_object_or_404, redirect
from .models import BlogPost, Event, Product
from .forms import BlogPostForm, EventForm

# Blog Views

def homepage(request):
posts = BlogPost.objects.all()
return render(request, 'blog/home.html', {'posts': posts})

def post_detail(request, id):
post = get_object_or_404(BlogPost, id=id)
return render(request, 'blog/post_detail.html', {'post': post})

def add_post(request):
if request.method == 'POST':
form = BlogPostForm(request.POST)
if form.is_valid():
form.save()
return redirect('home')
else:
form = BlogPostForm()
return render(request, 'blog/add_post.html', {'form': form})

def search(request):
query = request.GET.get('q')
results = BlogPost.objects.filter(title\_\_icontains=query) if query else []
return render(request, 'blog/search.html', {'results': results, 'query': query})

# Event Views

def event_list(request):
events = Event.objects.all()
return render(request, 'events/home.html', {'events': events})

def event_detail(request, id):
event = get_object_or_404(Event, id=id)
return render(request, 'events/event_detail.html', {'event': event})

def create_event(request):
if request.method == 'POST':
form = EventForm(request.POST)
if form.is_valid():
form.save()
return redirect('event_list')
else:
form = EventForm()
return render(request, 'events/create_event.html', {'form': form})

# E-commerce Views

def product_list(request):
products = Product.objects.all()
return render(request, 'store/home.html', {'products': products})

def product_detail(request, id):
product = get_object_or_404(Product, id=id)
return render(request, 'store/product_detail.html', {'product': product})

def cart(request):
return render(request, 'store/cart.html')
