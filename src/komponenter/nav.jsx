import './nav.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ProductContext } from './product-context';
import { ThemeContext } from './themes';

const Nav = () => {

    const { totalCost, cart } = useContext(ProductContext);
    
    // hämtar funktionen changeTheme från färgtemakontextet
    const { changeTheme } = useContext(ThemeContext);

    // Lägger ihop alla produkter och summerar dem till ett tal
    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

    // Ändrar färgtemat på sidan
    const handleThemeChange = (newTheme) => {
        const root = document.documentElement;
        root.style.setProperty('--priColor', newTheme);
        changeTheme(newTheme);
      };

    return (
        <nav className="nav">
            <div className='nav-containers'>
                {/* Användaren återgår till startsidan när home klickas */}
                <Link to="/projekt-react-webshop" className='nav-order-home nav-home nav-link nav-splitter'>
                    <div className="nav-size nav-button main-text-color nav-splitter">Home</div>
                </Link>
                <div>
                    <span className='nav-size nav-color'>Color Theme: </span>
                    <select className="nav-size nav-select" onChange={(e) => handleThemeChange(e.target.value)}>
                        <option value="#851" style={{ backgroundColor: '#851' }}>Brown poo</option>
                        <option value="#518" style={{ backgroundColor: '#518' }}>Purple Haze</option>
                        <option value="#111" style={{ backgroundColor: '#111' }}>Black Death</option>
                        <option value="#151" style={{ backgroundColor: '#151' }}>Green Lantern</option>
                        <option value="#c18" style={{ backgroundColor: '#c18' }}>Pink Barbie</option>
                    </select>
                </div>
            </div>
            <div className='nav-containers'>
                <Link to="/cart" className='nav-cart nav-link'>
                    {/* Skriver ut alla produkternas kostnad i kundvagnen med 2 decimaler */}
                    <div className="nav-size main-text-color nav-splitter">Cart:{totalCost.toFixed(2)} kr
                    &#x1F6D2;<svg className="nav-logo-mini nav-svg" width="1.5rem" height="1.75rem" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="0.625rem" cy="0.625rem" r="0.5625rem" className='cart-circle'/><text className="nav-svg-text"  x="0.625rem" y="0.625rem" text-anchor="middle" dominantBaseline="central" style={{ fontSize: '0.9375rem' }}>{totalItems}</text></svg>
                    </div>
                </Link>
                <Link to="/checkout" className='nav-order-checkout nav-splitter nav-link'>
                    <div class="nav-size nav-button main-text-color">Checkout</div>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
