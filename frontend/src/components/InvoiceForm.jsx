import { useState } from "react";

function InvoiceForm() {
  const [formData, setFormData] = useState({
    name: "",
    orders: "",
    price: "",
    method: "",
    status: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle form submission, e.g., send data to server, etc.
    // For simplicity, we'll just log the form data to console
    console.log(formData);
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Customer Invoice Info
          </h1>

          <p className="mt-4 text-gray-500">Please enter customer details</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Customer Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="orders" className="sr-only">
              Orders
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Number of Orders"
                value={formData.orders}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="sr-only">
              Price
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Item Price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div>
              <label
                htmlFor="Cash"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
                <input
                  className="sr-only"
                  id="Cash"
                  type="radio"
                  tabIndex="-1"
                  name="option"
                  value={formData.method === "Cash"}
                  onChange={handleChange}
                />

                <span className="text-sm"> Cash </span>
              </label>
            </div>

            <div>
              <label
                htmlFor="Gcash"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
                <input
                  className="sr-only"
                  id="Gcash"
                  type="radio"
                  tabIndex="-1"
                  name="option"
                  value={formData.method === "Gcash"}
                  onChange={handleChange}
                />

                <span className="text-sm"> Gcash </span>
              </label>
            </div>

            <div>
              <label
                htmlFor="Bank"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
                <input
                  className="sr-only"
                  id="Bank"
                  type="radio"
                  tabIndex="-1"
                  name="option"
                  value={formData.method === "Bank"}
                  onChange={handleChange}
                />

                <span className="text-sm"> Bank </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div>
              <label
                htmlFor="Paid"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
                <input
                  className="sr-only"
                  id="Paid"
                  type="radio"
                  tabIndex="-1"
                  name="option"
                  value={formData.status === "Paid"}
                  onChange={handleChange}
                />

                <span className="text-sm"> Paid </span>
              </label>
            </div>

            <div>
              <label
                htmlFor="Unpaid"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
                <input
                  className="sr-only"
                  id="Unpaid"
                  type="radio"
                  tabIndex="-1"
                  name="option"
                  value={formData.status === "Unpaid"}
                  onChange={handleChange}
                />

                <span className="text-sm"> Unpaid </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 hover:bg-zinc-900 hover:text-white px-5 py-3 text-sm font-medium text-white"
            >
              Add Invoice
            </button>
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 hover:bg-red-600 px-5 py-3 text-sm font-medium text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default InvoiceForm;
