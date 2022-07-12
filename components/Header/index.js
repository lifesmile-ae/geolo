import React from 'react';
import HeaderTop from '../Header/HeaderTop';
import HeaderMiddle from '../Header/HeaderMiddle';
import HeaderBottom from '../Header/HeaderBottom';
import MobileNav from '../Header/MobileNav';

const Index = ({ category }) => {
  return (
    <header className="header">
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom category={category} />
      <MobileNav category={category} />
    </header>
  );
};

export default Index;
