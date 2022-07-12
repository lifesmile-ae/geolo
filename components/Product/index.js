import React from 'react';
import VariationTwo from './VariationTwo';
import Content from './Content';
import Aside from './Aside';
import RelatedProduct from './RelatedProduct';
import VariationOne from './VariationOne';
import Link from 'next/link';

const Index = ({ product }) => {
  return (
    <div className="mb-10 pb-1">
      <nav className="breadcrumb-nav container">
        <ul className="breadcrumb bb-no">
          <li>
            <Link href="/" passHref>
              <a>Home</a>
            </Link>
          </li>

          <li>Products</li>
        </ul>
      </nav>
      <div className="page-content">
        <div className="container">
          <div className="row gutter-lg">
            <div className="main-content">
              <div className="product product-single row">
                {/* Due to complexity of varitaions there are four type of variations 
                    we are providing in the site.
                    These Two are described as VariationOne.
                    i. Single (No varation)
                    ii. Variation by size & Color   

                    These two are described as VariationTwo
                    iii. Variation by Color
                    iv. Variation by size
                    
                    Due to lack of time this was not fixed properly 

                    In version 2 This things needs to be fixed.
                */}

                {product.product.variationtype === 'color' ||
                product.product.variationtype === 'size' ? (
                  <VariationTwo
                    product={product.product}
                    category={product.category}
                    average={product.average}
                    count={product.count}
                  />
                ) : (
                  <VariationOne
                    product={product.product}
                    category={product.category}
                    average={product.average}
                    count={product.count}
                  />
                )}
              </div>
              <Content product={product.product} count={product.count} />
              <RelatedProduct category={product.category} />
            </div>
            <Aside />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
