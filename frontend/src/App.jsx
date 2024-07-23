import { useState } from "react";
import Customers from "./components/Customers";
import InvoiceForm from "./components/InvoiceForm";

function App() {
  const [invoice, setInvoice] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    setInvoice(true);
  };

  return (
    <>
      <div>
        <Customers />
        <a
          className="absolute left-10 bottom-10 inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
          href="#"
          onClick={handleForm}
        >
          Add Customer
        </a>
        {invoice && <InvoiceForm />}
      </div>
    </>
  );
}

export default App;
