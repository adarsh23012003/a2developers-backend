import mongoose, { Schema } from "mongoose";

const formSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact_number: { type: Number, required: true },
  institution_name: { type: String, required: true },
  requirements: { type: String },
  date: { type: Date, default: Date.now },
});

const Form = mongoose.model("Form", formSchema);
export { Form };
