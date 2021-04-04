import React, { createContext, useState, useContext } from 'react';

export const DonorContex = createContext({});

export function DonorProvider({ children }) {
  let [donor1, setDonor1] = useState({});

  if (donor1) {
    console.log(donor1);
  }

  return (
    <DonorContex.Provider value={{ donor1, setDonor1 }}>
      {children}
    </DonorContex.Provider>
  );
}

export const DonorData = () => useContext(DonorContex);
