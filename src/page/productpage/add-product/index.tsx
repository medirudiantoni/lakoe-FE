import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductInfoForm from './product-info'
import { data, useLocation, useNavigate, useParams } from 'react-router';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useCategoryStore } from '@/features/auth/store/category-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addproductSchema, ProductFormInputs } from './schema';
import VariantSectionForm from './variant';
import PriceSectionForm from './price-section';
import ManageProductSectionForm from './manage-product';
import ShippingOptionSectionForm from './shipping-option';
import ButtonsSectionForm from './buttons-section';
import handleSubmitAddProduct from './actions';
import Cookies from 'js-cookie';
import { fetchProductById } from '@/features/auth/services/product-service';
import { ProductType, VariantOptionValueType, VariantType } from '@/features/auth/types/prisma-types';

const AddProductForm = () => {
    const { pathname } = useLocation();
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { fetchCategories, selectedCategoryId, setSelectedCategoryId } = useCategoryStore();
    const [getVariants, setGetVariants] = useState<VariantType[]>([]);
    const [theVariants, setTheVariants] = useState<VariantType[]>([]);
    const [productDataUpdateCase, setProductDataUpdateCase] = useState<ProductType | null>(null);

    const handleSetDefaultVariant = () => {
        const value: VariantOptionValueType = {
            isActive: true,
            price: Number(watch("price")),
            stock: watch("stock"),
            weight: watch("weight"),
            sku: String(watch("sku"))
        }
        const data = [{
            name: "final",
            isActive: true,
            variantOptions: [
                {
                    name: "default",
                    variantOptionValues: [
                        {
                            isActive: value.isActive,
                            price: value.price,
                            stock: value.stock,
                            weight: value.weight,
                            sku: value.sku
                        }
                    ]
                }
            ]
        }]
        setTheVariants(data);
    }

    const [isVariantTypeAppears, setIsVariantTypeAppears] = useState<boolean>(false);

    const [previewImages, setPreviewImages] = useState<string[]>(
        Array(5).fill('')
    );

    useEffect(() => {
        fetchCategories();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = useForm<ProductFormInputs>({
        resolver: zodResolver(addproductSchema),
        defaultValues: { attachments: [] },
    });

    useEffect(() => {
        if (productId) {
            retrieveProductData(productId)
        }
    }, [pathname]);

    function retrieveProductData(productId: string) {
        const token = Cookies.get("token");
        fetchProductById(productId, token!)
            .then(res => {
                console.log("res: ", res.product);
                const product: ProductType = res.product;
                setProductDataUpdateCase(product);
                const size: {
                    width: number,
                    height: number,
                    length: number
                } = JSON.parse(product.size!);

                setValue("name", product.name);
                setValue("description", product.description);
                setValue("url", product.url);
                setValue("minimumOrder", String(product.minimumOrder));
                setValue("size", size);
                setValue("size.height", size.height);
                setValue("size.width", size.width);
                setValue("size.length", size.length);
                setPreviewImages(product.attachments);
                setSelectedCategoryId(String(product.category?.id))

                const getValues = () => {
                    const options = product.variant?.find((item, id) => id === 0 ? item.variantOptions : false);
                    const optionValues = options?.variantOptions?.find((item, id) => id === 0 ? item.variantOptionValues : false);
                    const values = optionValues?.variantOptionValues?.find((item, id) => id === 0 ? item : false);
                    return values;
                };

                if (product.variant?.length === 1) {
                    setValue("price", String(getValues()?.price));
                    setValue("stock", Number(getValues()?.stock));
                    setValue("sku", String(getValues()?.sku));
                    setValue("weight", Number(getValues()?.weight));
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (getVariants.length > 0) {
            setTheVariants(getVariants);
        } else {
            handleSetDefaultVariant();
        }
    }, [getVariants, watch("price"), watch("stock"), watch("weight"), watch("sku")]);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const newPreviewImages = [...previewImages];
            newPreviewImages[index] = URL.createObjectURL(files[0]);
            setPreviewImages(newPreviewImages);

            const currentAttachments = (watch('attachments') || []) as File[];
            const newAttachments = [...currentAttachments];
            newAttachments[index] = files[0];
            setValue('attachments', newAttachments.filter(Boolean));
            console.log('Attachments setelah perubahan:', watch('attachments'));
        }
    };
    const handleRemoveImage = (index: number) => {
        const newPreviewImages = [...previewImages];
        newPreviewImages.splice(index, 1);
        setPreviewImages(newPreviewImages);

        const currentAttachments = (watch('attachments') || []) as File[];
        const newAttachments = [...currentAttachments];
        newAttachments.splice(index, 1);
        setValue('attachments', newAttachments);

        console.log('Attachments setelah penghapusan:', watch('attachments'));
    };

    useEffect(() => {
        setValue('url', Array.from(watch("name")).map(e => e === " " ? "-" : e).join("").toLowerCase())
    }, [() => watch('name')]);

    const onSubmit = async (data: ProductFormInputs) => {
        console.log("executed");
        const filteredImageUpdateCase = previewImages.filter(e => e.includes("blob") ? false : e);
        const storeId = user?.Stores?.id;
        handleSubmitAddProduct(theVariants, data, String(selectedCategoryId), setIsLoading, setError, String(storeId), navigate, productId, filteredImageUpdateCase);
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ProductInfoForm
                    errors={errors}
                    register={register}
                    previewImages={previewImages}
                    handleRemoveImage={handleRemoveImage}
                    handleFileChange={handleFileChange}
                    categoryId={productDataUpdateCase?.categoryId}
                />
                <VariantSectionForm
                    onChangeVariantData={setGetVariants}
                    setIsVariantType={setIsVariantTypeAppears}
                    isVariantType={isVariantTypeAppears}
                    productDataUpdateCase={productDataUpdateCase}
                />
                <PriceSectionForm
                    errors={errors}
                    register={register}
                    isVariantDefault={getVariants.length === 0 ? true : false}
                />
                {getVariants.length === 0 && (
                    <ManageProductSectionForm
                        errors={errors}
                        register={register}
                    />
                )}
                <ShippingOptionSectionForm
                    errors={errors}
                    register={register}
                    isVariantDefault={getVariants.length === 0 ? true : false}
                />
                <ButtonsSectionForm isLoading={isLoading} isUpdateCase={productId ? true : false} data={previewImages} />
                {/* <button onClick={() => console.log("theVariants: ", theVariants, "getVariants: ", getVariants)} type='button' className='py-2 px-4 w-full bg-blue-600 active:bg-blue-900'>tes</button> */}
            </form>
        </Box>
    )
}

export default AddProductForm;