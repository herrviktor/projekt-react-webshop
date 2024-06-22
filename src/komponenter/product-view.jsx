import React, { useContext } from 'react';
import { ProductContext } from './product-context';
import { useParams, Link } from 'react-router-dom';
import './product-view.css';


const ProductView = () => {
  const { products, addToCart, cart } = useContext(ProductContext);
  const { Id } = useParams();

  //p.id === parseInt(id, 10));p.id === parseInt(id, 10));
  const product = products.find((p) => {
    return p.id === parseInt(Id, 10);
  });
  
  return (
    <div className="product-view">
      {product ? (
        <>
          <img src={product.thumbnail} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value=""
            onChange=""
          />
          <button onClick={() => addToCart(product.id)} className={``} disabled={product.stock < 1 || cart[product.id] >= product.stock}>Add to cart</button>
          <Link to='/projekt-react-webshop' className=''><button className="">Back to shopping!</button></Link>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductView;