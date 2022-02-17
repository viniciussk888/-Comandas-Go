import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Comanda } from "../../components/Comanda";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { useAlert } from "../../contexts/AlertContext";
import { supabase } from "../../utils/supabaseClient";

export default function Comandas() {
  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
    md: false,
  });
  const { setMessage, setOpenAlert } = useAlert();
  const [comandas, setComandas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("Comands");
      if (error) {
        setOpenAlert(true);
        setMessage(error?.message);
        return console.log(error);
      }
      setComandas(data);
    }
    fetchData();
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box
          w="100%"
          p={["6", "8"]}
          bg="gray.800"
          borderRadius={8}
          pb={4}
          flexDirection={"column"}
        >
          <Flex w="100%" justifyContent={"space-between"} flexDirection={"row"}>
            <Text fontSize="lg" mb="4">
              Comandas abertas
            </Text>
            <Button as="a" href="/comandas/create" colorScheme="pink">
              Abrir comanda
            </Button>
          </Flex>
          <SimpleGrid
            maxHeight="600px"
            overflow="auto"
            columns={isWideVersion ? 1 : 3}
            spacing={2}
          >
            {comandas
              .filter((comanda) => comanda.open === true)
              .map((comanda) => (
                <Comanda
                  key={comanda.id}
                  id={comanda.id}
                  name={comanda.name}
                  contact={comanda.contact}
                  number={comanda.number}
                  open={comanda.open}
                  items={comanda.items}
                  document={comanda.document}
                />
              ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
}
