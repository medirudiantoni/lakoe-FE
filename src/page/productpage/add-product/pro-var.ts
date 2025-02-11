const products_payload = {
  //   id: '',
  name: '',
  description: '',
  attachments: [],
  isActive: false,
  variants: [
    {
      //   id: '',
      name: '',
      isActive: false,
      productId: '',
      variantOptions: [
        {
          //   id: '',
          name: '',
          variantId: '',
          variantOptionValues: [
            {
              // id: "",
              sku: '',
              weight: 0,
              stock: 0,
              price: 0,
              isActive: false,
              variantOptionId: '',
            },
          ],
        },
      ],
    },
  ],
  size: '',
  minimumOrder: '',
  storeId: '',
};

const variants = [
  {
    name: 'Warna',
    isActive: true,
    variantOptions: [
      {
        name: 'Hijau tes',
        variantOptionValues: [
          {
            sku: 'HIJAU',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Merah tes',
        variantOptionValues: [
          {
            sku: 'MERAH',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Kuning tes',
        variantOptionValues: [
          {
            sku: 'KUNING',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Biru tes',
        variantOptionValues: [
          {
            sku: 'BIRU',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
          {
            sku: 'BIRU',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
    ],
  },
];

// lolos
const lolos = [
  {
    name: 'Warna tes',
    isActive: true,
    variantOptions: [
      {
        name: 'Hijau tes',
        variantOptionValues: [
          {
            sku: 'HIJAU-PRDK-TES2-100',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Merah tes',
        variantOptionValues: [
          {
            sku: 'MERAH',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Kuning tes',
        variantOptionValues: [
          {
            sku: 'KUNING',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Biru tes',
        variantOptionValues: [
          {
            sku: 'BIRU',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
    ],
  },
];

// tidak
const tidak = [
  {
    name: 'Mode',
    isActive: true,
    variantOptions: [
      {
        name: 'Klasik',
        variantOptionValues: [
          {
            isActive: true,
            price: 130000,
            sku: 'OWEODKWEW-90',
            stock: 209,
            weight: 1000,
          },
        ],
      },
      {
        name: 'Modern',
        variantOptionValues: [
          {
            isActive: true,
            price: 138000,
            sku: 'OWEODKWEW-100',
            stock: 90,
            weight: 1100,
          },
        ],
      },
    ],
  },
];

const finalVariant = [
  {
    name: 'final',
    isActive: true,
    variantOptions: [
      {
        name: 'Merah Small',
        variantOptionValues: [
          {
            sku: 'HIJAU',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Merah Medium',
        variantOptionValues: [
          {
            sku: 'MERAH',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Kuning Large',
        variantOptionValues: [
          {
            sku: 'KUNING',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Biru Small',
        variantOptionValues: [
          {
            sku: 'BIRU',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Biru Medium',
        variantOptionValues: [
          {
            sku: 'BIRU',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
      {
        name: 'Biru Large',
        variantOptionValues: [
          {
            sku: 'BIRU',
            weight: 100,
            stock: 100,
            price: 100000,
            isActive: true,
          },
        ],
      },
    ],
  },
]