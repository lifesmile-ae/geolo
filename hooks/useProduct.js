import React, { useState, useEffect } from 'react';
import { getDiscountPrice } from '../utils/product';

const useProduct = (product) => {
  const { discount, variations } = product;
  const [productColor, setProductColor] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productStock, setProductStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productCode, setProductCode] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productImage, setProductImage] = useState(0);

  const productColorHandler = (e) => {
    const color = e.target.dataset.colorname
      ? e.target.dataset.colorname
      : e.target.value;
    setProductColor(color);
    const sizes =
      variations &&
      variations.filter((item) => item.color.name === color)[0].sizes;
    setProductSize(sizes[0].name);

    const thumbs =
      variations &&
      variations.filter((item) => item.color.name === color)[0].color.thumbs;

    setProductPrice(sizes[0].price);
    setProductStock(sizes[0].stock);
    setProductCode(sizes[0].itemCode);
    setProductImage(thumbs);
    setProductQuantity(1);
  };

  const productSizeHandler = (e) => {
    e.preventDefault();
    const size = e.target.dataset.size ? e.target.dataset.size : e.target.value;
    setProductSize(size);

    const sizes =
      variations &&
      variations.filter((item) => item.color.name === productColor)[0].sizes;
    const stock = sizes.filter((item) => item.name === size)[0].stock;
    setProductStock(stock);
    const price = sizes.filter((item) => item.name === size)[0].price;
    setProductPrice(price);
    const itemcode = sizes.filter((item) => item.name === size)[0].itemCode;
    setProductCode(itemcode);
    setProductQuantity(1);
  };

  useEffect(() => {
    setProductColor(variations && variations[0]?.color?.name);
    setProductSize(variations && variations[0]?.sizes[0]?.name);
    setProductStock(
      variations ? variations[0]?.sizes[0]?.stock : product.stock
    );
    setProductPrice(
      variations ? variations[0]?.sizes[0]?.price : product.price
    );
    setProductCode(
      variations ? variations[0]?.sizes[0]?.itemCode : product.itemCode
    );
    setProductImage(
      variations ? variations[0]?.color?.thumbs : product.previewImages
    );
  }, []);

  const productQuantityIncrement = () =>
    setProductQuantity((prevState) =>
      prevState < productStock ? (prevState += 1) : prevState
    );
  const productQuantityDecrement = () =>
    setProductQuantity((prevState) => (prevState > 1 ? (prevState -= 1) : 1));

  return {
    productColor,
    productCode,
    productSize,
    productStock,
    productPrice,
    productImage,
    productColorHandler,
    productSizeHandler,
    productQuantity,
    setProductQuantity,
    productQuantityDecrement,
    productQuantityIncrement,
  };
};

export default useProduct;
