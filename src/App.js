import './App.css';
import Header from './komponenter/header.jsx';
import Nav from './komponenter/nav.jsx';
import Footer from './komponenter/footer.jsx';
import Main from './komponenter/main.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductGrid from './komponenter/product-grid.jsx';
import ProductView from './komponenter/product-view.jsx';
import { ProductProvider } from './komponenter/product-context.jsx'; // Import ProductProvider from './komponenter/product-context.jsx';
import Checkout from './komponenter/checkout.jsx';
import Cart from './komponenter/cart.jsx';
import Receipt from './komponenter/receipt.jsx';
import './komponenter/variables.css'
import { ThemeProvider } from './komponenter/themes.jsx';



function App() {
  return (
    <Router basename='projekt-react-webshop'>
        <div className="App-container">
            <ProductProvider><ThemeProvider>
                <Header />
                <Nav />
                <Main>
                  <Routes>
                    <Route path="/" element={<ProductGrid />} />
                    <Route path="/projekt-react-webshop" element={<ProductGrid />} />
                    <Route path="/product-view/:Id" element={<ProductView />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/receipt" element={<Receipt />} />
                  </Routes>
                </Main>
                <Footer />
            </ThemeProvider></ProductProvider>
        </div>
    </Router>
  );
}

export default App;
