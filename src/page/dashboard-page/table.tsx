import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../@/components/ui/table';

const invoices = [
  {
    idOrder: 'ORD-231020-005-001',
    product: 'KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]',
    kategori: 'Kaos',
    tanggal: '18/08/2024',
    pembeli: 'marco',
    status: 'Belum bayar',
  },
  {
    idOrder: 'ORD-231020-005-002',
    product: 'KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]',
    kategori: 'Kaos',
    tanggal: '18/08/2024',
    pembeli: 'marco',
    status: 'Belum bayar',
  },
  {
    idOrder: 'ORD-231020-005-002',
    product: 'KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]',
    kategori: 'Kaos',
    tanggal: '18/08/2024',
    pembeli: 'marco',
    status: 'Belum bayar',
  },
  {
    idOrder: 'ORD-231020-005-001',
    product: 'KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]',
    kategori: 'Kaos',
    tanggal: '18/08/2024',
    pembeli: 'marco',
    status: 'Belum bayar',
  },
  {
    idOrder: 'ORD-231020-005-001',
    product: 'KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]',
    kategori: 'Kaos',
    tanggal: '18/08/2024',
    pembeli: 'marco',
    status: 'Belum bayar',
  },
  {
    idOrder: 'ORD-231020-005-001',
    product: 'KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]',
    kategori: 'Kaos',
    tanggal: '18/08/2024',
    pembeli: 'marco',
    status: 'Belum bayar',
  },
  {
    idOrder: 'ORD-231020-005-001',
    product: 'KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]',
    kategori: 'Kaossss',
    tanggal: '18/08/2024',
    pembeli: 'marco',
    status: 'Belum bayar',
  },
];

export function TableDemo() {
  return (
    <div className="container mx-auto w-full mt-5">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white">
        <Table className="table-auto w-full text-sm text-left text-gray-500">
          <TableCaption className="text-gray-700 text-base text-left font-semibold p-5 text-[20px]">
            Daftar Pesanan
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[170px] px-4 py-2 text-gray-700">
                OrderId
              </TableHead>
              <TableHead className="px-4 py-2 text-gray-700">Produk</TableHead>
              <TableHead className="px-4 py-2 text-gray-700">
                Kategori
              </TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-700">
                Tanggal
              </TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-700">
                Pembeli
              </TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-700">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow className="hover:bg-gray-50 even:bg-gray-50">
                <TableCell className="px-4 py-2 font-medium">
                  {invoice.idOrder}
                </TableCell>
                <TableCell className="px-4 py-2 truncate max-w-36">
                  {invoice.product}
                </TableCell>
                <TableCell className="px-4 py-2">{invoice.kategori}</TableCell>
                <TableCell className="px-4 py-2">{invoice.tanggal}</TableCell>
                <TableCell className="px-4 py-2 text-right">
                  {invoice.pembeli}
                </TableCell>
                <TableCell className="px-4 py-2 text-right">
                  {invoice.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow className="bg-gray-100">
              <TableCell className="px-4 py-2" colSpan={3}>
                Total
              </TableCell>
              <TableCell className="px-4 py-2 text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
