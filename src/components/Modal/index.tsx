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
import { RiSearchLine } from "react-icons/ri";
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
  }

  const renderContentModal = () => {
    switch (type) {
      case "add-product":
        return (
          <ModalContent>
            <ModalHeader color="black">
              Lançar produto{" "}
              <Badge fontSize="0.8em" colorScheme="red">
                Comanda Nº {number}
              </Badge>
            </ModalHeader>
            <ModalCloseButton color="black" />
            <ModalBody>
              <SearchBox />
            </ModalBody>
            <ModalFooter color="black">
              <Button onClick={closeModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        );
      case "view-items":
        return (
          <ModalContent>
            <ModalHeader color="black">
              Items da{" "}
              <Badge fontSize="0.8em" colorScheme="red">
                Comanda Nº {number}
              </Badge>
            </ModalHeader>
            <ModalCloseButton color="black" />
            <ModalBody>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Descrição</Th>
                    <Th isNumeric>Valor</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item.id}>
                      <Td color='black'>{item.name}</Td>
                      <Td color='black'>{item.description}</Td>
                      <Td color='black' isNumeric>{item?.value?.toPrecision(4)}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th isNumeric>Total: R$ {sumTotalItems().toPrecision(4)}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </ModalBody>
            <ModalFooter color="black">
              <Button onClick={closeModal}>Cancelar</Button>
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
