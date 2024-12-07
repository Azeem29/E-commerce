import './App.css';
import Page from './register/Page';
import Signup from './register/Signup';
import Home from './register/Home';
import Landing from './register/Landing';
import Cart from './register/Cart';
import Men from '../src/Categories/Men';
import Women from '../src/Categories/Women';
import Kids from '../src/Categories/Kids';
import Jewellery from '../src/Categories/Jewellery';
import Shoes from '../src/Categories/Shoes';
import Buy from '../src/register/Buy';
import Contact from './register/Contact';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
      <Route path='/Landing' element={<Landing />} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/' element={<Page />} />
      <Route path='/home' element={<Home />} />
      <Route path='/Cart' element={<Cart />} />
      <Route path='/Landing/Men' element={<Men />} />
      <Route path='/Landing/Women' element={<Women />} />
      <Route path='/Landing/Kids' element={<Kids />} />
      <Route path='/Landing/Jewellery' element={<Jewellery />} />
      <Route path='/Landing/Shoes' element={<Shoes />} />
      <Route path='/Landing/Buy' element={<Buy />} />
      <Route path='/Contact' element={<Contact />} />
    </Routes>
    </div>
    </Router>
    
  );
}

export default App;
