import React from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  removecartItem,
  addcartQty,
  removecartQty,
  clearCart,
} from '../../redux/actions/cartActions';
import { useTranslation } from 'next-i18next';

const OrderDesktop = () => {
  const { t } = useTranslation('cart');
  const dispatch = useDispatch();
  const items = useSelector((state) => state.addcartItem.cart.cartItems);
  const cartItems = items.sort(
    (a, b) => parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice)
  );

  const productQuantityIncrement = (
    productCode,
    productQuantity,
    productStock
  ) => {
    if (productQuantity < productStock) {
      dispatch(addcartQty(productCode));
    }
  };

  const productQuantityDecrement = (productCode) => {
    dispatch(removecartQty(productCode));
  };

  return (
    <div className="container cart mt-3">
      <div className="row gutter-lg mt-2">
        <div className="col-lg-12 pr-lg-4 mb-6">
          <table className="shop-table cart-table">
            <thead>
              <tr>
                <th className="product-name">
                  <span>{t('cart:product')}</span>
                </th>
                <th></th>
                <th className="product-price">
                  <span>{t('cart:price')}</span>
                </th>
                <th className="product-quantity">
                  <span>{t('cart:quantity')}</span>
                </th>
                <th className="product-subtotal">
                  <span>{t('cart:subtotal')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, i) => (
                <tr key={i}>
                  <td className="product-thumbnail">
                    <div className="p-relative">
                      <div className="image">
                        <figure>
                          <Image
                            src={item.productImage}
                            alt="product"
                            width="300"
                            height="338"
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
                  </td>
                  <td className="product-name">
                    <Link href={item.slug} passHref>
                      <a>{item.name}</a>
                    </Link>
                  </td>
                  <td className="product-subtotal">
                    <span className="amount">
                      {item.currency} {item.discountedPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="product-quantity">
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
                  </td>
                  <td className="product-price">
                    <span className="amount">
                      {item.currency}{' '}
                      {(item.discountedPrice * item.productQuantity).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-action">
            <Link href="/">
              <a className="btn btn-primary btn-tertiary btn-rounded btn-icon-left btn-shopping mr-auto">
                {t('cart:continueShopping')}
              </a>
            </Link>
            <button
              className="btn btn-rounded btn-default btn-disabled"
              name="clear_cart"
              value="Clear Cart"
              onClick={(e) => dispatch(clearCart())}
            >
              {t('cart:clearCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDesktop;
