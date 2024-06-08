import './App.css';
import Header from './komponenter/header.jsx';
import Container from './komponenter/container.jsx';
import './komponenter/app-container.css';
import Nav from './komponenter/nav.jsx';
import Footer from './komponenter/footer.jsx';
import Main from './komponenter/main.jsx';
import CheckoutProducts from './komponenter/checkout-products.jsx';
import CheckoutForm from './komponenter/checkout-form.jsx';

function App() {
  return (
    <div className="App-container">
      <Container>
        <Header />
        <Nav />
        <Main>
          <CheckoutProducts />
          <CheckoutForm />
        </Main>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
