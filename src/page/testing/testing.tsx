import { Plus, Save, X } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface VariantOptionValue {
  id: number;
  sku: string;
  isActive: boolean;
  price: number;
  weight: number;
  stock: number;
}

interface VariantOption {
  id: number;
  name: string;
  values: VariantOptionValue[];
}

interface Variant {
  id: number;
  name: string;
  isActive: boolean;
  options: VariantOption[];
}

interface VariantCombination {
  name: string;
  variants: {
    variantName: string;
    optionName: string;
  }[];
}

// Helper function untuk generate kombinasi varian
const generateCombinations = (variants: Variant[]): VariantCombination[] => {
  if (variants.length === 0) return [];

  const combinations = variants.reduce((acc: VariantCombination[], variant) => {
    if (acc.length === 0) {
      return variant.options.map((opt) => ({
        name: `${opt.name}`,
        variants: [{ variantName: variant.name, optionName: opt.name }],
      }));
    }

    const newCombinations: VariantCombination[] = [];
    acc.forEach((existing) => {
      variant.options.forEach((opt) => {
        newCombinations.push({
          name: `${existing.name} - ${opt.name}`,
          variants: [
            ...existing.variants,
            { variantName: variant.name, optionName: opt.name },
          ],
        });
      });
    });
    return newCombinations;
  }, []);

  return combinations;
};

const ProductVariantManager: React.FC = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [finalVariant, setFinalVariant] = useState<Variant>({
    id: 0,
    name: 'final',
    isActive: true,
    options: [],
  });

  // State untuk form tambah varian baru
  const [newVariantName, setNewVariantName] = useState<string>('');
  const [newOptionName, setNewOptionName] = useState<string>('');

  // Effect untuk update final variant ketika ada perubahan pada variants
  useEffect(() => {
    const combinations = generateCombinations(variants);
    const finalOptions: VariantOption[] = combinations.map((combo, idx) => ({
      id: idx,
      name: combo.name,
      values: [
        {
          id: idx,
          sku: '',
          isActive: true,
          price: 0,
          weight: 0,
          stock: 0,
        },
      ],
    }));

    setFinalVariant((prev) => ({
      ...prev,
      options: finalOptions,
    }));
  }, [variants]);

  // Handler untuk menambah varian baru
  const handleAddVariant = (): void => {
    if (!newVariantName.trim()) return;

    setVariants((prev) => [
      ...prev,
      {
        id: prev.length,
        name: newVariantName,
        isActive: true,
        options: [],
      },
    ]);
    setNewVariantName('');
  };

  // Handler untuk menambah option pada varian
  const handleAddOption = (variantId: number): void => {
    if (!newOptionName.trim()) return;

    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id === variantId) {
          return {
            ...variant,
            options: [
              ...variant.options,
              {
                id: variant.options.length,
                name: newOptionName,
                values: [
                  {
                    id: variant.options.length,
                    sku: '',
                    isActive: true,
                    price: 0,
                    weight: 0,
                    stock: 0,
                  },
                ],
              },
            ],
          };
        }
        return variant;
      })
    );
    setNewOptionName('');
  };

  // Handler untuk update values pada final variant
  const handleUpdateFinalValue = (
    optionId: number,
    field: keyof VariantOptionValue,
    value: string | number
  ): void => {
    setFinalVariant((prev) => ({
      ...prev,
      options: prev.options.map((opt) => {
        if (opt.id === optionId) {
          return {
            ...opt,
            values: opt.values.map((val) => ({
              ...val,
              [field]: value,
            })),
          };
        }
        return opt;
      }),
    }));
  };

  // Handler untuk input events
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof VariantOptionValue,
    optionId: number
  ): void => {
    const value =
      e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    handleUpdateFinalValue(optionId, field, value);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Varian Produk</h2>

        {/* Form tambah varian */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newVariantName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewVariantName(e.target.value)
            }
            placeholder="Nama varian baru"
            className="px-4 py-2 border rounded-lg flex-1"
          />
          <button
            onClick={handleAddVariant}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <Plus size={20} />
            Tambah Varian
          </button>
        </div>

        {/* Daftar varian */}
        <div className="space-y-6">
          {variants.map((variant) => (
            <div key={variant.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{variant.name}</h3>
                <button
                  onClick={() =>
                    setVariants((prev) =>
                      prev.filter((v) => v.id !== variant.id)
                    )
                  }
                  className="text-red-500 hover:text-red-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form tambah option */}
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={newOptionName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewOptionName(e.target.value)
                  }
                  placeholder="Nama option baru"
                  className="px-4 py-2 border rounded-lg flex-1"
                />
                <button
                  onClick={() => handleAddOption(variant.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
                >
                  <Plus size={20} />
                  Tambah Option
                </button>
              </div>

              {/* Daftar option */}
              <div className="grid grid-cols-2 gap-4">
                {variant.options.map((option) => (
                  <div key={option.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option.name}</span>
                      <button
                        onClick={() => {
                          setVariants((prev) =>
                            prev.map((v) => {
                              if (v.id === variant.id) {
                                return {
                                  ...v,
                                  options: v.options.filter(
                                    (o) => o.id !== option.id
                                  ),
                                };
                              }
                              return v;
                            })
                          );
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final variant section */}
      {finalVariant.options.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Kombinasi Varian</h2>
          <div className="space-y-4">
            {finalVariant.options.map((option) => (
              <div key={option.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">{option.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      value={option.values[0].sku}
                      onChange={(e) => handleInputChange(e, 'sku', option.id)}
                      className="px-3 py-2 border rounded-lg w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Harga
                    </label>
                    <input
                      type="number"
                      value={option.values[0].price}
                      onChange={(e) => handleInputChange(e, 'price', option.id)}
                      className="px-3 py-2 border rounded-lg w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Berat
                    </label>
                    <input
                      type="number"
                      value={option.values[0].weight}
                      onChange={(e) =>
                        handleInputChange(e, 'weight', option.id)
                      }
                      className="px-3 py-2 border rounded-lg w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Stok
                    </label>
                    <input
                      type="number"
                      value={option.values[0].stock}
                      onChange={(e) => handleInputChange(e, 'stock', option.id)}
                      className="px-3 py-2 border rounded-lg w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              console.log('Data to save:', {
                variants,
                finalVariant,
              });
            }}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <Save size={20} />
            Simpan Semua
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductVariantManager;
