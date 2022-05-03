import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { formatValue } from "../../utils/formatValue";

export default function Caixa() {
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Caixa
            </Heading>
          </Flex>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Comanda</Th>
                <Th>Cliente</Th>
                <Th>Crédito</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Text colorScheme="bold">Comanda 01</Text>
                </Td>
                <Td>
                  <Text colorScheme="bold">Alberto</Text>
                </Td>
                <Td>{formatValue(100)}</Td>
              </Tr>
              <Tr>
                <Td>
                </Td>
                <Td>
                </Td>
                <Td><Text fontWeight="bold">Total: {formatValue(100)}</Text></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
