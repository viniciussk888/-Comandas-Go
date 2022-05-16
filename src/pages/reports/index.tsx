import { Box, Button, Flex, Heading, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Select, Stack, Table, Tbody, Td, Th, Thead, Tr, Text} from "@chakra-ui/react";
import { format } from "path";
import { useEffect, useState } from "react";
import { Input } from "../../components/form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { supabase } from "../../utils/supabaseClient";

export default function Relatorios() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const { status, data } = await supabase.from("Sales").select()
        if (status === 200) {
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Relatórios
            </Heading>
          </Flex>
          <Box display="flex" flexDirection="row" alignItems="center" mt="10">
          <Input
            name="date"
            type="date"
            maxW='270px'
            label="Data inicial"
          />
          <Input
            name="date"
            type="date"
            maxW='270px'
            label="Data final"
          />
          <Select placeholder='Selecione o status' focusBorderColor="pink.500" bgColor="gray.900"
          variant="filled" maxW='240px' size='lg' mt="8" mr="12">
            <option value="dinheiro" style={{ backgroundColor: '#1F2029'}}>Dinheiro</option>
            <option value="pix" style={{ backgroundColor: '#1F2029'}}>Pix</option>
            <option value="cartao-debito" style={{ backgroundColor: '#1F2029' }}>Cartão Debito</option>
            <option value="cartao-credito" style={{ backgroundColor: '#1F2029' }}>Cartão Credito</option>
          </Select>
          <Button colorScheme='pink.500' bg="pink.500" size='lg' alignItems="center" width='200px' mt="8" fontWeight="normal">
            Filtrar
          </Button>
          </Box>
          <Box mt="12">
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
                <Td>Valor</Td>
              </Tr>
              <Tr>
                <Td>
                </Td>
                <Td>
                </Td>
                <Td><Text fontWeight="bold">Total:</Text></Td>
              </Tr>
            </Tbody>
          </Table>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
