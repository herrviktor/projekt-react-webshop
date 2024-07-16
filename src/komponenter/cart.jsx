// Importerar nödvändiga komponenter och funktioner från React och andra moduler
import { useContext } from 'react';
import { ProductContext } from './product-context';
import { Link } from 'react-router-dom';
import './cart.css';

// Definierar Cart-komponenten
const Cart = () => {
    
  // Hämtar relevanta värden och funktioner från ProductContext med hjälp av useContext-hooken
  const { cart, removeFromCart, addToCart, deleteFromCart, cartProducts, cartSum, totalCost, shippingCost, deleteCart} = useContext(ProductContext);

// Returnerar JSX för att rendera kundvagnen
return (
    <div className="main-cart-div">
      <h2 className="main-cart-header main-text-color">Cart</h2>
      <table className="main-cart-table">
       {/* Mappar över produkterna i kundvagnen och renderar en rad för varje produkt */}
      {cartProducts.map((product) => (
            <tr key={product.id} product={product} quantity={cart[product.id]} className="main-cart-product">
              <td><img width="20" height="20" src={product.thumbnail} alt='product' /></td>
              <td className='main-text-color'>{product.title}</td>
              <td className='main-text-color'>Price: {product.price} kr</td>
              <td className='main-text-color'>Qty: {cart[product.id]}</td>
              <td className='main-text-color'>Sum: {(product.price*cart[product.id]).toFixed(2)} kr</td> 
              <td className='main-cart-change'>
                {/* Knappar för att lägga till, ta bort eller radera produkter från kundvagnen */}
                <button onClick={() => addToCart(product.id)} className="main-cart-button cart-button"
                  disabled={product.stock < 1 || cart[product.id] >= product.stock}> + 
                </button>
                <button onClick={() => removeFromCart(product.id)} className="main-cart-button main-cart-left cart-button"> - </button>
                <button onClick={() => deleteFromCart(product.id)} className="main-cart-button cart-button"> &#128465; </button></td>
            </tr>
      ))}
             {/* Rad som visar orderkostnad, fraktkostnad och total kostnad */}
            <tr className="main-cart-product">
              <td colSpan="2" className='main-text-color'>
                  Order cost: {cartSum(cartProducts)} kr
              </td>
              <td colSpan="3" className='main-text-color'>
                  Shipping cost: {shippingCost} kr
              </td>
              <td colSpan="3" className='main-text-color'>
                  Total cost: {totalCost.toFixed(2)} kr
              </td>
            </tr>
      </table>
      {/* Knappar för att gå till kassan, fortsätta handla eller tömma kundvagnen */}
      <Link to="/checkout"><button className='main-cart-button main-button'>Go to checkout</button></Link>
      <Link to="/projekt-react-webshop"><button className='main-cart-button main-button'>Continue shopping</button></Link>
      <button onClick={() => deleteCart()} className='main-cart-button main-button'>Delete everything</button>
    </div>
    );
};

export default Cart;