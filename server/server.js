const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const db = require("./db");
const errorHandler = require("./middlewares/errorHandler");
const RefreshTokenRoute = require("./routes/RefreshToken");
const getProductsRoute = require("./routes/getProducts");
const tokenAuthentication = require("./middlewares/tokenAuthentication");
const path = require('path');
const upload = require("./middlewares/upload");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Connect to MySQL
db.execute("SELECT 1")
  .then(() => {
    console.log("✅ MySQL Database Connected!");

    // ✅ CORS Configuration (Fixed conflict)
    app.use(cors({
      origin: ["http://localhost:3001", "http://localhost:3002"], // Allow both frontend ports
      credentials: true, // Important for cookies & authentication
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"], // Required headers
    }));

    // ✅ Middleware
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use("/uploads", express.static("uploads"));
    app.use("/api/products", getProductsRoute);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // ✅ Routes
    const signupRouter = require("./routes/signup");
    const loginRouter = require("./routes/login");
    const verifyRouter = require("./routes/verify");
    const sellerloginroute = require("./routes/SellerLogin");
    const sellerregisterroute = require("./routes/SellerRegister");
    const adminlogin = require("./routes/adminlogin");
    const profileuser = require("./routes/profile");
    const sellerprofile=require("./routes/seller");
    const getFeaturedProductsRoute = require("./routes/getFeaturedProducts");
    const updateProductRoute = require("./routes/updateProducts");
    const deleteProductRoute=require("./routes/deleteProduct");
    const viewProductRoute=require("./routes/viewProduct");
    const category=require("./routes/addcategory");
    const discountedProductsRoute = require("./routes/discountedproducts");
    const likeProductRoute = require("./routes/likeProduct");
    const add_to_cart=require("./routes/addToCart");


    // Public routes (no authentication)
    app.use("/api/signup", signupRouter);
    app.use("/api/login", loginRouter);
    app.use("/api/verify", verifyRouter);
    app.use("/api/seller/login", sellerloginroute);
    app.use("/api/seller/signup", sellerregisterroute);
    app.use("/api/admin/login", adminlogin);
    app.use("/api/seller/refresh-token", RefreshTokenRoute);
    app.use("/api/products/discounted", discountedProductsRoute);
    app.use("/api/categories",category);;
    
    app.use("/images/category", express.static(path.join(__dirname, "uploads/category")));
    app.use("/api/likeProduct", likeProductRoute);
    app.use("/api/cart",add_to_cart);

    
    // Protected routes (authentication required)
    app.use("/api/profile",  profileuser);
    app.use("/api/seller",sellerprofile);
    app.use("/api/seller/add-product",require("./routes/addProduct"));
    app.use("/api/products", getFeaturedProductsRoute);
    app.use("/api/products/update", updateProductRoute);
    app.use("/api/products/delete",deleteProductRoute);
    app.use("/api/products/view",viewProductRoute);

    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        console.log("Registered Route:", r.route.path);
      }
    });

    // ✅ 404 Handler
    app.use("*", (req, res) => {
      res.status(404).json({ message: "❌ Route not found" });
    });

    // ✅ Global Error Handler
    app.use(errorHandler);

    // ✅ Start Server
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

    // Log all registered routes
    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        console.log("Registered Route:", r.route.path);
      }
    });

  })
  .catch((err) => {
    console.error("❌ MySQL Database Connection Failed:", err.message);
    process.exit(1);
  });
