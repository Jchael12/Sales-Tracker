function Customers() {
  return (
    <div className="p-5 text-center">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                No. of Orders
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Payment Method
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Payment Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">5</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">100</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Cash
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Paid
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Customers;
