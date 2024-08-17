"use client";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NextUIProvider,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState, useTransition } from "react";
import { toast, Toaster } from "sonner";
import {
  addInvoice,
  deleteInvoice,
  getInvoices,
  updateInvoice,
} from "./actions/invoiceActions";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    orders: "",
    price: "",
    status: "",
    payment: "",
  });
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isPending, startTransition] = useTransition();

  const handleUpdate = (invoice) => {
    setSelectedInvoice(invoice);
    setFormData({
      name: invoice.name,
      orders: invoice.orders,
      price: invoice.price,
      status: invoice.status,
      payment: invoice.payment,
    });
    onOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      const plainFormData = {
        name: formData.name,
        orders: formData.orders,
        price: formData.price,
        status: formData.status,
        payment: formData.payment,
      };

      if (selectedInvoice) {
        const result = await updateInvoice(selectedInvoice._id, plainFormData);
        if (result.success) {
          setInvoices(
            invoices.map((inv) =>
              inv._id === selectedInvoice._id ? result.invoice : inv
            )
          );
          toast.success("Invoice updated successfully!");
        } else {
          toast.error(`Failed to update invoice: ${result.error}`);
        }
      } else {
        const result = await addInvoice(plainFormData);
        if (result.success) {
          setInvoices([...invoices, result.invoice]);
          setFormData({
            name: "",
            orders: "",
            price: "",
            status: "",
            payment: "",
          });
          toast.success("Invoice added successfully!");
        } else {
          toast.error(`Failed to add invoice: ${result.error}`);
        }
      }

      setSelectedInvoice(null);
      setFormData({
        name: "",
        orders: "",
        price: "",
        status: "",
        payment: "",
      });
    });
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = async (id) => {
    startTransition(async () => {
      const result = await deleteInvoice(id);
      if (result.success) {
        setInvoices(invoices.filter((invoice) => invoice._id !== id));
        toast.success("Invoice deleted successfully!");
      } else {
        toast.error(`Failed to delete invoice: ${result.error}`);
      }
    });
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      const result = await getInvoices();
      if (result.success) {
        setInvoices(result.invoices);
      } else {
        toast.error(`Failed to fetch invoices: ${result.error}`);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <>
      <NextUIProvider>
        <BackgroundGradientAnimation>
          <div className="overflow-hidden z-50 w-full h-screen mx-auto flex flex-col items-center gap-4 dark text-white ">
            <h1 className="font-bold text-7xl text-white text-center mt-8">
              Sales Tracker
            </h1>
            <Table
              aria-label="Example static collection table"
              removeWrapper
              className="border-collapse px-20 m-10 light text-white"
            >
              <TableHeader>
                <TableColumn className="bg-transparent text-white">
                  ID
                </TableColumn>
                <TableColumn className="bg-transparent text-white">
                  NAME
                </TableColumn>
                <TableColumn className="bg-transparent text-white">
                  ORDERS
                </TableColumn>
                <TableColumn className="bg-transparent text-white">
                  PRICE
                </TableColumn>
                <TableColumn className="bg-transparent text-white">
                  STATUS
                </TableColumn>
                <TableColumn className="bg-transparent text-white">
                  PAYMENT
                </TableColumn>
                <TableColumn className="bg-transparent text-white">
                  ACTIONS
                </TableColumn>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice, index) => (
                  <TableRow key={invoice._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{invoice.name}</TableCell>
                    <TableCell>{invoice.orders}</TableCell>
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>{invoice.payment}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        size="sm"
                        onPress={() => handleUpdate(invoice)}
                        className="mr-2"
                      >
                        Update
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        onPress={() => handleDelete(invoice._id)}
                        isLoading={isPending}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Toaster richColors position="top-right" />
            <div className="absolute bottom-10 left-10">
              <Button
                className="font-semibold z-50"
                onPress={onOpen}
                color="secondary"
              >
                Add Invoice
              </Button>
              <Modal
                isOpen={isOpen}
                onOpenChange={(open) => {
                  if (!open) {
                    setSelectedInvoice(null);
                    setFormData({
                      name: "",
                      orders: "",
                      price: "",
                      status: "",
                      payment: "",
                    });
                  }
                  onOpenChange(open);
                }}
                placement="top-center"
              >
                <ModalContent>
                  {(onClose) => (
                    <form onSubmit={handleSubmit}>
                      <ModalHeader className="flex flex-col gap-1">
                        {selectedInvoice
                          ? "Update Invoice"
                          : "Customer Invoice"}
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          autoFocus
                          autoComplete="off"
                          label="Name"
                          placeholder="Enter customer name"
                          variant="bordered"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <Input
                          autoComplete="off"
                          label="Order"
                          placeholder="Enter no. of orders"
                          variant="bordered"
                          name="orders"
                          value={formData.orders}
                          onChange={handleChange}
                        />
                        <Input
                          autoComplete="off"
                          label="Price"
                          placeholder="Enter item price"
                          variant="bordered"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                        />
                        <Select
                          label="Status"
                          placeholder="Select status"
                          selectedKeys={
                            formData.status ? [formData.status] : []
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        >
                          <SelectItem
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.value,
                              })
                            }
                            key="paid"
                            value="paid"
                            className="text-green-500"
                          >
                            Paid
                          </SelectItem>
                          <SelectItem
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.value,
                              })
                            }
                            key="pending"
                            value="pending"
                            className="text-red-500"
                          >
                            Pending
                          </SelectItem>
                        </Select>
                        <Select
                          label="Payment"
                          placeholder="Select payment method"
                          selectedKeys={
                            formData.payment ? [formData.payment] : []
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              payment: e.target.value,
                            })
                          }
                        >
                          <SelectItem key="cash" value="cash">
                            Cash
                          </SelectItem>
                          <SelectItem key="card" value="card">
                            Card
                          </SelectItem>
                          <SelectItem key="bank" value="bank">
                            Bank
                          </SelectItem>
                        </Select>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          value="submit"
                          color="primary"
                          onPress={onClose}
                          isLoading={isPending}
                        >
                          {selectedInvoice ? "Update" : "Add"}
                        </Button>
                      </ModalFooter>
                    </form>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </NextUIProvider>
    </>
  );
}
