import { Button } from '@/components/ui/button';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { Text } from '@chakra-ui/react';
import { Ellipsis, FilePenLine, Trash2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { deleteProduct } from '@/features/auth/services/product-service';
import { useProductStore } from '@/features/auth/store/toggle-active-product.store';
import { useNavigate } from 'react-router';

interface Props {
  productId: string;
}

const DialogOption: React.FC<Props> = ({ productId }) => {
  const { removeProduct } = useProductStore();
  const navigate = useNavigate();
  async function deleteProductSatuan(id: string) {
    const token = await Cookies.get(`token`);

    const isDelete = confirm('Yakin hapus produk');
    if(isDelete)
    deleteProduct(id, String(token))
      .then(() => {
        removeProduct(id)
      })
      .catch(error =>
        console.log(error)
      )
  };
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" mt={4} borderRadius="20px">
          <Ellipsis />
        </Button>
      </MenuTrigger>
      <MenuContent>
        {/* <MenuItem value="Varian" valueText="Varian Produk">
          <FileStack />
          <Text ml={2}>Varian Produk</Text>
        </MenuItem> */}
        <MenuItem onClick={() => navigate(`/edit-product/${productId}`)} value="Edit" valueText="Edit Produk">
          <FilePenLine />
          <Text ml={2}>Edit Produk</Text>
        </MenuItem>
        <MenuItem onClick={() => deleteProductSatuan(productId)} value="Hapus" valueText="Hapus Produk" color="red.600">
          <Trash2 />
          <p>Hapus Produk</p>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default DialogOption;
