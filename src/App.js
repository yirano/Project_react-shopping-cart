import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { ProductContext } from './contexts/ProductContext'
import { CartContext } from './contexts/CartContext'
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = item => {
    // add the given item to the cart
    console.log(cart);
    setCart([...cart, item])

    // localStorage.setItem('cart', cart)
  };

  const removeItem = id => {
    setCart(cart.filter(item => item.id !== id))
  }

  return (
    <div className="App">
      <CartContext.Provider value={cart}>
        <Navigation cart={cart} />
      </CartContext.Provider>

      {/* Routes */}
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
    </div>
  );
}

export default App;
