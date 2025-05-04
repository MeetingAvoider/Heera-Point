from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = (
        ('chargers_cables', 'Chargers & Cables'),
        ('audio_accessories', 'Audio Accessories'),
        ('phone_cases', 'Phone Cases & Covers'),
        ('screen_protection', 'Screen Protection'),
        ('car_accessories', 'Car Accessories'),
        ('smart_gadgets', 'Smart Gadgets'),
        ('camera_lenses', 'Camera Lenses & Enhancers'),
        ('cleaning_maintenance', 'Cleaning & Maintenance'),
        ('power_banks', 'Power Banks & Batteries'),
        ('adapters_converters', 'Adapters & Converters'),
    )
    
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.IntegerField(default=0)  # Changed from boolean to integer for quantity
    image = models.ImageField(null=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='smart_gadgets')
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True, default=0)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name