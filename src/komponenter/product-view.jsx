import React, { useContext } from 'react';
import { ProductContext } from '../komponenter/product-context';
import { useParams } from 'react-router-dom';

const ProductView = () => {
  const { products } = useContext(ProductContext);
  const { id } = useParams();

  //p.id === parseInt(id, 10));p.id === parseInt(id, 10));
  const product = products.find((p) => {
    console.log(p.id, parseInt(id, 10));
    return p.id === parseInt(id, 10);
  });

  return (
    <div className="product-view">
      {product ? (
        <>
          <img src={product.thumbnail} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductView;