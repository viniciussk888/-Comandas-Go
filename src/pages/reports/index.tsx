import { Box, Flex, Heading, Input, } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";

export default function Relatorios() {
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
          <Input
            name="date"
            type="date"
            maxW='320px'
          />
        </Box>
      </Flex>
    </Box>
  );
}
