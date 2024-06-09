import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../komponenter/product-context';
import './product-grid.css';

const ProductGrid = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link key={product.id} to={`/product-view/${product.id}`} className="product-item">
          <div className="product-site">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>Price: {product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;