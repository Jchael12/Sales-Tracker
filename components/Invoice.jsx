import { Table, TableBody, TableCell } from "@nextui-org/react";

export default function Invoice() {
  return (
    <Table aria-label="Example static collection table">
      <TableBody>
        <TableCell>1</TableCell>
        <TableCell>Tony Reichert</TableCell>
        <TableCell>10</TableCell>
        <TableCell>100</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Cash</TableCell>
      </TableBody>
    </Table>
  );
}
