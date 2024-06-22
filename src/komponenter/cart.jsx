import { useContext } from 'react';
import { ProductContext } from './product-context';
import { Link } from 'react-router-dom';
import './cart.css';
const Cart = () => {
    const { cart, removeFromCart, addToCart, deleteFromCart, cartProducts, cartSum, totalCost, shippingCost, deleteCart} = useContext(ProductContext);


return (
    <div className="div-cart">
      <h2>Cart</h2>
      <ul>
      {cartProducts.map((product) => (
            <li key={product.id} product={product} quantity={cart[product.id]}>
              <img width="20" height="20" src={product.thumbnail} alt='product' /> - 
              Item: {product.title} - Price: {product.price} - Qty: {cart[product.id]} 
              - Sum: {(product.price*cart[product.id]).toFixed(2)} kr
              <button onClick={() => removeFromCart(product.id)}> - </button>
              <button onClick={() => addToCart(product.id)}
                disabled={product.stock < 1 || cart[product.id] >= product.stock}> + 
              </button>
              <button onClick={() => deleteFromCart(product.id)}> & </button>
            </li>
      ))}
            <li>
                Order cost: {cartSum(cartProducts)} kr
            </li>
            <li>
                Shipping cost: {shippingCost} kr
            </li>
            <li>
                Total cost: {totalCost} kr
            </li>
      </ul>
            <Link to="/checkout"><button className='cart-button'>Go to checkout</button></Link>
            <Link to="/projekt-react-webshop"><button className='cart-button'>Continue shopping</button></Link>
            <button onClick={() => deleteCart()}>Delete everything</button>
        </div>
    );
};

export default Cart;