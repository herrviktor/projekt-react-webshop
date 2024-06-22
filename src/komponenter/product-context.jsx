import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();
 function ProductProvider (props) {
    

    let[products, setProducts] = useState([]);

    
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch('https://dummyjson.com/products/category/mens-shirts');
            const data = await response.json();
            setProducts(data.products);
            console.log(data.products);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProducts();
      }, []);



    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const cartProducts = products.filter((product) => cart[product.id] > 0);

    function cartSum(cartProducts) {
        
        const cartSumTotal = cartProducts.reduce((sum, product) => {
            const reaOrFullPrice = product.category === 'tablets' ? (product.price * cart[product.id] / 2) : product.price * cart[product.id];;
            return sum + reaOrFullPrice;
        }, 0);
        
        return cartSumTotal.toFixed(2);
    }

    const shippingCost = Number(cartSum(cartProducts)) > 0 ? 19.99 : 0;
    const totalCost = shippingCost + Number(cartSum(cartProducts));


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }, [cart, cartProducts]);
    

    function addToCart(itemId) {
        setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }

    function removeFromCart(itemId) {
        setCart((prev) => {
            if (prev[itemId] > 1) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                let updatedCart = { ...prev };
                delete updatedCart[itemId];
                return updatedCart;
            }
        });
    }

    function deleteFromCart(itemId) {
        setCart((prev) => {
            let updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
        });
    }

    function deleteCart() {
        setCart({}) ;
    }

    function addQuantity(itemId, quantity) {
      setCart((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + quantity,
      }));
    }

    let contextValue = {products, cart, addToCart, removeFromCart, deleteFromCart, deleteCart, cartSum, cartProducts, totalCost, shippingCost, addQuantity};

    return <ProductContext.Provider value={contextValue}>{props.children}</ProductContext.Provider>;
};

export { ProductProvider, ProductContext };