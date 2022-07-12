import React from 'react';
import FooterTop from './Top';
import FooterBottom from './Bottom';
import FooterBottomMobile from './Bottom/footerBottomMobile';
import NewsLetter from './NewsLetter';
import useWindowSize from '../../hooks/useWindowSize';

const Index = () => {
  const size = useWindowSize();
  return (
    <footer className="footer">
      {size.width > 767 ? (
        <>
          <NewsLetter />{' '}
          <div className="container">
            <FooterTop />
          </div>
          <FooterBottom />
        </>
      ) : (
        <FooterBottomMobile />
      )}
    </footer>
  );
};

export default Index;
