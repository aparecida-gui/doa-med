import React, { createContext, useState, useContext } from 'react';

export const UserContex = createContext({});

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState({});

  if (user) {
    console.log(user);
  }

  return (
    <UserContex.Provider value={{ user, setUser }}>
      {children}
    </UserContex.Provider>
  );
};

export const useAuth = () => useContext(UserContex);
