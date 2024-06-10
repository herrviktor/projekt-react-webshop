import React, { useContext, useState } from 'react';
import { ProductContext } from '../komponenter/product-context';
import { useParams } from 'react-router-dom';


const ProductView = () => {
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);

  //p.id === parseInt(id, 10));p.id === parseInt(id, 10));
  const product = products.find((p) => {
    return p.id === parseInt(id, 10);
  });

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0) {
      setQuantity(value);
    }
  };

  /*const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
  };*/



  return (
    <div className="product-view">
      {product ? (
        <>
          <img src={product.thumbnail} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {quantity}</p>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button>Add to cart</button>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductView;
export const handleAddToCart = ProductView.handleAddToCart;