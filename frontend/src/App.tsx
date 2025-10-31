import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import SelectDate from './pages/SelectDate';
import SelectTime from './pages/SelectTime';
import Checkout from './pages/Checkout';
import CheckoutWithDetails from './pages/CheckoutWithDetails';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/experience/:id" element={<SelectDate />} />
        <Route path="/experience/:id/select-time" element={<SelectTime />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-details" element={<CheckoutWithDetails />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
