import React, { useContext, useState } from 'react';
import { ProductContext } from '../komponenter/product-context';
import { useParams } from 'react-router-dom';
import CartWindow from './cart';
import Nav from './nav';

const ProductView = () => {
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const product = products.find((p) => p.id === parseInt(id, 10));

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const cartItem = { ...product, quantity };
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    setShowCart(true);
  };

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
          <button onClick={handleAddToCart}>Add to cart</button>
        </>
      ) : (
        <p>Product not found</p>
      )}
      {showCart && <CartWindow cartItems={cartItems} onClose={() => setShowCart(false)} />}
      <Nav cartItems={cartItems} setShowCart={setShowCart} />
    </div>
  );
};

export default ProductView;