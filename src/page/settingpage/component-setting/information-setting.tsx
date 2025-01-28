import { Field } from "@/components/ui/field";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "@/components/ui/file-upload";
import { useAuthStore } from "@/features/auth/auth-store/auth-store";
import { fetchStore } from "@/features/store/services/store-service";
import { StoreFormProps } from "@/features/store/types/store-types";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function InformationSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormProps>();

  const {user} = useAuthStore()
  useEffect(()=>{
    console.log('user data:', user)
  }, [user])

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: StoreFormProps) => {
    setIsLoading(true);
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    const userId = user.id
    toast.promise(
      fetchStore(data, userId)
        .then((res) => {
          if (res.status === 201) {
            return res.data.message;
          } else {
            throw new Error("Unexpected status code: " + res.status);
          }
        })
        .catch((error) => {
          throw error.message || "An error occurred while processing the request.";
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        loading: "Submitting your information...",
        success: (message) => `Success: ${message}`,
        error: (err) => `Error: ${err}`,
      },
      {
        position: "top-center",
        style: {
          background: "#FFFF",
          color: "#1d1d1d",
          fontWeight: "normal",
        },
      }
    );
  };

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontWeight={"semibold"} fontSize={"20px"}>
          Informasi Pribadi
        </Text>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Grid
          templateColumns={"repeat(2, 1fr)"}
          gap={3}
          borderBottom={"1px solid"}
          borderColor={"gray.300"}
          py={"5"}
        >
          <GridItem>
            <Box>
              <Stack gap="4" align="flex-start" width={"full"}>
                <Field
                  label="Slogan"
                  invalid={!!errors.slogan}
                  errorText={errors.slogan?.message}
                >
                  <Input
                    {...register("slogan", {
                      required: "Slogan is required",
                    })}
                    placeholder="Buat slogan untuk toko"
                  />
                </Field>
                <Field
                  label="Nama Toko"
                  invalid={!!errors.name}
                  errorText={errors.name?.message}
                >
                  <Input
                    {...register("name", {
                      required: "Nama Toko is required",
                    })}
                    placeholder="Buat nama untuk toko"
                  />
                </Field>
                <Button
                  colorPalette={"blue"}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          </GridItem>
          <GridItem>
            <Field
              label="Deskripsi"
              invalid={!!errors.description}
              errorText={errors.description?.message}
            >
              <Textarea
                {...register("description", {
                  required: "Deskripsi is required",
                  maxLength: {
                    value: 500,
                    message: "Deskripsi tidak boleh lebih dari 500 karakter.",
                  },
                })}
                placeholder="Masukkan deskripsi untuk toko..."
                h={"124px"}
              />
            </Field>
          </GridItem>
          <GridItem>
          </GridItem>
        </Grid>
        <Flex justifyContent={"space-between"} alignItems={"center"} my={5}>
          <Text fontWeight={"semibold"} fontSize={"20px"}>
            Logo Toko
          </Text>
        </Flex>
        <Box display={"flex"} width={"full"} gap={3} pb={10}>
          <FileUploadRoot
            width="25%"
            alignItems="stretch"
            maxFiles={1}
            cursor={"pointer"}
          >
            <FileUploadDropzone
              label="Drag and drop here to upload"
              description="Upload logo toko"
            />
            <FileUploadList />
          </FileUploadRoot>
        </Box>
      </form>
    </Box>
  );
}
