import React, { useState, useEffect } from 'react';
import ProductView from './product-grid';


function ShoppingList() {
  const [shoppingData, setShoppingData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('shoppingData')) || [];
    setShoppingData(storedData);
  }, []);

  const handleAddToCart = (title, price) => {
    const updatedData = [...shoppingData, { title, price }];
    setShoppingData(updatedData);
    localStorage.setItem('shoppingData', JSON.stringify(updatedData));
  };

  const totalSum = shoppingData.reduce((sum, item) => sum + parseFloat(item.price.replace(/\D/g, '')), 0);

  return (
    <div>
      <ul id="shopping-list">
        {shoppingData.map((item, index) => (
          <li key={index}>
            {item.title} - {parseFloat(item.price.replace(/\D/g, ''))} kr
          </li>
        ))}
      </ul>
      <div id="shopping-total">
        Totalbelopp: {totalSum} kr
      </div>
      <div className="product-container">
        <ProductView onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}

export default ShoppingList;
        
        
        
        
        //{/* Render your product list here */}
        //{/* Each product should have a button with an onClick handler that calls handleAddToCart */}