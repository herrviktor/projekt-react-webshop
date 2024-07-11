import './checkout.css';
import { useContext } from 'react';
import { ProductContext } from './product-context';
import { Link } from 'react-router-dom';


const Checkout = () => {

    const {addToCart, removeFromCart, deleteFromCart, cart, cartProducts, cartSum, shippingCost, totalCost, deleteCart} = useContext(ProductContext);

    return (
        <>
          <section className='main-flex checkout'>
              <h2 className='text-color checkout-header'>Checkout</h2>
                 {cartProducts.length === 0 ?
                 <>
                    <p className='text-color'>Your Cart is empty</p>
                    <Link to='/projekt-react-webshop' className=''><button className="main-button">Back to shopping!</button></Link>
                 </> :
                 <div>
                    <section className="checkout-products checkout-section main-div">
                        <h3 className='text-color' id="shopping-title text-color">You are ordering the following:</h3>
                        <table className="cart-table">
                        {cartProducts.map((product) => (
                            <tr key={product.id} product={product} quantity={cart[product.id]} className="cart-product">
                            <td><img width="20" height="20" src={product.thumbnail} alt='product' /></td>
                            <td className='text-color'>{product.title}</td><td className='text-color'>Price: {product.price}</td><td className='text-color'>Qty: {cart[product.id]}</td>
                            <td className='text-color'>Sum: {(product.price*cart[product.id]).toFixed(2)} kr</td> 
                            <td><button onClick={() => removeFromCart(product.id)} className="cart-button cart-left"> - </button>
                            <button onClick={() => addToCart(product.id)} className="cart-button"
                                disabled={product.stock < 1 || cart[product.id] >= product.stock}> + 
                            </button>
                            <button onClick={() => deleteFromCart(product.id)} className="cart-button"> & </button></td>
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
                        <Link to="/projekt-react-webshop"><button className='cart-button main-button'>Continue shopping</button></Link>
                        <button onClick={() => deleteCart()} className='cart-button main-button'>Delete everything</button>
                    </section>
                    <section class="payment checkout-section">
                        <h3 className='text-color'>För beställning var vänlig fyll i dina uppgifter nedan:</h3>
                        <form id="checkout-form">
                            <div>
                                <label for="fname">Förnamn:</label>
                                <input class="input" type="text" id="fname" name="fname" placeholder="Förnamn" pattern="[a-zA-Z]+" />
                            </div>
                            <div>
                                <label for="lname">Efternamn:</label>
                                <input class="input" type="text" id="lname" name="lname" placeholder="Efternamn" pattern="[a-zA-Z]+" />
                            </div>
                            <div>
                                <label for="address">Adress:</label>
                                <input type="address" id="address" name="address" placeholder="Adress" pattern="[a-zA-ZåäöÅÄÖ]+\s\d{1,3}" />
                            </div>
                            <div>
                                <label for="city">Stad:</label>
                                <input type="text" id="city" name="city" placeholder="Stad" pattern="[a-zA-Z]+" />
                            </div>
                            <div>
                                <label for="zip">Postnummer:</label>
                                <input type="zip" id="zip" name="zip" placeholder="12345" pattern="\d{5}(?:[-\s]\d{4})?" />
                            </div>
                            <div>
                                <label for="country">Land:</label>
                                <select id="country" name="country">
                                    <option value="sweden">Sverige</option>
                                    <option value="norway">Norge</option>
                                    <option value="denmark">Danmark</option>
                                    <option value="finland">Finland</option>
                                </select>
                            </div>
                            <div>
                                <label for="phone">Telefonnummer:</label>
                                <input type="tel" id="phone" name="phone" placeholder="073-007 007 08" pattern="\d{3}-\d{3} \d{2} \d{2}" />
                            </div>
                            <div>
                                <label for="EMail">E-post:</label>
                                <input type="email" id="EMail" name="EMail" placeholder="E-post" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" />
                            </div>
                        </form>
                        <div>
                            <Link to='/cart'><button className='main-button checkout-button'>Back to cart</button></Link ><Link to='/receipt'><button onClick={() => deleteCart()} className='main-button checkout-button'>Beställ</button></Link >
                        </div>
                    </section>
                </div>
}           </section>
        </>
    )
}

export default Checkout;