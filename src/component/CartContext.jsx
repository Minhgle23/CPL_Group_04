import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [totalCartItem, setTotalCartItem] = useState(cart.length);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalCartItem = cart.reduce((acc, item) => acc + item.userQuantity, 0);
    const newTotalPrice = cart.reduce((acc, item) => {
      const totalProductPrice = item.price * item.userQuantity;
      const tax = totalProductPrice * 0.08;
      return acc + totalProductPrice + tax;
    }, 0);

    setTotalCartItem(newTotalCartItem);
    setTotalPrice(newTotalPrice.toFixed(2));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, userQuantity: item.userQuantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, userQuantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, totalCartItem, totalPrice, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
