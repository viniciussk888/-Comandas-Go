import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "../../components/form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../utils/supabaseClient";
import { useAlert } from "../../contexts/AlertContext";

type CreateProductData = {
  name: string;
  description: string;
  value: number;
};

const createUserSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  value: yup.string().required("Valor obrigatório"),
});

export default function CreateProduct() {
  const { setMessage,setOpenAlert } = useAlert()
  const { register, handleSubmit, formState,reset } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateProductData> = async (
    product
  ) => {
    const { status, error } = await supabase
      .from("Products")
      .insert(product);
    if (error) {
      setOpenAlert(true);
      setMessage(error.message);
      return console.log(error);
    }
    if (status === 201) {
      setOpenAlert(true);
      reset()
      setMessage('Produto criado com sucesso');
    }
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Cadastrar produto
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome"
                error={errors?.name}
                {...register("name")}
              />
              <Input
                name="value"
                label="Valor"
                type="number"
                error={errors?.value}
                {...register("value")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="description"
                label="Descrição"
                error={errors?.description}
                {...register("description")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/products" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
