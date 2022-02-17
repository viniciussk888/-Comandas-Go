import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "../components/Alert";

export interface AlertProviderProps {
  children: ReactNode;
}

interface AlertProvider {
  openAlert: boolean;
  setMessage: (value:string) => void;
  setOpenAlert: (value: boolean) => void
}

const AlertContext = createContext<AlertProvider>({
  openAlert: false,
  setOpenAlert: () => {},
  setMessage: () => {},
});

export function AlertProvider({ children }: AlertProviderProps) {
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <AlertContext.Provider value={{ openAlert, setMessage, setOpenAlert }}>
      <Alert
        message={message}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
