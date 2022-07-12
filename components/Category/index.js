import React, { useState } from 'react';
import Children from './Children';
import Sidebar from './Sidebar';
import TopFilter from './TopFilter';
import Product from '../Product/BriefView';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

const Index = ({ products }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const [items, setItems] = useState(products);
  const [hasMore, sethasMore] = useState(true);
  const [skip, setSkip] = useState(10);

  return (
    <>
      <div className="page-content">
        <div className="container">
          <Children category={products.children} />
          <div className="shop-content row gutter-lg mb-10">
            <Sidebar />
            <div className="main-content">
              <TopFilter limit={products.limit} />
              <div className="product-wrapper row cols-lg-4 cols-md-3 cols-sm-2 cols-2">
                {products?.getProduct?.map((product, i) => (
                  <Product key={i} product={product} />
                ))}
              </div>
              <div className="toolbox toolbox-pagination justify-content-between">
                <p className="showing-info mb-2 mb-sm-0">
                  Showing
                  <span>
                    1-{products.resultsPerPage} of {products.totalDocuments}
                  </span>
                  Products
                </p>
                <ul className="pagination">
                  {products.currentPage !== 1 && (
                    <li className="page-item active">
                      <Link
                        href={`/product-category/${router.query.slug}?page=${
                          products.currentPage - 1
                        }`}
                        passHref
                      >
                        <a aria-label="Previous" tabIndex={-1}>
                          <i className="w-icon-long-arrow-left"></i>Prev
                        </a>
                      </Link>
                    </li>
                  )}

                  <li className="page-item active">
                    <Link
                      href={`/product-category/${router.query.slug}?page=${products.currentPage}`}
                      passHref
                    >
                      <a className="page-link">{products.currentPage}</a>
                    </Link>
                  </li>
                  {products.currentPage !== products.totalPage && (
                    <>
                      <li className="page-item">
                        <Link
                          href={`/product-category/${router.query.slug}?page=${
                            products.currentPage + 1
                          }`}
                          passHref
                        >
                          <a className="page-link">
                            {products.currentPage + 1}
                          </a>
                        </Link>
                      </li>

                      <li className="page-item">
                        <Link
                          href={`/product-category/${router.query.slug}?page=${
                            products.currentPage + 2
                          }`}
                          passHref
                        >
                          <a className="page-link">
                            {' '}
                            Next<i className="w-icon-long-arrow-right"></i>
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
