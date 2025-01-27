
import LogoIcon from "@/components/icons/logo";
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
    Input,
    Stack,
    Text,
    Textarea
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function RegisterStore() {
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
  
    const navigate = useNavigate()
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
                navigate('/dashboard')
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
    <Box
      display={'flex'}
      alignItems={'center'}
    //   justifyContent={'center'}
    pt={24}
    
      flexDirection={'column'}
      width={'100vw'}
      height={'100vh'}
    >
      <LogoIcon />
      <Box width={'30%'} mt={5}>
        <Text
          py={'5'}
          textAlign={'center'}
          fontSize={'28px'}
          fontWeight={'semibold'}
        >
          Daftarkan toko anda
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Box
          gap={3}
          py={"5"}
        >
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
                <Button
                  colorPalette={"blue"}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Box>
        </Box>

      </form>

      </Box>
    </Box>
  );
}
