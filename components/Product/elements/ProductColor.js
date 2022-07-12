import React from 'react';

const ProductColor = ({
  product,
  productColor,
  productColorHandler,
  className,
}) => {
  const { variations } = product;
  return (
    <div className={className ? className : ''}>
      {variations.map((data, i) => (
        <a
          className={`color ${
            data?.color?.name === productColor ? 'active' : ''
          }`}
          style={{ backgroundColor: data?.color?.code, cursor: 'pointer' }}
          key={i}
          data-colorname={data?.color?.name}
          onClick={(event) => productColorHandler(event)}
        ></a>
      ))}
    </div>
  );
};

export default ProductColor;
