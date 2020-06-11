import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ProductContext } from './contexts/ProductContext'
import { CartContext } from './contexts/CartContext'
import data from './data';
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';


function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('myStorage')) || []);

  const addItem = item => {
    setCart([...cart, item])
  };
  const removeItem = id => {
    setCart(cart.filter(item => item.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('myStorage', JSON.stringify(cart))
  }, [cart])

  return (
    <div className="App">
      <CartContext.Provider value={cart}>
        <Navigation cart={cart} />
      </CartContext.Provider>

      <ProductContext.Provider value={{ products, addItem }}>
        <Route exact path="/">
          <Products />
        </Route>
      </ProductContext.Provider>

      <CartContext.Provider value={{ cart, removeItem }}>
        <Route path="/cart">
          <ShoppingCart />
        </Route>
      </CartContext.Provider>
    </div >
  );
}

export default App;
