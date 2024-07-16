import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user.id ? parseInt(user.id) : null;

  const [cart, setCart] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:9999/carts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const userCart = data.find(cart => cart.userId === userId);
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

    if (userId) {
      saveOrUpdateCartInAPI(cart);
    }
  }, [cart, userId]);

  const saveOrUpdateCartInAPI = async (cart) => {
    const cartData = {
      userId: userId,
      totalProducts: cart.map(item => ({
        product: {
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
        },
        quantity: item.userQuantity,
      })),
    };

    try {
      const response = await fetch('http://localhost:9999/carts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const existingCart = data.find(cart => cart.userId === userId);

      if (existingCart) {
        const updateResponse = await fetch(`http://localhost:9999/carts/${existingCart.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartData),
        });

        if (!updateResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await updateResponse.json();
        console.log('Cart updated in API:', result);
      } else {
        const createResponse = await fetch('http://localhost:9999/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartData),
        });

        if (!createResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await createResponse.json();
        console.log('Cart saved to API:', result);
      }
    } catch (error) {
      console.error('Error saving or updating cart in API:', error);
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
      return updatedCart;
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
