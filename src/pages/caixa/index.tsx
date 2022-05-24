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
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { formatValue } from "../../utils/formatValue";
import { supabase } from "../../utils/supabaseClient";
import { isEqual, format } from 'date-fns';

export default function Caixa() {
  const [caixa, setCaixa] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCaixa = async () => {
      setLoading(true)
      try {
        const { status, data } = await supabase.from("Sales").select()
        if (status === 200) {
          setCaixa(data.filter(sale => format(new Date(sale.created_at), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')))
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCaixa()
  }, [])

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
          {loading ? (
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          ) : (
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Comanda</Th>
                  <Th>Cliente</Th>
                  <Th>Forma de pagamento</Th>
                  <Th>Crédito</Th>
                </Tr>
              </Thead>
              <Tbody>
                {caixa.map((item, index) => (
                  <Tr key={item.id}>
                    <Td>
                      <Text colorScheme="bold">Comanda {item.comand_number}</Text>
                    </Td>
                    <Td>
                      <Text colorScheme="bold">{item.name}</Text>
                    </Td>
                    <Td>
                      {item.payment_method}
                    </Td>
                    <Td>{formatValue(item.total)}</Td>
                  </Tr>
                ))}
                <Tr>
                  <Td>
                  </Td>
                  <Td>
                  </Td>
                  <Td>
                    <Text fontWeight="bold">Total:</Text>
                  </Td>
                  <Td><Text fontWeight="bold">{formatValue(caixa.reduce((acc, item) => acc + item.total, 0))}</Text></Td>
                </Tr>
              </Tbody>
            </Table>
          )}

        </Box>
      </Flex>
    </Box>
  );
}
