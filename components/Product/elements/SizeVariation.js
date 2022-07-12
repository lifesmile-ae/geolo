import React from 'react';

const SizeVariation = ({
  product,
  productSize,
  productSizeHandler,
  className,
}) => {
  const { variations } = product;
  return (
    <div className={className ? className : ''}>
      {variations.map((variation) =>
        variation.sizes.map((size, i) => (
          <a
            className={size?.name === productSize ? 'size active' : 'size'}
            key={i}
            data-size={size?.name}
            onClick={(event) => productSizeHandler(event)}
            style={{ cursor: 'pointer' }}
          >
            {size?.name.toUpperCase()}
          </a>
        ))
      )}
    </div>
  );
};

export default SizeVariation;
