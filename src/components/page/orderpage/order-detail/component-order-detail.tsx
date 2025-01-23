import { Box } from '@chakra-ui/react';
import { Link, useParams } from 'react-router';

import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb';

const orders = [
  {
    id: '1',
    status: 'Belum Bayar',
    colorPalette: 'yellow',
    invoice: 'INV/20230809/MPL/00000239',
    buttonLabel: 'Hubungi Pembeli',
    product: {
      name: 'Noise Cancelling Headphone Nirkabel WH-CH720N',
      quantity: 1,
      image:
        'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch720_Primary_image?$categorypdpnav$&fmt=png-alpha',
      price: '190.000',
    },
  },
  {
    id: '2',
    status: 'Pesanan Baru',
    colorPalette: 'green',
    invoice: 'INV/20230809/MPL/00000239',
    buttonLabel: 'Proses Pesanan',
    product: {
      name: 'Sony Playstation 5',
      quantity: 1,
      image:
        'https://images.tokopedia.net/img/cache/700/OJWluG/2022/3/21/9cc55e78-b91e-4b8b-a588-c4fa991fc89c.jpg?ect=4g',
      price: '19.000.000',
    },
  },
];

export function ComponentOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((order) => order.id === id);

  console.log('Parameter ID:', id); // Debugging
  console.log('Order:', order); // Debugging

  if (!order) {
    return (
      <Box p={3} m={4} textAlign="center" color="red.500">
        <p>Pesanan tidak ditemukan!</p>
      </Box>
    );
  }

  return (
    <Box p={3} m={4}>
      <BreadcrumbRoot>
        <BreadcrumbLink>
          <Link to="/order-list" className="text-blue-400">
            Daftar Pesanan
          </Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>{order.product.name}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
    </Box>
  );
}
