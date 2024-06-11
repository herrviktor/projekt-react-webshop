import { useContext } from 'react';
import { ProductContext } from './product-context';
import ProductView from './product-view';
import { Link } from 'react-router-dom';
import './cart.css';
const Cart = () => {
    const { products } = useContext(ProductContext);

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

    return (
        <div className="div-cart">
            <h2>Cart</h2>
            <ul>
                {products.map((item) => (
                    <li key={item.id}>
                        <ProductView product={item} onAddToCart={handleAddToCart} />
                        <img src={item.thumbnail} alt={item.title} />
                        <span>{item.title}</span>
                        <span>Price: {item.price}</span>
                        <span>Quantity: {item.quantity}</span>
                        <button>Remove</button>
                        <button>Add</button>
                    </li>
                ))}
            </ul>
            <Link to="/checkout"><button className='cart-button'>Go to checkout</button></Link>
            <Link><button className='cart-button'>Clear cart</button></Link>
            <Link to="/projekt-react-webshop"><button className='cart-button'>Continue shopping</button></Link>
        </div>
    );
};

export default Cart;