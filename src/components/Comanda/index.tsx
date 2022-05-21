import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { SearchBox } from "../Header/SearchBox";
import { Modal } from "../Modal";
import { formatValue } from "../../utils/formatValue";
import { supabase } from "../../utils/supabaseClient";
import { useAlert } from "../../contexts/AlertContext";

interface Items {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface ComandaProps {
  id: string;
  name: string;
  document?: string;
  contact: string;
  number: number;
  items: Items[];
  open: boolean;
}

export function Comanda({
  id,
  document,
  items,
  name,
  number,
  open,
  contact,
}: ComandaProps) {
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const { setOpenAlert, setMessage } = useAlert();

  const sumTotalItems = () => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }

  const cancelComand = async () => {
    if (window.confirm(`Você deseja realmente CANCELAR COMANDA N° ${number}?`)) {
      try {
        const { status } = await supabase.from("Comands").update({
          open: false
        }).match({ number })
        if (status === 200) {
          window.location.reload();
          setOpenAlert(true)
          setMessage("Comanda cancelada com sucesso!")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Flex mt={6} mr={3} maxWidth="320px" bg={"gray.50"} borderRadius={8} p={4}>
      <Stat>
        <StatNumber color="black">
          Comanda{" "}
          <Badge fontSize="0.8em" colorScheme="red">
            Nº {number}
          </Badge>
        </StatNumber>
        <StatLabel color="black">
          {name.toUpperCase()} {document && `\n${document}`}
        </StatLabel>
        <StatHelpText color="black">Contato: {contact}</StatHelpText>
        <StatNumber mb={2} color="black">
          {formatValue(sumTotalItems())}
        </StatNumber>
        <Menu>
          <MenuButton as={Button} colorScheme="pink">
            Ações da comanda
          </MenuButton>
          <MenuList backgroundColor="gray.50">
            <MenuItem
              onClick={() => {
                setTypeModal("add-product");
                setOpenModal(true);
              }}
              color="black"
            >
              Adicionar produto
            </MenuItem>
            <MenuItem
              color="black"
              onClick={() => {
                setTypeModal("view-items");
                setOpenModal(true);
              }}
            >
              Ver items
            </MenuItem>
            <MenuItem color="black" onClick={() => cancelComand()}>Cancelar comanda
            </MenuItem>
            <MenuItem color="red" onClick={() => {
              setTypeModal("close-comand");
              setOpenModal(true);
            }}>Fechar comanda</MenuItem>
          </MenuList>
        </Menu>
      </Stat>
      <Modal
        type={typeModal}
        setOpenModal={setOpenModal}
        items={items}
        number={number}
        openModal={openModal}
      />
    </Flex>
  );
}
