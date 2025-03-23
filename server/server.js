const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const db = require("./db");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Connect to MySQL
db.execute("SELECT 1")
  .then(() => {
    console.log("✅ MySQL Database Connected!");

    // ✅ CORS Configuration (Fixed conflict)
    app.use(cors({
      origin: "http://localhost:3001", // Set to your frontend's URL
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

    // ✅ Routes
    const signupRouter = require("./routes/signup");
    const loginRouter = require("./routes/login");
    const verifyRouter = require("./routes/verify");
    const sellerloginroute=require("./routes/SellerLogin");
    const sellerregisterroute=require("./routes/SellerRegister");
    const adminlogin=require("./routes/adminlogin");
    app.use("/api/signup", signupRouter);
    app.use("/api/login", loginRouter);
    app.use("/api/verify", verifyRouter);
    app.use("/api/seller/login",sellerloginroute);
    app.use("/api/seller/register",sellerregisterroute);
    app.use("/api/admin/login",adminlogin);


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
