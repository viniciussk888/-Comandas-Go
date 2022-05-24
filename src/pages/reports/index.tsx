import { Box, Button, Flex, Heading, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Select, Stack, Table, Tbody, Td, Th, Thead, Tr, Text, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Input } from "../../components/form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { supabase } from "../../utils/supabaseClient";
import { isEqual, format } from 'date-fns';
import { formatValue } from "../../utils/formatValue";

export default function Relatorios() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [initialDate, setInitialDate] = useState(
    format(new Date().setDate(new Date().getDate() - 30), 'yyyy-MM-dd'),
  )
  const [finalDate, setFinalDate] = useState(
    new Date().toISOString().split('T')[0],
  )

  const fetchReports = async () => {
    console.log(initialDate, finalDate)
    setLoading(true)
    try {
      const { status, data } = await supabase.from("Sales").select()
      if (status === 200) {
        if (paymentMethod === '') {
          setReports(data.filter(sale => format(new Date(sale.created_at), 'yyyy-MM-dd') >= initialDate && format(new Date(sale.created_at), 'yyyy-MM-dd') <= finalDate))
        } else {
          setReports(data.filter(sale => format(new Date(sale.created_at), 'yyyy-MM-dd') >= initialDate && format(new Date(sale.created_at), 'yyyy-MM-dd') <= finalDate && sale.payment_method === paymentMethod))
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  console.log(reports)

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
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              name="date"
              type="date"
              maxW='270px'
              label="Data inicial"
            />
            <Input

              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              name="date"
              type="date"
              maxW='270px'
              label="Data final"
            />
            <Select onChange={e => setPaymentMethod(e.target.value)} placeholder='Selecione o status' focusBorderColor="pink.500" bgColor="gray.900"
              variant="filled" maxW='240px' size='lg' mt="8" mr="12">
              <option value="dinheiro" style={{ backgroundColor: '#1F2029' }}>Dinheiro</option>
              <option value="pix" style={{ backgroundColor: '#1F2029' }}>Pix</option>
              <option value="cartao-debito" style={{ backgroundColor: '#1F2029' }}>Cartão Debito</option>
              <option value="cartao-credito" style={{ backgroundColor: '#1F2029' }}>Cartão Credito</option>
            </Select>
            <Button onClick={fetchReports} colorScheme='pink.500' bg="pink.500" size='lg' alignItems="center" width='200px' mt="8" fontWeight="normal">
              Filtrar
            </Button>
          </Box>
          <Box mt="12">
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
                    <Th>Data</Th>
                    <Th>Cliente</Th>
                    <Th>Documento</Th>
                    <Th>Contato</Th>
                    <Th>Forma de pagamento</Th>
                    <Th>Crédito</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {reports.map(report => (
                    <Tr key={report.id}>
                      <Td>{report.comand_number}</Td>
                      <Td width='150px'>{format(new Date(report.created_at), 'dd-MM-yyyy')}</Td>
                      <Td>{report.name}</Td>
                      <Td>{report.client_document}</Td>
                      <Td>{report.client_contact}</Td>
                      <Td>{report.payment_method}</Td>
                      <Td>{formatValue(report.total)}</Td>
                    </Tr>
                  ))}
                  <Tr>
                    <Td>
                    </Td>
                    <Td>
                    </Td>
                    <Td>
                    </Td>
                    <Td>
                    </Td>
                    <Td>
                    </Td>
                    <Td>
                      <Text fontWeight="bold">Total:</Text>
                    </Td>
                    <Td><Text fontWeight="bold">{formatValue(reports.reduce((acc, item) => acc + item.total, 0))}</Text></Td>

                  </Tr>
                </Tbody>
              </Table>
            )}

          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
