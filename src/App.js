import { Fragment, useState} from 'react';
import CartProvider from './store/CartProvider.js';
import Header from './components/Layout/Header/Header'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';


function App() {
  const [cartIsShown,setCartIsShown] = useState(false);

  const showCartHandler = ()=>{
    setCartIsShown(true);
  }
  const hideCartHandler = ()=>{
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;