import {
  Badge,
  Button,
  Modal as ModalChackra,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Input } from "../../components/form/Input";
import { SearchBox } from "../Header/SearchBox";

interface Items {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface ModalProps {
  type: "add-product" | "view-items" | "close-comand" | null;
  openModal: boolean;
  number?: number;
  items?: Items[];
  setOpenModal: (open: boolean) => void;
}

export function Modal({
  openModal,
  number,
  setOpenModal,
  type,
  items = [],
}: ModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);

  useEffect(() => {
    if (openModal) {
      setOverlay(<OverlayOne />);
      onOpen();
    }
  }, [openModal, onOpen]);

  const closeModal = () => {
    setOpenModal(false);
    onClose();
  };

  const sumTotalItems = () => {
    return items.reduce((acc, item) => acc + item.value, 0);
  };

  const renderContentModal = () => {
    switch (type) {
      case "add-product":
        return (
          <ModalContent backgroundColor="gray.900">
            <ModalHeader color="white">
              <Badge fontSize="0.8em" colorScheme="red">
                Lançar produto comanda Nº {number}
              </Badge>
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <SearchBox />
            </ModalBody>
          </ModalContent>
        );
      case "view-items":
        return (
          <ModalContent backgroundColor="gray.800">
            <ModalHeader color="white">
              <Badge fontSize="0.8em" colorScheme="red">
                Items da comanda Nº {number}
              </Badge>
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th color="white">Nome</Th>
                    <Th color="white">Descrição</Th>
                    <Th color="white" isNumeric>
                      Valor
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item.id}>
                      <Td color="white">{item.name}</Td>
                      <Td color="white">{item.description}</Td>
                      <Td color="white" isNumeric>
                        {item?.value?.toPrecision(4)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th fontSize="1rem" color="white" isNumeric>
                      Total: R$ {sumTotalItems().toPrecision(4)}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </ModalBody>
          </ModalContent>
        );
      case "close-comand":
        return (
          <ModalContent backgroundColor="gray.800">
            <ModalHeader color="black">
              <Badge fontSize="0.8em" colorScheme="red">
                Fechar comanda Nº {number}
              </Badge>
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th color="white">Nome</Th>
                    <Th color="white">Descrição</Th>
                    <Th color="white" isNumeric>
                      Valor
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item.id}>
                      <Td color="white">{item.name}</Td>
                      <Td color="white">{item.description}</Td>
                      <Td color="white" isNumeric>
                        {item?.value?.toPrecision(4)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th fontSize='1rem' color="white" isNumeric>
                      Total: R$ {sumTotalItems().toPrecision(4)}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
              <Stack mt='5' spacing={3}>
                <Select variant="outline" placeholder="Forma de pagamento">
                  <option value="dinheiro" style={{backgroundColor:'#1F2029'}}>Dinheiro</option>
                  <option value="pix" style={{backgroundColor:'#1F2029'}}>Pix</option>
                  <option value="cartao-debito" style={{backgroundColor:'#1F2029'}}>Cartão Debito</option>
                  <option value="cartao-credito" style={{backgroundColor:'#1F2029'}}>Cartão Credito</option>
                </Select>
                <Input name="obs" label="Observação" />
              </Stack>
            </ModalBody>
            <ModalFooter color="black">
              <Button
                _hover={{
                  bgColor: "red.500",
                }}
                color="#fff"
                background="red"
                onClick={() => {}}
              >
                Finaliza comanda
              </Button>
            </ModalFooter>
          </ModalContent>
        );
      default:
        <></>;
        break;
    }
  };

  return (
    <ModalChackra isCentered isOpen={isOpen} onClose={closeModal}>
      {overlay}
      {renderContentModal()}
    </ModalChackra>
  );
}
