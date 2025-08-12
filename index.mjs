import { app } from "./app.mjs";
import mongoose from "mongoose";
import "./config.mjs";

const connectDB = async () => {
  console.log("🔗 Connecting to Database...");
  try {
    await mongoose.connect(
      process.env.DB_URL ||
        "mongodb+srv://adarsh:Adarsh%40123@cluster0.webyts1.mongodb.net/a2developers-backend",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ Database Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

const startServer = () => {
  console.log("🚀 Starting Server...");
  try {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server Running on Port: ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
  }
};

connectDB().then(startServer);
