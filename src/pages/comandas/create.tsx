import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useBreakpointValue,
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

interface Items {
  id: string;
  name: string;
  description: string;
  value: number;
}

type CreateComandData = {
  name: string;
  document?: string;
  contact?: string;
  items?: Items[];
  open?: boolean;
  number: number;
};

const createUserSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  number: yup.string().required("Selecione um número de comanda"),
});

export default function CreateComanda() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const { setMessage, setOpenAlert } = useAlert();
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  const { errors } = formState;

  const handleCreateComand: SubmitHandler<CreateComandData> = async (
    comanda
  ) => {
    const response = await supabase
      .from("Comands")
      .select("open")
      .eq("number", comanda.number);
    if (response.status === 200) {
      if (response.data.length > 0 && response.data[0].open) {
        setOpenAlert(true);
        setMessage("Comanda já está aberta");
        return;
      } else if (response.data.length > 0 && !response.data[0].open) {
        const { error, status } = await supabase
          .from("Comands")
          .update({
            name: comanda.name,
            document: comanda.document,
            contact: comanda.contact,
            items: [],
            open: true,
            number: comanda.number,
          })
          .match({ number: comanda.number });
        if (error?.message) {
          setOpenAlert(true);
          setMessage(error.message);
          return console.log(error);
        } else {
          setOpenAlert(true);
          reset();
          setMessage("Comanda aberta com sucesso");
        }
        return;
      } else if (response.data.length === 0) {
        const { error } = await supabase.from("Comands").insert({
          name: comanda.name,
          document: comanda.document,
          contact: comanda.contact,
          items: [],
          open: true,
          number: comanda.number,
        });
        if (error?.message) {
          setOpenAlert(true);
          setMessage(error.message);
          return console.log(error);
        } else {
          setOpenAlert(true);
          reset();
          setMessage("Comanda aberta com sucesso");
        }
      }
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
          onSubmit={handleSubmit(handleCreateComand)}
        >
          <Heading size="lg" fontWeight="normal">
            Abrir nova comanda
          </Heading>

          <Divider my="6" borderColor="gray.700" />
          <VStack>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="number"
                label="Número da comanda"
                type="number"
                error={errors?.number}
                {...register("number")}
              />
            </SimpleGrid>
          </VStack>

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
                name="document"
                label="Documento"
                error={errors?.document}
                {...register("document")}
              />
              <Input
                name="contact"
                label="Contato"
                error={errors?.contact}
                {...register("contact")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/comandas" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Abrir
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
