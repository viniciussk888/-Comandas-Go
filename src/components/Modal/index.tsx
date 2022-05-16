import {
  Badge,
  Box,
  Button,
  Modal as ModalChackra,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
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
import { useAlert } from "../../contexts/AlertContext";
import { formatValue } from "../../utils/formatValue";
import { supabase } from "../../utils/supabaseClient";
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
  const [products, setProducts] = useState<Items[]>([]);
  const { setOpenAlert, setMessage } = useAlert();
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [obs, setObs] = useState("");

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

  const searchProducts = async (value: string) => {
    setProducts([]);
    setSearchLoading(true);
    try {
      const { data, error, } = await supabase.from("Products").select("*").like("name", `%${value}%`)
      if (data.length > 0) {
        setProducts(data)
      }
      if (data.length === 0) {
        setOpenAlert(true)
        setMessage("Nenhum produto encontrado")
      }
      if (error) {
        setOpenAlert(true)
        setMessage("Erro ao buscar produtos")
        console.log(error)
      }
      setSearchLoading(false)
    } catch (error) {
      console.log(error)
      setSearchLoading(false)
    }
  }

  const addProduct = async (product: Items) => {
    setLoading(true)
    try {
      const { data } = await supabase.from("Comands").select("items").match({ number })
      const items = data[0].items
      const newItems = [...items, product]
      const { status } = await supabase.from("Comands").update({
        items: newItems
      }).match({ number })
      if (status === 200) {
        setOpenAlert(true)
        setMessage("Produto adicionado com sucesso")
        onClose()
        window.location.reload()
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const closeComande = async () => {
    if (!paymentMethod) {
      setOpenAlert(true)
      setMessage("Por favor, selecione um método de pagamento")
      return
    }
    setLoading(true)
    try {
      const response = await supabase
        .from("Comands")
        .select("open")
        .eq("number", number);
      if (response.status === 200 && response.data.length > 0 && response.data[0].open) {
        if (items.length === 0) {
          setOpenAlert(true)
          setMessage("Nenhum produto adicionado")
          setLoading(false)
          return
        } else {
          const { status } = await supabase.from("Comands").update({
            open: false
          }).match({ number })
          if (status === 200) {
            const { status } = await supabase.from('Sales').insert({
              items: items,
              comand_number: number,
              name: response.data[0].name || "Consumidor",
              total: items.reduce((acc, item) => acc + item.value, 0),
              payment_method: paymentMethod,
              client_document: response.data[0].document || "Doc. não informado",
              client_contact: response.data[0].contact || "Contato não informado",
              user: 'default',
              obs
            });
            if (status === 201) {
              setOpenAlert(true)
              setMessage("Comanda fechada com sucesso")
              onClose()
              window.location.reload()
            }
          }
        }
      }

    } finally {
      setLoading(false)
    }
  }

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
              <SearchBox mb="4" searchProducts={searchProducts} />
              <ModalBody>
                {searchLoading ? (
                  <Box alignItems='center' w="100%" justifyContent='center' display='flex'>
                    <Spinner size="lg" color="white" />
                  </Box>
                ) : null}
                {products.length > 0 && (
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th color="white">Nome</Th>
                        <Th color="white">Descrição</Th>
                        <Th color="white" isNumeric>
                          Valor
                        </Th>
                        <Th color="white">Ação</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {products.map((product) => (
                        <Tr key={product.id}>
                          <Td color="white">{product.name}</Td>
                          <Td color="white">{product.description}</Td>
                          <Td color="white" isNumeric>
                            {formatValue(product?.value)}
                          </Td>
                          <Td color="white"><Button isLoading={loading} bg="red.400" colorScheme="red.400" onClick={() => addProduct(product)}>Adicionar</Button></Td>
                        </Tr>

                      ))}
                    </Tbody>
                  </Table>
                )}

              </ModalBody>
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
              <Table size="md">
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
                        {formatValue(item?.value)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th fontSize="1rem" color="white" isNumeric>
                      Total: {formatValue(sumTotalItems())}
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
              <Table size="md">
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
                        {formatValue(item?.value)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th fontSize='1rem' color="white" isNumeric>
                      Total: {formatValue(sumTotalItems())}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
              <Stack mt='5' spacing={3}>
                <Select onChange={(e) => setPaymentMethod(e.target.value)} variant="outline" placeholder="Forma de pagamento">
                  <option value="dinheiro" style={{ backgroundColor: '#1F2029' }}>Dinheiro</option>
                  <option value="pix" style={{ backgroundColor: '#1F2029' }}>Pix</option>
                  <option value="cartao-debito" style={{ backgroundColor: '#1F2029' }}>Cartão Debito</option>
                  <option value="cartao-credito" style={{ backgroundColor: '#1F2029' }}>Cartão Credito</option>
                </Select>
                <Input onChange={e => setObs(e.target.value)} value={obs} name="obs" label="Observação" />
              </Stack>
            </ModalBody>
            <ModalFooter color="black">
              <Button
                _hover={{
                  bgColor: "red.500",
                }}
                color="#fff"
                background="red"
                onClick={closeComande}
                isLoading={loading}
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
