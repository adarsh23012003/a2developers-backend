import express from "express";
import cors from "cors";
import { errorCapture, errorController } from "./error.mjs";
import bodyParser from "body-parser";
import { Form } from "./models/Form.mjs";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(
  "/",
  errorCapture(async (req, res) => {
    res.send("Welcome to A2 Developers Backend!");
  })
);

app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, contact_number, institution_name, requirements } =
      req.body;

    if (!name || !email || !contact_number || !institution_name) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const newForm = new Form({
      name,
      email,
      contact_number,
      institution_name,
      requirements,
    });

    // Save to database
    const savedForm = await newForm.save();
    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: savedForm,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, message: errors });
    }
    console.error("❌ Server error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

app.get("/forms", async (req, res) => {
  try {
    const forms = await Form.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: forms.length,
      data: forms,
    });
  } catch (error) {
    console.error("❌ Error fetching forms:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching forms",
      error: error.message,
    });
  }
});

app.all(
  /.*/,
  errorCapture(async (req, res) => {
    res.send("Route Not Found");
  })
);

app.use(errorController);
export { app };
