const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

// Import models
const Seller = require("./models/sellerSchema");
const Product = require("./models/productSchema");

const sampleProducts = [
    {
        productName: "SAMSUNG Galaxy S22 5G (Phantom White, 128 GB)  (8 GB RAM)",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Mobile Phones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/5/r/x/-original-imagth5xf4shxcuv.jpeg?q=70",
        category: "Electronics",
        description: "Explore a new range of night photography features on this Samsung Galaxy S22 5G smartphone. Built with impressive software and hardware, this phone is a game-changer.",
        tagline: "New Arrival",
        quantity: 1,
    },
    {
        productName: "Xiaomi 12 Pro 5G (Opera Mauve, 256 GB)  (12 GB RAM)",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Mobile Phones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/v/c/x/-original-imagqmtffg9sjjp6.jpeg?q=70",
        category: "Electronics",
        description: "Treat your inner tech geek with this Xiaomi 12 Pro 5G mobile that surprises you with its flawless performance.",
        tagline: "New Arrival",
        quantity: 1,
    },
    {
        productName: "REDMI Note 12 Pro 5G (Stardust Purple, 128 GB)  (6 GB RAM)",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Mobile Phones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/r/o/o/-original-imaghkvuzxkcna4n.jpeg?q=70",
        category: "Electronics",
        description: "The Redmi Note 12 Pro 5G has incredible features and provides gorgeous photographs and a faultless user experience.",
        tagline: "New Arrival",
        quantity: 1,
    },
    {
        productName: "ASUS Vivobook 15 Core i3 11th Gen - (8 GB/256 GB SSD) Thin and Light Laptop",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Laptops",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/computer/r/e/f/-original-imagrgprbhchwgve.jpeg?q=70",
        category: "Electronics",
        description: "The outstanding Asus VivoBook 15 laptop offers fantastic efficiency and stunning aesthetics.",
        tagline: "Limited Stock",
        quantity: 1,
    },
    {
        productName: "DELL Core i5 12th Gen - (8 GB/512 GB SSD) New Inspiron 15 Laptop",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Laptops",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/computer/n/o/s/-original-imaghzah9mjvukjz.jpeg?q=70",
        category: "Electronics",
        description: "DELL Core i5 12th Gen Thin and Light Laptop with Windows 11 Home.",
        tagline: "Limited Stock",
        quantity: 1,
    },
    {
        productName: "ASUS ROG Strix G15 Ryzen 7 Octa Core - Gaming Laptop",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Laptops",
        productImage: "https://rukminim2.flixcart.com/image/416/416/l3vxbbk0/computer/g/u/y/-original-imagewgtfgzf8fdd.jpeg?q=70",
        category: "Electronics",
        description: "Enjoy an immersive gaming experience on the ASUS ROG Strix G15 Gaming Laptop.",
        tagline: "Limited Stock",
        quantity: 1,
    },
    {
        productName: "beatXP Marv Neo 1.85'' HD Display Bluetooth Calling Smartwatch",
        price: { mrp: 6999, cost: 4049, discountPercent: 42 },
        subcategory: "Smart Watches",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/a/0/j/4-6-bxio2003-android-ios-beatxp-yes-original-imagt9fsjarfyhfm.jpeg?q=70",
        category: "Electronics",
        description: "High-performance and robust, the beatXP Marv Neo Smartwatch is an excellent addition to your watch collection.",
        tagline: "Best Seller",
        quantity: 1,
    },
    {
        productName: "NOVA NHP 8106 Hair Dryer (1400 W, Black)",
        price: { mrp: 1899, cost: 1124, discountPercent: 40 },
        subcategory: "Trimmers, Dryers & more",
        productImage: "https://rukminim2.flixcart.com/image/416/416/khtghow0pkrrdj-0/hair-dryer/p/o/0/nhp-8106-nova-original-imafxtddk7rdercf.jpeg?q=70",
        category: "Personal Care Appliances",
        description: "Powerful and efficient hair styling tool for both personal and professional use.",
        tagline: "Kubra, Nova & more",
        quantity: 1,
    },
    {
        productName: "Longway Speedy 300 mm Energy Saving 3 Blade Table Fan",
        price: { mrp: 2250, cost: 1199, discountPercent: 46 },
        subcategory: "Table Fans",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/fan/s/i/r/speedy-230-1-table-fan-300-longway-original-imagpgp5kzufdcxj.jpeg?q=70",
        category: "Home & Kitchen",
        description: "Perfect size fan for use on a table, desk or in an RV. Whisper quiet, powerful airflow.",
        tagline: "Top Selling",
        quantity: 1,
    },
    {
        productName: "boAt Rockerz 255 Pro+ Bluetooth Headset (Active Black)",
        price: { mrp: 2990, cost: 1199, discountPercent: 59 },
        subcategory: "Headphones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/l31x2fk0/headphone/a/s/h/-original-image9ehehz8amg2.jpeg?q=70",
        category: "Electronics",
        description: "Power-packed in-ear wireless neckband headphone with Bluetooth V5.0 and up to 60 hours playtime.",
        tagline: "Grab Now!",
        quantity: 1,
    },
    {
        productName: "SAMSUNG Galaxy F13 (Sunrise Copper, 64 GB)  (4 GB RAM)",
        price: { mrp: 14999, cost: 9199, discountPercent: 38 },
        subcategory: "Mobile Phones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/x/x/s/-original-imagfhu6dcpdnqkh.jpeg?q=70",
        category: "Electronics",
        description: "Features a terrific 16.62 cm FHD+ LCD Display and a 50 MP Triple Camera setup.",
        tagline: "New Arrival",
        quantity: 1,
    },
    {
        productName: "APPLE iPhone 13 (Midnight, 128 GB)",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Mobile Phones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/ktketu80/mobile/s/l/c/iphone-13-mlpf3hn-a-apple-original-imag6vzz5qvejz8z.jpeg?q=70",
        category: "Electronics",
        description: "Advanced dual-camera system, lightning-fast A15 Bionic chip, big leap in battery life.",
        tagline: "New Arrival",
        quantity: 1,
    },
    {
        productName: "NIKON Z 50 Mirrorless Camera Body with 16-50mm Lens",
        price: { mrp: 1200, cost: 840, discountPercent: 30 },
        subcategory: "Cameras",
        productImage: "https://rukminim2.flixcart.com/image/312/312/k5o7r0w0/dslr-camera/z/h/4/z-50-z-50-nikon-original-imafzasjz33kaa8k.jpeg?q=70",
        category: "Electronics",
        description: "Capture stunning photos and videos with this high-resolution digital camera.",
        tagline: "Best Seller",
        quantity: 1,
    },
    {
        productName: "Prestige PKOSS Electric Kettle (1.5 L, Silver, Black)",
        price: { mrp: 1195, cost: 717, discountPercent: 40 },
        subcategory: "Electric Kettles",
        productImage: "https://rukminim2.flixcart.com/image/612/612/kjlrb0w0/electric-kettle/g/h/w/prestige-prestige-pkoss-pkoss-1-5-original-imafz4wtzxhkau3g.jpeg?q=70",
        category: "Home & Kitchen",
        description: "Handy appliance to boil water, make instant noodles, packet soup, coffee and green tea.",
        tagline: "Deal of the day",
        quantity: 1,
    },
    {
        productName: "Men Printed Round Neck Cotton Blend White T-Shirt",
        price: { mrp: 499, cost: 166, discountPercent: 66 },
        subcategory: "T-Shirts",
        productImage: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/f/i/j/s-twtrnful-d108-tripr-original-imags8h2wffceyvh.jpeg?q=70",
        category: "Sports & Fitness",
        description: "Stay cool and stylish with this really cool T-Shirt.",
        tagline: "Deal of the Day",
        quantity: 1,
    },
    {
        productName: "POCO C51 (Power Black, 64 GB)  (4 GB RAM)",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Mobile Phones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/o/t/a/c51-mzb0e6din-poco-original-imagzdzzraqzsrzc.jpeg?q=70",
        category: "Electronics",
        description: "MediaTek Helio G36 octa-core Processor with Turbo RAM function for great performance.",
        tagline: "New Arrival",
        quantity: 1,
    },
    {
        productName: "vivo T2x 5G (Aurora Gold, 128 GB)  (8 GB RAM)",
        price: { mrp: 19999, cost: 14199, discountPercent: 30 },
        subcategory: "Mobile Phones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/c/s/x/-original-imagzjhwaaewgj8r.jpeg?q=70",
        category: "Electronics",
        description: "Exceptional performance with 7 nm 5G CPU and 50 MP main camera.",
        tagline: "New Arrival",
        quantity: 1,
    },
    {
        productName: "APPLE iPhone 14 (Blue, 128 GB)",
        price: { mrp: 69999, cost: 64199, discountPercent: 30 },
        subcategory: "Mobile Phones",
        productImage: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
        category: "Electronics",
        description: "Best smartphone in this price range with excellent build quality, performance and Camera.",
        tagline: "New Arrival",
        quantity: 1,
    },
];

const seedDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        // Check if products already exist
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            console.log(`Database already has ${existingProducts} products. Skipping seed.`);
            console.log("To re-seed, drop the products collection first.");
            process.exit(0);
        }

        // Create a default seller
        const existingSeller = await Seller.findOne({ email: "seller@shopcart.com" });
        let seller;

        if (existingSeller) {
            seller = existingSeller;
            console.log("Default seller already exists.");
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("seller123", salt);

            seller = await Seller.create({
                name: "ShopCart Official",
                email: "seller@shopcart.com",
                password: hashedPassword,
                role: "Seller",
                shopName: "ShopCart Store",
            });
            console.log("Created default seller: seller@shopcart.com / seller123");
        }

        // Add seller ID to all products
        const productsWithSeller = sampleProducts.map((product) => ({
            ...product,
            seller: seller._id,
        }));

        // Insert products
        const insertedProducts = await Product.insertMany(productsWithSeller);
        console.log(`Successfully seeded ${insertedProducts.length} products!`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedDatabase();
