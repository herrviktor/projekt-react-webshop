import './nav.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ProductContext } from './product-context';

const Nav = () => {

    const { totalCost } = useContext(ProductContext);

    return (
        <nav className="top-nav">
            <Link to="/projekt-react-webshop" className='link'>
                <div className="top-link">Home</div>
            </Link>
            <Link to="/cart" className='link'>
                <div className="checkout">Cart:{totalCost.toFixed(2)} kr<button className="cart">
                    &#x1F6D2;<svg className="logo-mini svg-cart" viewbox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9"/><text className="logo-text2" x="6" y="15" style={{ fontSize: '15px' }}>0</text></svg></button>
                </div>
            </Link>
            <Link to="/checkout" className='link'>
                <div class="top-link">Checkout</div>
            </Link>
        </nav>
    )
}

export default Nav
