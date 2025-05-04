import os
import django
import sys

# Set up Django environment properly
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_project.settings')
django.setup()

# Now you can import your models
from product.models import Product

# Clear existing products to start fresh
Product.objects.all().delete()

# Dummy electronic gadgets data by category with images
products_data = [
    # Smartphones & Accessories
    {
        "name": "iPhone 14 Pro Smart Case",
        "description": "Premium silicone case with MagSafe compatibility for iPhone 14 Pro. Provides excellent protection while maintaining the sleek profile of your device.",
        "price": 2499.99,
        "stock": 50,
        "category": "phone_cases",
        "rating": 4.7,
        "numReviews": 128,
        "image": "https://images.meesho.com/images/products/439898588/uw17d_1200.jpg"
    },
    {
        "name": "Samsung Galaxy S23 Ultra Cover",
        "description": "Military-grade protection for your Samsung Galaxy S23 Ultra. Features a transparent back to showcase your phone's design with reinforced corners for drop protection.",
        "price": 1899.99,
        "stock": 35,
        "category": "phone_cases",
        "rating": 4.5,
        "numReviews": 95,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9gKdzTPajMfiqfMaOZsx1FdFs3opkA0eaw&s"
    },
    
    # Chargers & Cables
    {
        "name": "100W GaN Fast Charger",
        "description": "Compact 100W GaN charger with 4 ports (2x USB-C, 2x USB-A). Charge your laptop, tablet, and phones simultaneously at full speed.",
        "price": 3499.99,
        "stock": 60,
        "category": "chargers_cables",
        "rating": 4.8,
        "numReviews": 210,
        "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR9W7e_7jkXNp5SEfiNmsZfSyNV3SlWQLOJdsPHIWvfkFBg1j2qGggNJB3TIHR1LMXtNvpHJ_NIrkxgw876QnuRfImol3PNLV6tMFD1TIWu_csqYyUknu9TeA"
    },
    {
        "name": "Braided USB-C to Lightning Cable 2m",
        "description": "Premium nylon braided cable with fast charging and data transfer capabilities. Extra durable with reinforced connectors and 2m length for convenience.",
        "price": 1299.99,
        "stock": 100,
        "category": "chargers_cables",
        "rating": 4.6,
        "numReviews": 175,
        "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSiQLNSF-KsW5iUfAaFOAx9Zqd-ur4_I5RSdwoeerpgjC0r6cosFJ_F16hV-XNWMJ_iQZ4LB5SYDaHKYh5mG0YHPiBr6ehbsO3x6m4zLk2D6MnMAT8Rl-Xu"
    },
    {
        "name": "3-in-1 Magnetic Charging Stand",
        "description": "Elegant stand for wirelessly charging your smartphone, earbuds, and smartwatch simultaneously. Compatible with all Qi-enabled devices.",
        "price": 3999.99,
        "stock": 25,
        "category": "chargers_cables",
        "rating": 4.5,
        "numReviews": 85,
        "image": "https://www.portronics.com/cdn/shop/files/Image1_b897695f-dc34-473c-a1ea-16a64257a434.jpg?v=1707138484&width=533"
    },
    
    # Audio Accessories
    {
        "name": "Active Noise Cancelling Earbuds Pro",
        "description": "True wireless earbuds with industry-leading active noise cancellation, transparency mode, and 8 hours of battery life. IPX7 waterproof rating.",
        "price": 6999.99,
        "stock": 40,
        "category": "audio_accessories",
        "rating": 4.8,
        "numReviews": 320,
        "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTLV_XDHPQmvLM0XVJ4BljCnIDdt9KKMNgncSMSoxPU5zL7crSGD6q3GOg_xJLrsASijNQHSKga9196fca3C5l9ZD8YYzrCuBI9Nv5sPXyHurqWXikNCN0c"
    },
    {
        "name": "Portable Bluetooth Speaker 20W",
        "description": "Powerful 20W Bluetooth speaker with 360° sound and 24-hour battery life. IPX7 waterproof and dustproof with built-in microphone for calls.",
        "price": 3499.99,
        "stock": 55,
        "category": "audio_accessories",
        "rating": 4.7,
        "numReviews": 145,
        "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRla0KAwRzf3TxdYrR2eoLTZ9nMpnI99raiOFqr5EmuI1Odsplp8qS6kXH4Zd1vmaR53TtJ2m7-g0tgNWTo1FdVn2MrHKOao524bT7BBnM"
    },
    {
        "name": "Studio Quality Headphones",
        "description": "Over-ear headphones with premium sound quality, adaptive EQ, and up to 40 hours of battery life. Features memory foam ear cushions for long-wearing comfort.",
        "price": 8999.99,
        "stock": 20,
        "category": "audio_accessories",
        "rating": 4.9,
        "numReviews": 210,
        "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR1iYifNwjvpJWkEo6xLoa5V_IwSkoOaVCIuUHxcTvthzRRUrem5gaJHD8ut6Nm0LurEmkw4lInzxTU8hX6u1hClHTLlgOx6nDUuAQHV7e_yc8drnkLuApCiwyudZYqBWodWTxtBD4v7A&usqp=CAc"
    },
    
    # Screen Protection
    {
        "name": "Ultra Clear Tempered Glass (2-Pack)",
        "description": "9H hardness tempered glass screen protector with oleophobic coating. Case-friendly design with installation frame for bubble-free application.",
        "price": 899.99,
        "stock": 200,
        "category": "screen_protection",
        "rating": 4.5,
        "numReviews": 340,
        "image": "https://m.media-amazon.com/images/I/31qWIZAke0L.jpg"
    },
    {
        "name": "Privacy Screen Protector",
        "description": "Anti-spy tempered glass that prevents viewing from side angles. Maintains full clarity when viewed directly and blocks blue light.",
        "price": 1499.99,
        "stock": 75,
        "category": "screen_protection",
        "rating": 4.3,
        "numReviews": 92,
        "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS0SupXQfRk2u5d_-4LuwO2zaIapao0NzZJvS2c87Xsw28XVWnLxMm_Zz0797PD1tft0Mo4jS_kA9NLGiPs6Opv4In6OvMINw_wcV2d4U_VKkGhV9fwUh7DxA"
    },
    
    # Car Accessories
    {
        "name": "Magnetic Car Phone Mount",
        "description": "Strong magnetic car mount with 360° rotation. Compatible with all smartphones and easy one-hand operation.",
        "price": 1299.99,
        "stock": 80,
        "category": "car_accessories",
        "rating": 4.4,
        "numReviews": 185,
        "image": "https://m.media-amazon.com/images/I/51LlPh-HFdL.jpg"
    },
    {
        "name": "Car Charger with Dual USB-C PD 45W",
        "description": "Fast charging car adapter with one 45W USB-C PD port and one 20W USB-C port. Compatible with all modern smartphones and tablets.",
        "price": 1799.99,
        "stock": 65,
        "category": "car_accessories",
        "rating": 4.6,
        "numReviews": 125,
        "image": "https://m.media-amazon.com/images/I/41LdieqpLxL.jpg"
    },
    
    # Smart Gadgets
    {
        "name": "Smart Watch Series 7",
        "description": "Advanced smartwatch with health tracking, ECG, always-on display, and 18-hour battery life. Water-resistant to 50 meters with cellular connectivity.",
        "price": 12999.99,
        "stock": 30,
        "category": "smart_gadgets",
        "rating": 4.8,
        "numReviews": 275,
        "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRwmXlxHcRdEBdgAWwQ-oqNUpEOEx1VRc82Adscv38Ka1hMY7KdfLNwuRBtDWwMId2hD3TohJEm89Ek9BJZ9uCC8EW62xSet4HI3eXWoj0"
    },
    {
        "name": "Smart Tracker (4-Pack)",
        "description": "Bluetooth item finders to locate your keys, wallet, or bags. Features replaceable battery with 1-year life and crowd-finding network.",
        "price": 2499.99,
        "stock": 90,
        "category": "smart_gadgets",
        "rating": 4.5,
        "numReviews": 185,
        "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRdap56EdiA1xjf8_kUXqRQzLB9u9AzoiCic4_aEs5NPsDFwFMx8wFFSsmMExuvxTrlmEbl1fHXfVqMwRjadDCvJ1D04d9jdW4rlB3LT67tlmN406vzrUlP"
    },
    {
        "name": "Smart Home Hub with Voice Assistant",
        "description": "Central smart home controller with voice assistant, 7-inch display, and multi-room audio capabilities. Controls lights, cameras, thermostats and more.",
        "price": 4999.99,
        "stock": 25,
        "category": "smart_gadgets",
        "rating": 4.6,
        "numReviews": 135,
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQMQ59uM4lhybyymysCsB-axoLJbMKI6SEDqG4ZX16Fr7sHO4VZtlJhB6t0jc3DDmTKYoFAGlP9czPo3CeEOoKb256Pdtn_lksbSnDzKlmtHtwE-AA8-WN1OXg"
    },
    
    # Camera Accessories
    {
        "name": "Smartphone Photography Kit",
        "description": "Complete kit with wide angle, macro, and fisheye lenses, mini tripod, and LED light. Universal compatibility with all smartphones.",
        "price": 3499.99,
        "stock": 40,
        "category": "camera_lenses",
        "rating": 4.4,
        "numReviews": 88,
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS6Q2cEz1JZ-cjo__MG1IA37s5V22htLO44w-oA-hIdas5e_6zM1v3_IKBQ2rf08IxYgcf1LZ0TEeSVOQlgadzqTxS5BxPEgpM-T8RaXbmP-rGcDrJCg8gSEw"
    },
    {
        "name": "Vlogging Kit with Microphone",
        "description": "Professional smartphone video kit with directional microphone, LED light, and extendable tripod with Bluetooth remote.",
        "price": 4999.99,
        "stock": 20,
        "category": "camera_lenses",
        "rating": 4.7,
        "numReviews": 68,
        "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQFgiIRDj9qnMWpctPBbtTVi11EMsutQ8s5lXOrD2yCYaiimDaELPNvuh0js3kLozy2uj99AfndcsGUe2Rk73FdfWNAMAMRNaKf87QQw6rP7p-kdZf9b7kFLQ"
    },
    
    # Cleaning & Maintenance
    {
        "name": "Electronics Cleaning Kit",
        "description": "Complete kit with anti-static microfiber cloths, screen cleaning solution, compressed air duster, and cleaning brushes for all your devices.",
        "price": 1199.99,
        "stock": 100,
        "category": "cleaning_maintenance",
        "rating": 4.6,
        "numReviews": 220,
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSPoR_nXrzfJgMrdSbaPrt-_O6Z1MmeJHmE67-XZoVwasC0vsPoTLiMTJ1ssfPFTCbnY5b4XmEH5nPkuzHxxOTDUF3_VLzE4CUg7JwmGPstWFO7_1DvV0I7w"
    },
    {
        "name": "UV Phone Sanitizer & Wireless Charger",
        "description": "Dual-function device that sanitizes your phone with UV-C light while wirelessly charging it. Kills 99.9% of germs in 10 minutes.",
        "price": 2999.99,
        "stock": 35,
        "category": "cleaning_maintenance",
        "rating": 4.5,
        "numReviews": 95,
        "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQqEd3EOgUacqrgApaW7S2z_C1FhoAbS7J952Yjdzo_jX7cj9pK577wMCjBiLso7ZGFSldwkJzw-bjbTXR7l9ihSV8JHGEN22n5Mh01b2VLp1dwDOpWZZIJEw"
    },
    
    # Power Banks
    {
        "name": "Power Bank 26800mAh with 65W PD",
        "description": "High-capacity power bank with 65W Power Delivery for laptops, tablets, and phones. Features 2 USB-C and 1 USB-A port with LCD display.",
        "price": 4999.99,
        "stock": 45,
        "category": "power_banks",
        "rating": 4.8,
        "numReviews": 310,
        "image": "https://eu.baseus.com/cdn/shop/files/Baseus_Amblight_Power_Bank_65W_26800mAh_1_800x.jpg?v=1698751586"
    },
    {
        "name": "Slim Power Bank 10000mAh",
        "description": "Ultra-compact power bank with built-in cables for both iPhone and Android. Perfect for travel with 10000mAh capacity and fast charging.",
        "price": 2499.99,
        "stock": 75,
        "category": "power_banks",
        "rating": 4.5,
        "numReviews": 145,
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ7yshrGaQAc0tfCl8p-j6wJ1znUclH5FNighm3OT6J51F1d7kw9emzmzC4D1DPcyfztR6ikRsw8K-jXeu59snvjJsMiNp7-aEZYIIikRc"
    },
    {
        "name": "Solar Power Bank 25000mAh",
        "description": "Outdoor power bank with solar charging capability, built-in flashlight, and IP67 waterproof rating. Charges up to 3 devices simultaneously.",
        "price": 3999.99,
        "stock": 30,
        "category": "power_banks",
        "rating": 4.3,
        "numReviews": 88,
        "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTAbmmr1zkEwQ2KZ5mxKmREUHMMP0maX2BjO0sIPyfAjkr-EvrSHkJVLMnZdedmRxy3szo4gGBxQkDUE8pg5R7MVXQVzB7_xIkw-O2eg7eOJG3sjloDqdPJGQ"
    },
    
    # Adapters & Converters
    {
        "name": "USB-C Hub 11-in-1",
        "description": "Comprehensive USB-C hub with HDMI, VGA, Ethernet, SD/microSD card readers, 3 USB-A ports, 2 USB-C ports, and 3.5mm audio jack.",
        "price": 3999.99,
        "stock": 50,
        "category": "adapters_converters",
        "rating": 4.7,
        "numReviews": 165,
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYfj3rfr9-5GWAjT36GXVRKimCiORQvFITw3_ZkyUIM3p53c-1bm6d0DLKq1L9tUCdShNEmQVqiKsl_jABIvo9e5X9vcecKMtTibE48VR-Y5cG2bjUSCZ0"
    },
    {
        "name": "HDMI to USB-C Adapter 4K@60Hz",
        "description": "High-speed adapter for connecting HDMI displays to USB-C devices. Supports 4K@60Hz and HDR with plug-and-play functionality.",
        "price": 1699.99,
        "stock": 85,
        "category": "adapters_converters",
        "rating": 4.6,
        "numReviews": 110,
        "image": "https://m.media-amazon.com/images/I/61wXUQzvpjL.jpg"
    }
]

# Add products to database
count = 0
print("Attempting to add products...")
print(f"Found {Product.objects.count()} existing products in database")

for product_data in products_data:
    # Only add if a product with this name doesn't already exist
    if not Product.objects.filter(name=product_data["name"]).exists():
        try:
            product = Product(**product_data)
            product.save()
            print(f"Added product: {product_data['name']}")
            count += 1
        except Exception as e:
            print(f"Error adding product {product_data['name']}: {str(e)}")
            print(f"Product data: {product_data}")
    else:
        print(f"Product already exists: {product_data['name']}")

print(f"Finished adding {count} dummy products!")
print(f"Total products in database now: {Product.objects.count()}")