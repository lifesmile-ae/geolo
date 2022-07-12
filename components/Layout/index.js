import React, { useEffect } from 'react';
import SEO from '../Seo';
import { useSelector } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import StickyFooter from '../Footer/StickyFooter';
import Popup from '../Popup';
import ScrollArrow from '../ScrollToTop';
import Chat from '../../components/Chat';
import { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/client';
import { storeUserId, removeUserId } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';

const Index = ({ children, title, description, category }) => {
  const [session, loading] = useSession();
  const size = useWindowSize();
  const dispatch = useDispatch();
  useEffect(() => {
    if (session) {
      dispatch(storeUserId(session.user._id));
    }
  }, [session]);

  const { show } = useSelector((state) => state.mobilesidebar);
  return (
    <>
      <SEO title={title} description={description} />
      <div className={`home ${show && `mmenu-active`}`}>
        <div className="page-wrapper">
          <h1 className="d-none">{title}</h1>
          <Header category={category} />
          <Toaster />
          <main className="main">{children}</main>
          <Footer />
          <StickyFooter />
          {size.width > 767 && <Chat />}

          {/* <Popup /> */}
          {/* <ScrollArrow /> */}
        </div>
      </div>
    </>
  );
};
export default Index;
