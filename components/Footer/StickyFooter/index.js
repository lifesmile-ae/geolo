import React from 'react';
import Image from 'next/image';
import {
  showcartsidebar,
  hidecartsidebar,
  removecartItem,
} from '../../../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import {
  showmobilesidebar,
  hidemobilesidebar,
} from '../../../redux/actions/siteActions';
import {TbHome} from 'react-icons/tb';
import {BiCategory, BiUser, BiShoppingBag} from 'react-icons/bi';
import {RiChatSmile3Line} from 'react-icons/ri';


const Index = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.addcartItem.cart.cartItems);
  return (
    <div className="sticky-footer sticky-content fix-bottom fixed">
      <Link href="/" passHref>
        <a className="sticky-link active">
          <TbHome  className='tabbar-icon'/>
          <p>Home</p>
        </a>
      </Link>

      <a onClick={(e) => dispatch(showmobilesidebar())} className="sticky-link">
      <BiCategory  className='tabbar-icon'/>
        <p>Category</p>
      </a>

      <Link href="/account" passHref>
        <a className="sticky-link">
        <BiUser className='tabbar-icon'/>
          <p>Account</p>
        </a>
      </Link>

      <a className="sticky-link" onClick={() => dispatch(showcartsidebar())}>
        <BiShoppingBag className='tabbar-icon'/>
          <span className="cart-count ccm">{cartItems.length}</span>
        
        <p>Cart</p>
      </a>

      <div className="header-search hs-toggle dir-up">
        <Link href="/mobilechat" passHref>
          <a className="search-toggle sticky-link">
          <RiChatSmile3Line  className='tabbar-icon'/>
            <p>Support</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Index;
