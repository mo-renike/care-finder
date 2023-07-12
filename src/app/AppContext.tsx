import React, { useState, createContext, useContext, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppProviderProps {
  children: ReactNode;
}
interface AppContextType {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  hospitals: Hospital[];
  setHospitals: React.Dispatch<React.SetStateAction<Hospital[]>>;
  exportedHospitals: string[];
  setExportedHospitals: React.Dispatch<React.SetStateAction<string[]>>;
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChat: () => void;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [exportedHospitals, setExportedHospitals] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        hospitals,
        setHospitals,
        exportedHospitals,
        setExportedHospitals,
        isChatOpen,
        setIsChatOpen,
        toggleChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
