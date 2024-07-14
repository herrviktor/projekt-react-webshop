import './checkout.css';
import { useContext, useState } from 'react';
import { ProductContext } from './product-context';
import { Link, useNavigate } from 'react-router-dom';


const Checkout = () => {

    const {addToCart, removeFromCart, deleteFromCart, cart, cartProducts, cartSum, shippingCost, totalCost, deleteCart} = useContext(ProductContext);

    
    // Skapar ett state för formulärdata
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        email: '',
      });
    
    // Skapar ett state för att hantera valideringsfel
    const [errors, setErrors] = useState({});

    
    // Funktion för att validera formulärfält
    const validateForm = (name, value) => {
        let newErrors = { ...errors };
        // Definierar regex för namnvalidering
        const nameRegex = /^[a-zA-Z]{2,}$/;
    
        
        // Validerar förnamn
        if (name === 'fname' || name === undefined) {
            const fnameValue = name ? value : formData.fname;
            if (!fnameValue || !nameRegex.test(fnameValue)) {
                newErrors.fname = 'Please enter a valid first name (letters only)';
            } else {
                delete newErrors.fname;
            }
        }

        if (name === 'lname' || name === undefined) {
            const lnameValue = name ? value : formData.lname;
            if (!lnameValue || !nameRegex.test(lnameValue)) {
                newErrors.lname = 'Please enter a valid first name (letters only)';
            } else {
                delete newErrors.lname;
            }
        }

        const addressRegex = /^[a-zA-Z]{5,}\s+\d+[a-zA-Z0-9\s,.'-]*$/;
        if (name === 'address' || name === undefined) {
            const addressValue = name ? value : formData.address;
            if (!addressValue || !addressRegex.test(addressValue)) {
                newErrors.address = 'Please enter a valid address';
            } else {
                delete newErrors.address;
            }
        }

        const cityRegex = /^[a-zA-Z]{2,}$/;
        if (name === 'city' || name === undefined) {
            const cityValue = name ? value : formData.city;
            if (!cityValue || !cityRegex.test(cityValue)) {
                newErrors.city = 'Please enter a valid city';
            } else {
                delete newErrors.city;
            }
        }

        const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
        if (name === 'zip' || name === undefined) {
            const zipValue = name ? value : formData.zip;
            if (!zipValue || !zipRegex.test(zipValue)) {
                newErrors.zip = 'Please enter a valid zip code';
            } else {
                delete newErrors.zip;
            } 
        }

        const phoneRegex = /^\d{3}-\d{3}\s\d{2}\s\d{2}$/;
        if (name === 'phone' || name === undefined) {
            const phoneValue = name ? value : formData.phone;
            if (!phoneValue || !phoneRegex.test(phoneValue)) {
                newErrors.phone = 'Please enter a valid phone number';
            } else {
                delete newErrors.phone;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Kontrollerar om det är e-postfältet som ska valideras
        if (name === 'email' || name === undefined) {
            // Hämtar e-postvärdet från antingen det specifika fältet eller hela formuläret
            const emailValue = name ? value : formData.email;
            if (!emailValue || !emailRegex.test(emailValue)) {
                newErrors.email = 'Please enter a valid email address';
            } else {
                delete newErrors.email;
            }
        }

        // Uppdaterar felmeddelanden och returnerar true om inga fel finns
        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

    
    // Funktion som hanterar ändringar i input-fält
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Uppdaterar formulärdata
        setFormData({
            ...formData,
            [name]: value,
        });
        // Validerar det ändrade fältet
        validateForm(name, value);
    };

    // Hämtar navigate-funktionen från React Router
    const navigate = useNavigate();

    
    // Funktion som hanterar formulärinlämning
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            deleteCart();
            navigate('/receipt');
        } else {
            console.log('Form has errors, please correct them.');
        }
    };

    return (
        <>
          <section className='checkout'>
              <h2 className='main-text-color checkout-header checkout-align'>Checkout</h2>
                 {cartProducts.length === 0 ?
                 <>
                    <p className='main-text-color checkout-align'>Your Cart is empty</p>
                    <Link to='/projekt-react-webshop' className=''>
                        <button className="main-button">Back to shopping!</button>
                    </Link>
                 </> :
                 <div>
                    <section className="checkout-section main-cart-div">
                        <h3 className='main-text-color main-cart-header'>You are ordering the following:</h3>
                        <table className="main-cart-table">
                        {cartProducts.map((product) => (
                            <tr key={product.id} product={product} quantity={cart[product.id]} className="main-cart-product">
                                <td><img width="20" height="20" src={product.thumbnail} alt='product' /></td>
                                <td className='main-text-color'>{product.title}</td>
                                <td className='main-text-color'>Price: {product.price}</td>
                                <td className='main-text-color'>Qty: {cart[product.id]}</td>
                                <td className='main-text-color'>Sum: {(product.price*cart[product.id]).toFixed(2)} kr</td> 
                                <td className='main-cart-change'>
                                    <button onClick={() => removeFromCart(product.id)} className="main-cart-button main-cart-left"> - </button>
                                    <button onClick={() => addToCart(product.id)} className="main-cart-button"
                                        disabled={product.stock < 1 || cart[product.id] >= product.stock}> + 
                                    </button>
                                    <button onClick={() => deleteFromCart(product.id)} className="main-cart-button"> &#128465; </button>
                                </td>
                            </tr>
                        ))}
                            <tr className="main-cart-product">
                            <td colSpan="2" className='main-text-color'>
                                {/* Skriver ut summan av alla produkter i kundvagnen */}
                                Order cost: {cartSum(cartProducts)} kr
                            </td>
                            <td colSpan="3" className='main-text-color'>
                                {/* hämtar priset för frakt i kundvagnen */}
                                Shipping cost: {shippingCost} kr
                            </td>
                            <td colSpan="3" className='main-text-color'>
                                {/* Skriver ut totalpriset i kundvagnen */}
                                Total cost: {totalCost.toFixed(2)} kr
                            </td>
                            </tr>
                        </table>
                        <Link to='/cart'>
                            <button className='main-cart-button main-button'>Back to cart</button>
                        </Link>
                        <Link to="/projekt-react-webshop">
                            <button className='main-cart-button main-button'>Continue shopping</button>
                        </Link>
                        {/* Skapar en knapp som tar bort alla produkter i kundvagnen */}
                        <button onClick={() => deleteCart()} className='main-cart-button main-button'>Delete everything</button>
                    </section>
                    <section class="checkout-section">
                        <h3 className='main-text-color'>To place an order, please fill in your details below:</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="main-text-color" for="fname">Firstname:</label>
                                <input 
                                    className="checkout-input main-text-color" 
                                    type="text" 
                                    id="fname" 
                                    name="fname" 
                                    placeholder="Firstname" 
                                    // anropar funktionen som hanterar Ändringar i input-fältet
                                    onChange={handleInputChange}
                                />

                                {errors.fname && <span className="checkout-error">{errors.fname}</span>}
                            </div>
                            <div>
                                <label className="main-text-color" for="lname">Lastname:</label>
                                <input 
                                    className="checkout-input main-text-color" 
                                    type="text" 
                                    id="lname" 
                                    name="lname" 
                                    placeholder="Lastname" 
                                    onChange={handleInputChange}
                                />
                                {errors.lname && <span className="checkout-error">{errors.lname}</span>}
                            </div>
                            <div>
                                <label className="main-text-color" for="address">Address:</label>
                                <input 
                                    className="checkout-input main-text-color" 
                                    type="address" 
                                    id="address" 
                                    name="address" 
                                    placeholder="Address" 
                                    onChange={handleInputChange} 
                                />
                                {errors.address && <span className="checkout-error">{errors.address}</span>}
                            </div>
                            <div>
                                <label className="main-text-color" for="city">City:</label>
                                <input 
                                    className="checkout-input main-text-color" 
                                    type="text" 
                                    id="city" 
                                    name="city" 
                                    placeholder="City"
                                    onChange={handleInputChange}
                                />
                                {errors.city && <span className="checkout-error">{errors.city}</span>}
                            </div>
                            <div>
                                <label className="main-text-color" for="zip">Zipcode:</label>
                                <input 
                                    className="checkout-input main-text-color" 
                                    type="zip" 
                                    id="zip" 
                                    name="zip" 
                                    placeholder="12345" 
                                    onChange={handleInputChange}
                                />
                                {errors.zip && <span className="checkout-error">{errors.zip}</span>}
                            </div>
                            <div>
                                <label className="main-text-color" for="country">Country:</label>
                                <select className="checkout-input main-text-color" id="country" name="country">
                                    <option value="sweden">Sweden</option>
                                    <option value="norway">Bangladesh</option>
                                    <option value="denmark">Singapore</option>
                                    <option value="finland">Bolivia</option>
                                </select>
                            </div>
                            <div>
                                <label className="main-text-color" for="phone">Phonenumber:</label>
                                <input 
                                    className="checkout-input main-text-color" 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    placeholder="073-007 007 08" 
                                    onChange={handleInputChange}
                                />
                                {errors.phone && <span className="checkout-error">{errors.phone}</span>}
                            </div>
                            <div>
                                <label className="main-text-color" for="email">E-mail:</label>
                                <input 
                                    className="checkout-input main-text-color" 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="E-mail" 
                                    onChange={handleInputChange} 
                                />
                                {errors.email && <span className="checkout-error">{errors.email}</span>}
                            </div>
                            <div>
                                <button type="submit" className='main-button'>Place order</button>
                            </div>
                        </form>
                    </section>
                </div>
}           </section>
        </>
    )
}

export default Checkout;