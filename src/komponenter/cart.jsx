import { useContext } from 'react';
import { ProductContext } from './product-context';
import ProductView from './product-view';
const Cart = () => {
    const { products } = useContext(ProductContext);

  const handleAddToCart = (product, quantity) => {
    // Logic to add the product to the cart
  };

    return (
        <div className="cart">
            <h2>Cart</h2>
            <ul>
                {products.map((item) => (
                    <li key={item.id}>
                        <ProductView product={item} onAddToCart={handleAddToCart} />
                        <img src={item.thumbnail} alt={item.title} />
                        <span>{item.title}</span>
                        <span>Price: {item.price}</span>
                        <span>Quantity: {item.quantity}</span>
                        <button>Remove</button>
                        <button>Add</button>
                    </li>
                ))}
            </ul>
            <button>Go to checkout</button>
            <button>Clear cart</button>
            <button>Continue shopping</button>
        </div>
    );
};

export default Cart;