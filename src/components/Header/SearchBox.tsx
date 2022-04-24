import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

interface SearchBoxProps {
  searchProducts: (value: string) => void;
  mb?: string;
}

export function SearchBox({ searchProducts, mb }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      mb={mb}
      ml="6"
      maxW="400"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
        onBlur={() => searchProducts(searchTerm)}
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Digite o nome do produto"
        _placeholder={{ color: "gray.400" }}
      />
      <Button onClick={() => setSearchTerm(searchTerm)} backgroundColor='transparent' padding={0} color="#fff" leftIcon={<Icon as={RiSearchLine} fontSize="20" />}></Button>
    </Flex>
  )
}
