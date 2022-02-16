import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine, RiDeleteBin3Line } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";
import { supabase } from "../../utils/supabaseClient";

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await supabase.from("Products");
      if (status === 200) {
        setProducts(data);
      }
    }
    fetchData();
  }, []);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Produtos
            </Heading>

            <Link href="/products/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          {products.length > 0 ? (
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  {isWideVersion && <Th>Descrição</Th>}
                  <Th>Valor</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td px={["4", "4", "6"]}>
                      <Text colorScheme="bold">{product.name}</Text>
                    </Td>
                    {isWideVersion && (
                      <Td px={["4", "4", "6"]}>{product.description}</Td>
                    )}
                    <Td px={["4", "4", "6"]}>R$ {Number(product.value).toPrecision(3)}</Td>
                    <Td px={["4", "4", "6"]}>
                      <Button
                        mr="3"
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        Editar
                      </Button>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="red"
                        leftIcon={<Icon as={RiDeleteBin3Line} fontSize="16" />}
                      >
                        Excluir
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
