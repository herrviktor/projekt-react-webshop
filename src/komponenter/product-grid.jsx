import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './product-context';
import './product-grid.css';

const ProductGrid = () => {

  // Hämtar produktdata från ProductContext
  const { products }  = useContext(ProductContext);

  return (
    <div className="grid-products main-flex">
      {/* Loopar igenom alla produkter och skapar en länk för varje produkt till en detaljerad produktvy */}
      {products.map((product) => (
        <Link key={product.id} to={`/product-view/${product.id}`} className="grid-link">
          <div className="grid-item">
            <img src={product.thumbnail} alt={product.title} className="grid-image" />
            <h2 className="grid-title main-text-color">{product.title}</h2>
            <p className="grid-price main-text-color">Price: {product.price} kr</p>
            <span className="grid-view main-text-color">View Product</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;