import React, { useState } from 'react';
import Sidebar from '../Category/Sidebar';
import Product from '../Product/BriefView';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

const Index = ({ products }) => {
  const router = useRouter();
  const [items, setItems] = useState(products);
  const [hasMore, sethasMore] = useState(true);
  const [skip, setSkip] = useState(10);

  const fetchMore = async () => {
    const res = await fetch(
      `/api/product?search=${router.query.search}&skip=${skip}&limit=10`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const commentsFormServer = await fetchMore();

    setItems([...items, ...commentsFormServer.products]);
    if (
      commentsFormServer.products.length === 0 ||
      commentsFormServer.products.length < 10
    ) {
      sethasMore(false);
    }
    setSkip(skip + 10);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<div className="loader" key={0}></div>}
        style={{ overflowY: 'hidden' }}
      >
        <div className="page-content">
          <div className="container">
            <div className="shop-content row gutter-lg mb-10">
              <Sidebar />
              <div className="main-content">
                <div className="product-wrapper row cols-lg-4 cols-md-3 cols-sm-2 cols-2">
                  {items?.map((product, i) => (
                    <Product key={i} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Index;
