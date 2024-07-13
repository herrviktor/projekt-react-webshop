import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './product-context';
import './product-grid.css';

const ProductGrid = () => {
  const { products }  = useContext(ProductContext);

  return (
    <div className="grid-products main-flex">
      {products.map((product) => (
        <Link key={product.id} to={`/product-view/${product.id}`} className="grid-link">
          <div className="grid-item">
            <img src={product.thumbnail} alt={product.title} className="grid-image" />
            <h2 className="grid-title text-color">{product.title}</h2>
            <p className="grid-price text-color">Price: {product.price} kr</p>
            <span className="grid-view">View Product</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;