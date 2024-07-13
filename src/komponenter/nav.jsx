import './nav.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ProductContext } from './product-context';
import { ThemeContext } from './themes';

const Nav = () => {

    const { totalCost, cart } = useContext(ProductContext);
    const { changeTheme } = useContext(ThemeContext);


    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

    const handleThemeChange = (newTheme1, newTheme2) => {
      const root = document.documentElement;
      root.style.setProperty('--priColor', newTheme1);
      root.style.setProperty('--secColor', newTheme2);
      changeTheme(newTheme1, newTheme2);
  };

    return (
        <nav className="top-nav">
            <div className='nav-right'>
                <Link to="/projekt-react-webshop" className='nav-home link'>
                    <div className="top-link text-color">Home</div>
                </Link>
                <div className='nav-splitter'>
                    <span className='nav-color'>Color Theme: </span>
                    <select className="nav-select" onChange={(e) => {
                        const [color1, color2] = e.target.value.split(',');
                        handleThemeChange(color1, color2);
                    }}>
                        <option value="#851, #eee" style={{ backgroundColor: '#851' }}>Brown poo</option>
                        <option value="#518, #eee" style={{ backgroundColor: '#518' }}>Purple Haze</option>
                        <option value="#111, #eee" style={{ backgroundColor: '#111' }}>Black Death</option>
                        <option value="#151, #eee" style={{ backgroundColor: '#151' }}>Green Lantern</option>
                        <option value="#c18, #eee" style={{ backgroundColor: '#c18' }}>Pink Barbie</option>
                    </select>
                </div>
            </div>
            <div className='nav-right'>
                <Link to="/cart" className='nav-cart link'>
                    <div className="checkout text-color">Cart:{totalCost.toFixed(2)} kr
                    &#x1F6D2;<svg className="logo-mini svg-cart" viewbox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9"/><text className="logo-text2 nav-svg-text" x="10" y="10" text-anchor="middle" dominantBaseline="central" style={{ fontSize: '15px' }}>{totalItems}</text></svg>
                    </div>
                </Link>
                <Link to="/checkout" className='nav-splitter link'>
                    <div class="top-link text-color">Checkout</div>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
