import mongoose from "mongoose";

const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    name: String,
    orders: Number,
    price: Number,
    status: {
      type: String,
      enum: ["paid", "pending"],
      required: true,
    },
    payment: {
      type: String,
      enum: ["cash", "card", "bank"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", invoiceSchema);
