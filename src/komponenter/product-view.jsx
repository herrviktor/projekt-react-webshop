import React, { useContext } from 'react';
import { ProductContext } from './product-context';
import { useParams, Link } from 'react-router-dom';
import './product-view.css';


const ProductView = () => {
  const { products, addToCart, cart, totalCost } = useContext(ProductContext);
  const { Id } = useParams();

  //p.id === parseInt(id, 10));p.id === parseInt(id, 10));
  const product = products.find((p) => {
    return p.id === parseInt(Id, 10);
  });
  
  return (
    <div className="product-view main-flex">
      {product ? (
        <>
          <img src={product.thumbnail} alt={product.title} className='view-image'/>
          <h1 className="view-title text-color">{product.title}</h1>
          <p className="view-description text-color">{product.description}</p>
          <p className="view-price text-color">Price: {product.price} kr</p>
          <button onClick={() => addToCart(product.id)} className='main-button' disabled={product.stock < 1 || cart[product.id] >= product.stock}>Add to cart</button>
          <Link to='/Cart' className=''><button className="main-button">View cart: {totalCost.toFixed(2)} kr</button></Link>
          <Link to='/projekt-react-webshop' className=''><button className="main-button">Back to shopping!</button></Link>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductView;