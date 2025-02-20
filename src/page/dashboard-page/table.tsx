import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useSellerStore } from "@/hooks/store";
import { fetchOrders } from "@/features/auth/services/order.service";


export function TableDemo() {
  const { user } = useAuthStore();
  const { store } = useSellerStore();
  const token = Cookies.get("token");
  const storeId = user?.Stores?.id;

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["orders", storeId],
    queryFn: () => fetchOrders(token!),
    enabled: !!storeId && !!token,
  });

  if (isLoading) {
    return <p className="text-center mt-5">Loading data pesanan...</p>;
  }

  if (isError) {
    return <p className="text-center mt-5 text-red-500">Gagal memuat data pesanan.</p>;
  }

  return (
    <div className="container mx-auto w-full mt-5">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white">
        <Table className="table-auto w-full text-sm text-left text-gray-500">
          <TableCaption className="text-gray-700 text-base text-left font-semibold p-5 text-[20px]">
            Daftar Pesanan
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[170px] px-4 py-2 text-gray-700">OrderId</TableHead>
              <TableHead className="px-4 py-2 text-gray-700">Produk</TableHead>
              <TableHead className="px-4 py-2 text-gray-700">Gambar</TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-700">Tanggal</TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-700">Pembeli</TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-700">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50 even:bg-gray-50">
                <TableCell className="px-4 py-2 font-medium truncate max-w-16">{order.id}</TableCell>

                <TableCell className="px-4 py-2 truncate max-w-36">
                  {order.orderItems?.length
                    ? order.orderItems.map((item) => item.product?.name || "Produk tidak ditemukan").join(", ")
                    : "Tidak ada produk"}
                </TableCell>

                <TableCell className="px-4 py-2">
                  {order.orderItems?.[0]?.product?.attachments?.[0] ? (
                    <img
                      src={order.orderItems[0].product.attachments[0]}
                      alt="Gambar Produk"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    "Tidak ada gambar"
                  )}
                </TableCell>

                <TableCell className="px-4 py-2 text-right">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="px-4 py-2 text-right">
                  {order.recipientName || "Tidak diketahui"}
                </TableCell>

                <TableCell className="px-4 py-2 text-right">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
