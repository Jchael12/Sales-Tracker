"use server";

import dbConnect from "@/app/api/route";
import Invoice from "@/models/schema";

export async function addInvoice(data) {
  try {
    await dbConnect();

    const invoice = new Invoice({
      name: data.name,
      orders: data.orders,
      price: data.price,
      status: data.status,
      payment: data.payment,
    });

    await invoice.save();
    console.log("Saved invoice:", invoice); // Log the saved invoice
    return { success: true, invoice: JSON.parse(JSON.stringify(invoice)) };
  } catch (error) {
    console.error("Failed to add invoice:", error);
    return { success: false, error: "Failed to add invoice" };
  }
}

export async function getInvoices() {
  try {
    await dbConnect();
    const invoices = await Invoice.find({}).lean();
    return { success: true, invoices: JSON.parse(JSON.stringify(invoices)) };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteInvoice(id) {
  try {
    await dbConnect();
    const result = await Invoice.findByIdAndDelete(id);

    if (result) {
      return { success: true };
    } else {
      return { success: false, error: "Invoice not found" };
    }
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    return { success: false, error: error.message };
  }
}
