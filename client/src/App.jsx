

  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Home from './pages/Home';
  import Login from './pages/Login';
  import Register from './pages/Register';
  import AdminDashboard from './pages/AdminDashboard';
  import CustomerDashboard from './pages/CustomerDashboard';
  import Sweets from './pages/Sweets';
  import About from './pages/About';
  import Cart from './pages/Cart.jsx';


  function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/sweets" element={<Sweets />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    );
  }

  export default App;
