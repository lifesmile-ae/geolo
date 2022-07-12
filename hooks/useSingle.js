//This is hook to manage the variation of product that have single variation like color variation or size variationonly

import React, { useState, useEffect } from 'react';

const useProduct = (product) => {
  const { discount, variations, variationtype } = product;
  const [productColor, setProductColor] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productStock, setProductStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productCode, setProductCode] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productImage, setProductImage] = useState(0);
  useEffect(() => {
    variationtype == 'color' &&
      (setProductColor(variations && variations[0]?.color?.name),
      setProductStock(variations ? variations[0]?.color?.stock : product.stock),
      setProductPrice(variations ? variations[0]?.color?.price : product.price),
      setProductCode(
        variations ? variations[0]?.color?.itemCode : product.itemCode
      ),
      setProductImage(
        variations ? variations[0]?.color?.thumbs : product.previewImages
      ));

    variationtype === 'size' &&
      (setProductSize(variations && variations[0]?.sizes[0]?.name),
      setProductStock(
        variations ? variations[0]?.sizes[0]?.stock : product.stock
      ),
      setProductPrice(
        variations ? variations[0]?.sizes[0]?.price : product.price
      ),
      setProductCode(
        variations ? variations[0]?.sizes[0]?.itemCode : product.itemCode
      ),
      setProductImage(product.previewImages));
  }, []);

  const productColorHandler = (e) => {
    const colorname = e.target.dataset.colorname
      ? e.target.dataset.colorname
      : e.target.value;
    setProductColor(colorname);
    const thumbs =
      variations &&
      variations.filter((item) => item.color.name === colorname)[0].color
        .thumbs;

    const price =
      variations &&
      variations.filter((item) => item.color.name === colorname)[0].color.price;

    const stock =
      variations &&
      variations.filter((item) => item.color.name === colorname)[0].color.stock;

    const itemcode =
      variations &&
      variations.filter((item) => item.color.name === colorname)[0].color
        .itemCode;

    setProductPrice(price);
    setProductStock(stock);
    setProductCode(itemcode);
    setProductImage(thumbs);
    setProductQuantity(1);
  };

  const productSizeHandler = (e) => {
    e.preventDefault();
    const size = e.target.dataset.size ? e.target.dataset.size : e.target.value;
    setProductSize(size);
    const sizes = variations[0].sizes;
    const stock = sizes.filter((item) => item.name === size)[0].stock;
    setProductStock(stock);
    const price = sizes.filter((item) => item.name === size)[0].price;
    setProductPrice(price);
    const itemcode = sizes.filter((item) => item.name === size)[0].itemCode;
    setProductCode(itemcode);
    setProductQuantity(1);
  };

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
