import './checkout.css';
import { useContext, useState } from 'react';
import { ProductContext } from './product-context';
import { Link, useNavigate } from 'react-router-dom';


const Checkout = () => {

    const {addToCart, removeFromCart, deleteFromCart, cart, cartProducts, cartSum, shippingCost, totalCost, deleteCart} = useContext(ProductContext);

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        email: '',
        // Add other form fields here
      });
    
    const [errors, setErrors] = useState({});

    const validateForm = (name, value) => {
        let newErrors = { ...errors };
        const nameRegex = /^[a-zA-Z]{2,}$/;
    
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
        if (name === 'email' || name === undefined) {
            const emailValue = name ? value : formData.email;
            if (!emailValue || !emailRegex.test(emailValue)) {
                newErrors.email = 'Please enter a valid email address';
            } else {
                delete newErrors.email;
            }
        }

        // Add validation for other fields here if needed

        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    validateForm(name, value);
};

const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Form is valid, proceed with order placement
        console.log('Form is valid, placing order...');
        deleteCart();
        navigate('/receipt');
    } else {
        console.log('Form has errors, please correct them.');
    }
};

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
                        <Link to='/cart'><button className='main-button checkout-button'>Back to cart</button></Link>
                        <Link to="/projekt-react-webshop"><button className='cart-button main-button'>Continue shopping</button></Link>
                        <button onClick={() => deleteCart()} className='cart-button main-button'>Delete everything</button>
                    </section>
                    <section class="payment checkout-section">
                        <h3 className='text-color'>To place an order, please fill in your details below:</h3>
                        <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-color" for="fname">Firstname:</label>
                                <input 
                                    className="checkout-input text-color" 
                                    type="text" id="fname" name="fname" 
                                    placeholder="Firstname" 
                                    value={formData.fname} 
                                    onChange={handleInputChange}
                                />
                                {errors.fname && <span className="error">{errors.fname}</span>}
                            </div>
                            <div>
                                <label className="text-color" for="lname">Lastname:</label>
                                <input 
                                    className="checkout-input text-color" 
                                    type="text" 
                                    id="lname" 
                                    name="lname" 
                                    placeholder="Lastname" 
                                    value={formData.lname} 
                                    onChange={handleInputChange}
                                />
                                {errors.lname && <span className="error">{errors.lname}</span>}
                            </div>
                            <div>
                                <label className="text-color" for="address">Address:</label>
                                <input 
                                    className="checkout-input text-color" 
                                    type="address" 
                                    id="address" 
                                    name="address" 
                                    placeholder="Address" 
                                    value={formData.address}
                                    onChange={handleInputChange} 
                                />
                                {errors.address && <span className="error">{errors.address}</span>}
                            </div>
                            <div>
                                <label className="text-color" for="city">City:</label>
                                <input 
                                    className="checkout-input text-color" 
                                    type="text" 
                                    id="city" 
                                    name="city" 
                                    placeholder="City"
                                    value={formData.city} 
                                    onChange={handleInputChange}
                                />
                                {errors.city && <span className="error">{errors.city}</span>}
                            </div>
                            <div>
                                <label className="text-color" for="zip">Zipcode:</label>
                                <input 
                                    className="checkout-input text-color" 
                                    type="zip" 
                                    id="zip" 
                                    name="zip" 
                                    placeholder="12345" 
                                    value={formData.zip} onChange={handleInputChange}
                                />
                                {errors.zip && <span className="error">{errors.zip}</span>}
                            </div>
                            <div>
                                <label className="text-color" for="country">Country:</label>
                                <select className="checkout-input text-color" id="country" name="country">
                                    <option value="sweden">Sweden</option>
                                    <option value="norway">Bangladesh</option>
                                    <option value="denmark">Singapore</option>
                                    <option value="finland">Bolivia</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-color" for="phone">Phonenumber:</label>
                                <input 
                                    className="checkout-input text-color" 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    placeholder="073-007 007 08" 
                                    value={formData.phone} onChange={handleInputChange}
                                />
                                {errors.phone && <span className="error">{errors.phone}</span>}
                            </div>
                            <div>
                                <label className="text-color" for="email">E-mail:</label>
                                <input 
                                    className="checkout-input text-color" 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="E-mail" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <div>
                                <button type="submit" className='main-button checkout-button'>Place order</button>
                            </div>
                        </form>
                    </section>
                </div>
}           </section>
        </>
    )
}

export default Checkout;