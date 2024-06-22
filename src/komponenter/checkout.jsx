import './checkout.css';
import { useContext } from 'react';
import { ProductContext } from './product-context';
import { Link } from 'react-router-dom';


const Checkout = () => {

    const {addToCart, removeFromCart, deleteFromCart, cart, cartProducts, cartSum, shippingCost, totalCost} = useContext(ProductContext);

    return (
        <>
          <section>
              <h2>Checkout</h2>
                 {cartProducts.length === 0 ?
                 <p>Your Cart is empty</p> :
                 <div>
                    <section className="checkout-products checkout-section">
                        <h3 id="shopping-title">You are ordering the following:</h3>
                        <ul id="shopping-list">
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
                    </section>
                    <section class="payment checkout-section">
                        <h3>För beställning var vänlig fyll i dina uppgifter nedan:</h3>
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
                            <Link to='/cart'><button>Back to cart</button></Link ><Link to='/receipt'><button>Beställ</button></Link >
                        </div>
                    </section>
                </div>
}           </section>
        </>
    )
}

export default Checkout;