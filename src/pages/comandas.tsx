import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Comanda } from "../components/Comanda";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";

const comandas = [
  {
    id: "1",
    name: "João",
    document: "123.456.789-10",
    contact: "99999-9999",
    number: 1,
    total: 100,
    items: [
      {
        id: "1",
        name: "Coca-Cola",
        description: "Refrigerante",
        value: 10,

      },
      {
        id: "2",
        name: "Coca-Cola 2",
        description: "Refrigerante 2",
        value: 10,

      },
      {
        id: "3",
        name: "Coca-Cola 3",
        description: "Refrigerante 3",
        value: 10,

      },
    ],
    open: true,
  },
  {
    id: "2",
    name: "Maria",
    document: "123.456.789-10",
    contact: "99999-9999",
    number: 2,
    total: 100,
    items: [
      {
        id: "1",
        name: "Coca-Cola",
        description: "Refrigerante",
        value: 10,

      },
      {
        id: "2",
        name: "Coca-Cola 2",
        description: "Refrigerante 2",
        value: 10,

      },
      {
        id: "3",
        name: "Coca-Cola 3",
        description: "Refrigerante 3",
        value: 10,

      },
    ],
    open: true,
  },
  {
    id: "3",
    name: "Pedro",
    document: "123.456.789-10",
    contact: "99999-9999",
    number: 3,
    total: 100,
    items: [
      {
        id: "1",
        name: "Coca-Cola",
        description: "Refrigerante",
        value: 10,

      },
      {
        id: "2",
        name: "Coca-Cola 2",
        description: "Refrigerante 2",
        value: 10,

      },
      {
        id: "3",
        name: "Coca-Cola 3",
        description: "Refrigerante 3",
        value: 10,

      },
    ],
    open: true,
  },
  {
    id: "4",
    name: "João",
    document: "123.456.789-10",
    contact: "99999-9999",
    number: 4,
    total: 100,
    items: [
      {
        id: "1",
        name: "Coca-Cola",
        description: "Refrigerante",
        value: 10.9,

      },
      {
        id: "2",
        name: "Coca-Cola 2",
        description: "Refrigerante 2",
        value: 48.9,

      },
      {
        id: "3",
        name: "Coca-Cola 3",
        description: "Refrigerante 3",
        value: 10,

      },
    ],
    open: true,
  },
  {
    id: "5",
    name: "Maria",
    document: "123.456.789-10",
    contact: "99999-9999",
    number: 5,
    total: 100,
    items: [
      {
        id: "1",
        name: "Coca-Cola",
        description: "Refrigerante",
        value: 10,

      },
      {
        id: "2",
        name: "Coca-Cola 2",
        description: "Refrigerante 2",
        value: 10,

      },
      {
        id: "3",
        name: "Coca-Cola 3",
        description: "Refrigerante 3",
        value: 10,

      },
    ],
    open: true,
  },
];

export default function Comandas() {
  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
    md: false,
  });

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
            <Button type="submit" colorScheme="pink">
              Abrir comanda
            </Button>
          </Flex>
          <SimpleGrid
            maxHeight="600px"
            overflow="auto"
            columns={isWideVersion ? 1 : 3}
            spacing={2}
          >
            {comandas.map((comanda) => (
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
