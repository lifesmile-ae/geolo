import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  removecartItem,
  addcartQty,
  removecartQty,
  clearCart,
  cartValue,
} from '../../redux/actions/cartActions';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

const OrdersMobile = ({ subtotal, total, shipping, discount }) => {
  const { t } = useTranslation('cart');
  const dispatch = useDispatch();
  const items = useSelector((state) => state.addcartItem.cart.cartItems);
  const cartItems = items.sort(
    (a, b) => parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice)
  );
  const [session, loading] = useSession();
  const router = useRouter();

  const productQuantityIncrement = (
    productCode,
    productQuantity,
    productStock
  ) => {
    if (productQuantity < productStock) {
      dispatch(addcartQty(productCode));
    }
  };

  const saveCart = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const cartData = {
      user: session.user._id,
      cartItems: cartItems,
    };
    const { data } = await axios.post('/api/cart', cartData, config);
    return data;
  };

  const handleClick = (e, path) => {
    let cartvalue = {
      subtotal,
      total,
      shipping,
      discount,
    };
    dispatch(cartValue(cartvalue));
    if (session) {
      saveCart();
      router.push(path);
    } else {
      router.push(path);
    }
  };

  const productQuantityDecrement = (productCode) => {
    dispatch(removecartQty(productCode));
  };
  return (
    <>
      <nav className={`breadcrumb-nav`}>
        <div className="container">
          <h5>{t('cart:shoppingcart')}</h5>
        </div>
      </nav>
      <div className="container cart mt-3">
        {cartItems?.map((item, i) => (
          <div className="row gutter-lg mt-2" key={i}>
            <div className="col-sm-12 display-flex justify-content-spacebetween">
              <div className="col-sm-9 mb-6">
                <Link href={item.slug} passHref>
                  <a className='text-dark'>{item.name}</a>
                </Link>

                <div className="product-subtotal">
                  <span className="amount">
                    {item.currency} {item.discountedPrice.toFixed(2)}
                  </span>
                </div>
                <div className="mob-product-quatity">
                  <div className="input-group">
                    <input
                      className="quantity form-control"
                      type="number"
                      min="1"
                      max="100000"
                      value={item.productQuantity}
                      size={item.productStock}
                      readOnly
                    />
                    <button
                      className="quantity-plus w-icon-plus"
                      onClick={(e) =>
                        productQuantityIncrement(
                          item.productCode,
                          item.productQuantity,
                          item.productStock
                        )
                      }
                    ></button>
                    <button
                      className="quantity-minus w-icon-minus"
                      onClick={(e) =>
                        productQuantityDecrement(
                          item.productCode,
                          item.productQuantity,
                          item.productStock
                        )
                      }
                    ></button>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 mb-6">
                <div className="p-relative">
                  <div className="image cart-product-img">
                    <div className="p-relative">
                      <div className="image">
                        <figure>
                          <Image
                            src={item.productImage}
                            alt="product"
                            width="120"
                            height="120"
                          />
                        </figure>
                      </div>
                      <button
                        className="btn btn-close"
                        onClick={() =>
                          dispatch(removecartItem(item.productCode))
                        }
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="sticky-btn">
          <a
            onClick={(e) => handleClick(e, '/login?redirect=/shipping')}
            className="btn btn-block btn-primary btn-icon-right btn-rounded  btn-checkout"
          >
            Buy {cartItems.reduce((a, c) => a + c.productQuantity, 0)} items for{' '}
            {total}
          </a>
        </div>
      </div>
    </>
  );
};

export default OrdersMobile;
