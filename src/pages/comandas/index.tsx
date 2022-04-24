import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Stack,
  Skeleton,
  Heading
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
  const [comandas, setComandas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await supabase.from("Comands").select().order('number', { ascending: true });
      if (status === 200) {
        setComandas(data);
      }
    }
    fetchData();
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box
          flex="1" borderRadius="8" bg="gray.800" p="8"
        >
          <Flex w="100%" justifyContent={"space-between"} flexDirection={"row"}>
            <Heading size="lg" fontWeight="normal">
              Comandas abertas
            </Heading>
            <Button
              size="sm"
              fontSize="sm"
              as="a" href="/comandas/create" colorScheme="pink">
              Abrir comanda
            </Button>
          </Flex>
          {comandas.length > 0 ? (
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
          ) : (
            <Stack>
              <Skeleton height="40px" mt="5" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
