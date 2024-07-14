import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();
 
// Denna funktion skapar en kontext-provider för produkter och kundvagn
function ProductProvider (props) {
    
    // Initialiserar state för produkter
    let[products, setProducts] = useState([]);

    // Hämtar produkter från en extern API när komponenten monteras och sätts in i variabeln products
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


    // Initialiserar kundvagnen från localStorage eller som ett tomt objekt
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    // Filtrerar produkter som finns i kundvagnen
    const cartProducts = products.filter((product) => cart[product.id] > 0);

    // Beräknar totalsumman för kundvagnen
    function cartSum(cartProducts) {
        
        const cartSumTotal = cartProducts.reduce((sum, product) => {
            const reaOrFullPrice = product.category === 'tablets' ? (product.price * cart[product.id] / 2) : product.price * cart[product.id];;
            return sum + reaOrFullPrice;
        }, 0);
        
        return cartSumTotal.toFixed(2);
    }

    // Beräknar fraktkostnad och totalkostnad
    const shippingCost = Number(cartSum(cartProducts)) > 0 ? 19.99 : 0;
    const totalCost = shippingCost + Number(cartSum(cartProducts));

    // Sparar kundvagn och produkter i localStorage när de ändras
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }, [cart, cartProducts]);
    

    // Funktion för att lägga till en produkt i kundvagnen
    function addToCart(itemId) {
        setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }

    // Funktion för att ta bort en produkt från kundvagnen
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

    // Funktion för att ta bort alla av en specifik produkt från kundvagnen
    function deleteFromCart(itemId) {
        setCart((prev) => {
            let updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
        });
    }

    // Funktion för att tömma hela kundvagnen
    function deleteCart() {
        setCart({}) ;
    }

    // Funktion för att lägga till en specifik kvantitet av en produkt i kundvagnen
    function addQuantity(itemId, quantity) {
      setCart((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + quantity,
      }));
    }

    // Skapar ett objekt med alla värden och funktioner som ska delas via kontexten
    let contextValue = {products, cart, addToCart, removeFromCart, deleteFromCart, deleteCart, cartSum, cartProducts, totalCost, shippingCost, addQuantity};

    // Returnerar Provider-komponenten med alla barn och kontextvärdet
    return <ProductContext.Provider value={contextValue}>{props.children}</ProductContext.Provider>;
};

// Exporterar Provider och Context för användning i andra komponenter
export { ProductProvider, ProductContext };