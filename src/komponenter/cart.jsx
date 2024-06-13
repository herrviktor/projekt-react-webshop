import { useContext } from 'react';
import { ProductContext } from './product-context';
import { Link } from 'react-router-dom';
import './cart.css';
const Cart = () => {
    const { products, cart, removeFromCart } = useContext(ProductContext);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };


return (
    <div className="div-cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((productId) => {
          const product = products.find((p) => p.id === productId);
          return (
            <li key={productId}>
              {product ? `${product.id} - $${product.price}` : `Product not found (${productId})`}
              <button onClick={handleRemoveFromCart}>Remove</button>
            </li>
          );
        })}
      </ul>
            <Link to="/checkout"><button className='cart-button'>Go to checkout</button></Link>
            <Link><button className='cart-button'>Clear cart</button></Link>
            <Link to="/projekt-react-webshop"><button className='cart-button'>Continue shopping</button></Link>
        </div>
    );
};

export default Cart;

/*
/*const handleAddToCart = (product) => {
        addToCart(product);
      };

    const handleAddToCart = (product, quantity) => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
            // If the product already exists, update the quantity
            cartItems[existingProductIndex].quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            cartItems.push({ ...product, quantity });
        }

        // Update the cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

{products.map((item) => (
                    <li key={item.id}>
                        <img src={item.thumbnail} alt={item.title} />
                        <span>{item.title}</span>
                        <span>Price: {item.price}</span>
                        <span>Quantity: {item.quantity}</span>
                        <button>Remove</button>
                        <button>Add</button>
                    </li>
<ProductView product={item} onAddToCart={handleAddToCart} />*
*/