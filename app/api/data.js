import Invoice from "@/models/schema";
import dbConnect from "./route";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, orders, price, status, payment } = req.body;
    const invoice = new Invoice({
      name,
      orders,
      price,
      status,
      payment,
    });
    await invoice.save();
    console.log("Invoice saved:", invoice);
    res.status(201).json({ success: true, invoice });
  } else if (req.method === "GET") {
    try {
      const invoices = await Invoice.find({});
      res.status(200).json({ success: true, invoices });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch invoices",
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
