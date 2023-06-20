import React, { useState, createContext, useContext, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

interface Hospital {
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviews: string[];
  beds: number;
  photoUrl: string;
}

export const AppContext = createContext({});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        hospitals,
        setHospitals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
