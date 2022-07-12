import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { removewishItem } from '../../redux/actions/wishActions';
import Link from 'next/link';

const Index = () => {
  const wishItems = useSelector(
    (state) => state.wishListItems.wishList.wishItems
  );
  const dispatch = useDispatch();
  return (
    <main className="main wishlist-page">
      <nav className="breadcrumb-nav mb-10">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="demo1.html">Home</a>
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </nav>
      <div className="page-content">
        <div className="container mt-8">
          <h3 className="wishlist-title">My wishlist</h3>
          {wishItems.length > 0 ? (
            <table className="shop-table wishlist-table">
              <thead>
                <tr>
                  <th className="product-name">
                    <span>Product</span>
                  </th>
                  <th></th>
                  <th className="product-price">
                    <span>Price</span>
                  </th>
                  <th className="product-stock-status">
                    <span>Stock Status</span>
                  </th>
                  <th className="wishlist-action">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishItems.map((item, i) => (
                  <tr key={i}>
                    <td className="product-thumbnail">
                      <div className="p-relative">
                        <a href="product-default.html">
                          <figure>
                            <Image
                              src={item.image}
                              alt="product"
                              width="300"
                              height="338"
                            />
                          </figure>
                        </a>
                        <button
                          type="button"
                          className="btn btn-close"
                          onClick={() => dispatch(removewishItem(item.id))}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </td>
                    <td className="product-name">
                      <a href="product-default.html">{item.name}</a>
                    </td>
                    <td className="product-price">
                      <ins className="new-price price-flg">
                        {item.currency} {'  '}
                        {item.price}
                      </ins>
                    </td>
                    <td className="product-stock-status">
                      <span className="wishlist-in-stock">In Stock</span>
                    </td>
                    <td className="wishlist-action">
                      <div className="d-lg-flex j-c-c">
                        <Link href={`/product/${item.slug}`} passHref>
                          <a className="btn btn-info btn-default btn-rounded btn-sm mb-2 mb-lg-0">
                            Quick View
                          </a>
                        </Link>

                        <a
                          style={{ cursor: 'pointer' }}
                          onClick={() => dispatch(removewishItem(item.id))}
                          className="btn btn-error btn-remove btn-rounded btn-sm ml-lg-2"
                        >
                          Remove Item
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Items To Show</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Index;
