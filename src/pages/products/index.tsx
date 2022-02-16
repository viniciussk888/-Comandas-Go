import { Box, Button, Checkbox, Flex, Heading, Icon, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import Link from 'next/link'
import { RiAddLine, RiPencilLine, RiDeleteBin3Line } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { SideBar } from '../../components/Sidebar'

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Produtos</Heading>

            <Link href="/products/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Nome</Th>
                { isWideVersion && <Th>Valor</Th> }
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td px={["4", "4", "6"]}>
                  <Text colorScheme="bold">Cerveja Skoll 600ml</Text>
                </Td>
                { isWideVersion && <Td px={["4", "4", "6"]}>R$ 8,00</Td> }
                <Td px={["4", "4", "6"]}>
                  <Button
                  mr='3'
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
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td px={["4", "4", "6"]}>
                  <Text colorScheme="bold">Tabua de frios 4P</Text>
                  <Text fontSize="sm" color="gray.300">Queijo, Palmito, Salame, Presunto e salgados.</Text>
                </Td>
                { isWideVersion && <Td px={["4", "4", "6"]}>R$ 40,00</Td> }
                <Td px={["4", "4", "6"]}>
                  <Button
                  mr='3'
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
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}
