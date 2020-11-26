import React from 'react';
import NavDefault from '../components/NavDefault';

const LayoutPrivate = ({ children }) => {
  return (
    <>
      <NavDefault />
      {children}
    </>
  );
};

export default LayoutPrivate;
