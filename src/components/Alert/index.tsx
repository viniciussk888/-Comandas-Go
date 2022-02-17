import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface AlertProps {
  message: string;
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
}

export function Alert({ message, openAlert, setOpenAlert }: AlertProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    if (openAlert) {
      onOpen();
    }
  }, [openAlert, onOpen]);

  const closeAlert = () => {
    setOpenAlert(false);
    onClose();
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader color="black">Atenção!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody color="black">{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              backgroundColor="red"
              _hover={{
                bgColor: "red.500",
              }}
              ref={cancelRef}
              onClick={closeAlert}
            >
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
