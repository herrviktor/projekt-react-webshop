import { useContext } from 'react';
import { ProductContext } from './product-context';
import { Link } from 'react-router-dom';
import './cart.css';
const Cart = () => {
    const { cart, removeFromCart, addToCart, deleteFromCart, cartProducts, cartSum, totalCost, shippingCost, deleteCart} = useContext(ProductContext);


return (
    <div className="cart-div">
      <h2 className="cart-header">Cart</h2>
      <table className="cart-table">
      {cartProducts.map((product) => (
            <tr key={product.id} product={product} quantity={cart[product.id]} className="cart-product">
              <td><img width="20" height="20" src={product.thumbnail} alt='product' /></td>
              <td className='text-color'>{product.title}</td><td className='text-color'>Price: {product.price}</td><td className='text-color'>Qty: {cart[product.id]}</td>
              <td className='text-color'>Sum: {(product.price*cart[product.id]).toFixed(2)} kr</td> 
              <td className='cart-change'><button onClick={() => removeFromCart(product.id)} className="cart-button cart-left"> - </button>
              <button onClick={() => addToCart(product.id)} className="cart-button"
                disabled={product.stock < 1 || cart[product.id] >= product.stock}> + 
              </button>
              <button onClick={() => deleteFromCart(product.id)} className="cart-button"> &#128465; </button></td>
            </tr>
      ))}
            <tr className="cart-product">
            <td colSpan="2" className='text-color'>
                Order cost: {cartSum(cartProducts)} kr
            </td>
            <td colSpan="3" className='text-color'>
                Shipping cost: {shippingCost} kr
            </td>
            <td colSpan="3" className='text-color'>
                Total cost: {totalCost.toFixed(2)} kr
            </td>
            </tr>
      </table>
      <Link to="/checkout"><button className='cart-button main-button'>Go to checkout</button></Link>
      <Link to="/projekt-react-webshop"><button className='cart-button main-button'>Continue shopping</button></Link>
      <button onClick={() => deleteCart()} className='cart-button main-button'>Delete everything</button>
    </div>
    );
};

export default Cart;