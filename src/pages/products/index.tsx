import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  Flex,
  ModalContent,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Table,
  ModalBody,
  Tbody,
  Td,
  ModalCloseButton,
  ModalFooter,
  Text,
  ModalHeader,
  Th,
  Thead,
  useDisclosure,
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
import { formatValue } from "../../utils/formatValue";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const { status, data } = await supabase.from("Products");
      if (status === 200) {
        setProducts(data);
      }
      setLoading(false)
    }
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    setLoading(true);
    const { status, error } = await supabase
      .from("Products")
      .delete()
      .match({ id });
    if (error) {
      console.log(error);
    }
    if (status === 200) {
      setProducts(products.filter((product) => product.id !== id));
      onClose()
    }
    setLoading(false);
  }

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
          {products.length > 0 && (
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
                    <Td px={["4", "4", "6"]}>{formatValue(product.value)}</Td>
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
                        onClick={onOpen}
                      >
                        Excluir
                      </Button>
                    </Td>
                    <Modal onClose={onClose} isOpen={isOpen} isCentered>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader color="black">Atenção!</ModalHeader>
                        <ModalCloseButton color="black" />
                        <ModalBody color="black">
                          Deseja realmente deletar o produto?
                        </ModalBody>
                        <ModalFooter>
                          <Button disabled={loading} color="black" mr={3} onClick={onClose}>Fechar</Button>
                          <Button isLoading={loading} color="white" colorScheme='red' backgroundColor="red" onClick={() => deleteProduct(product.id)}>Confirma</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
          {loading && (
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}
          {products.length === 0 && !loading && (
            <Flex justify="center" align="center" mt="8">
              <Text fontSize="xl" color="gray.500">
                Nenhum produto cadastrado
              </Text>
            </Flex>
          )}

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
