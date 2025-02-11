import { z } from 'zod';

// export const addproductSchema = z.object({
//   name: z.string().min(3, 'Nama product harus diisi'),
//   description: z.string().min(5, 'Deskripsi harus diisi'),
//   url: z.string().min(5, 'Url produk harus diisi'),
//   minimumOrder: z.string().min(1, 'Tentukan minimal pesanan'),
//   price: z.string().min(4, 'Harga produk harus diisi').nullable().optional(),
//   sku: z.string().min(4, 'Stock Keeping Unit harus diisi').nullable().optional(),
//   stock: z
//     .string().nullable().optional()
//     .transform((val) => Number(val))
//     .refine((val) => val >= 1, {
//       message: 'Stock produk harus minimal 1',
//     }),
//   weight: z
//     .string().nullable().optional()
//     .transform((val) => Number(val))
//     .refine((val) => val >= 1, {
//       message: 'Berat produk harus minimal 1 gram',
//     }),
//   attachments: z
//     .array(z.instanceof(File))
//     .min(1, 'Silakan unggah minimal satu foto produk!'),
//   size: z
//     .object({
//       length: z.number().min(1, 'Panjang harus minimal 1 cm'),
//       width: z.number().min(1, 'Lebar harus minimal 1 cm'),
//       height: z.number().min(1, 'Tinggi harus minimal 1 cm'),
//     })
//     .optional(), // Opsional, bisa diisi atau tidak
// });

export const addproductSchema = z.object({
  name: z.string().min(3, 'Nama product harus diisi'),
  description: z.string().min(5, 'Deskripsi harus diisi'),
  url: z.string().min(5, 'Url produk harus diisi'),
  minimumOrder: z.string().min(1, 'Tentukan minimal pesanan'),
  price: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  stock: z
    .string().nullable().optional()
    .transform((val) => Number(val)),
  weight: z
    .string().nullable().optional()
    .transform((val) => Number(val)),
  attachments: z
    .array(z.instanceof(File)).nullable().optional(),
    // .min(1, 'Silakan unggah minimal satu foto produk!'),
  size: z
    .object({
      length: z.number().min(1, 'Panjang harus minimal 1 cm'),
      width: z.number().min(1, 'Lebar harus minimal 1 cm'),
      height: z.number().min(1, 'Tinggi harus minimal 1 cm'),
    })
    .optional(), // Opsional, bisa diisi atau tidak
});

export type ProductFormInputs = z.infer<typeof addproductSchema>;