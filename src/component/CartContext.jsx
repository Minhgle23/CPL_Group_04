import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Retrieve or generate user ID from local storage
  const user = JSON.parse(localStorage.getItem('user')) || [];
  const userId = parseInt(user.id);
  console.log(userId);
  const [cart, setCart] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:9999/carts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const userCart = data.find(cart => cart.userId === userId);
        console.log(userCart);
        if (userCart) {
          const formattedCart = userCart.totalProducts.map(item => ({
            ...item.product,
            userQuantity: item.quantity,
          }));
          setCart(formattedCart);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (userId) {
      fetchCart();
    } else {
      const initialCart = [];
      setCart(initialCart);
      localStorage.setItem('cart', JSON.stringify(initialCart));
    }
  }, [userId]);

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

    // Save the cart to the API only if userId exists
    if (userId) {
      saveCartToAPI(cart);
    }
  }, [cart, userId]);

  const saveCartToAPI = async (cart) => {
    const cartData = {
      id: Math.floor(Math.random() * 1000), // Replace with the actual cart ID if needed
      userId: userId,
      totalProducts: cart.map(item => ({
        product: {
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          quantity: item.quantity,
        },
        quantity: item.userQuantity,
      })),
    };

    try {
      const response = await fetch('http://localhost:9999/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carts: [cartData] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Cart saved to API:', result);
    } catch (error) {
      console.error('Error saving cart to API:', error);
    }
  };

  const updateCartInAPI = async (updatedCart) => {
    const cartData = {
      userId: userId,
      totalProducts: updatedCart.map(item => ({
        product: {
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          quantity: item.quantity,
        },
        quantity: item.userQuantity,
      })),
    };

    try {
      const response = await fetch(`http://localhost:9999/carts/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Cart updated in API:', result);
    } catch (error) {
      console.error('Error updating cart in API:', error);
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, userQuantity: item.userQuantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, userQuantity: 1 }];
      }
      updateCartInAPI(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    updateCartInAPI([]);
  };

  return (
    <CartContext.Provider value={{ cart, totalCartItem, totalPrice, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
