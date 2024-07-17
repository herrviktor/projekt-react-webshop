import React, { useContext } from 'react';
import { ProductContext } from './product-context';
import { useParams, Link } from 'react-router-dom';
import './product-view.css';


const ProductView = () => {
  const { products, addToCart, cart, totalCost } = useContext(ProductContext);
  
  // Hämtar produkt-ID från URL-parametrar
  const { Id } = useParams();

  // Hittar den specifika produkten baserat på ID:t från URL:en
  const product = products.find((p) => {
    return p.id === parseInt(Id, 10);
  });
  
  return (
    <div className="view-product main-flex">
      {product ? (
        // Om produkten hittas, visa detaljerad information
        <>
          <img src={product.thumbnail} alt={product.title} className='view-image'/>
          <h1 className="main-text-color">{product.title}</h1>
          <p className="main-text-color">{product.description}</p>
          <p className="main-text-color">Price: {product.price} kr</p>
          {/* Knapp för att lägga till produkt i kundvagnen, inaktiveras om produkten är slut i lager */}
          <button onClick={() => addToCart(product.id)} className='main-button view-button' 
            disabled={product.stock < 1 || cart[product.id] >= product.stock}>Add to cart
          </button>
          {/* Länk till kundvagnen med den totala kostnaden i 2 decimaler */}
          <Link to='/Cart' className=''>
            <button className="main-button view-button">View cart: {totalCost.toFixed(2)} kr</button>
          </Link>
          {/* Länk tillbaka till huvudsidan */}
          <Link to='/projekt-react-webshop' className=''>
            <button className="main-button view-button">Back to shopping!</button>
          </Link>
        </>
      ) : (
        // Om produkten inte hittas, visas felmeddelandet nedan
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductView;