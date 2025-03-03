// App.js - Main component
import {React,  useState } from 'react';
import {Routes, Route } from "react-router-dom";
import './App.css';
// import Navbar from './components/Navbar';
// import GemstoneList from './components/GemstoneList';
// import SearchFilters from './components/SearchFilters';
// import AddGemstone from './components/AddGemstone';
import Header from "./components/Header"
import HomePage from "./components/HomePage";
import ListingsPage from "./pages/ListingsPage"
import GemstoneDetail from "./pages/GemstoneDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Footer from "./components/Footer"
import Checkout from "./pages/Checkout"
import Dashboard from "./pages/Dashboard"
import CreateListing from "./pages/CreateListing"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  // const [gemstones, setGemstones] = useState([
  //   {
  //     id: 1,
  //     name: "Natural Blue Sapphire",
  //     type: "Sapphire",
  //     carat: 3.5,
  //     color: "Vivid Blue",
  //     price: 12500,
  //     description: "Exquisite natural sapphire with excellent clarity and deep blue color. GIA certified.",
  //     verified: true,
  //     image: "https://via.placeholder.com/300/0000FF/FFFFFF?text=Blue+Sapphire",
  //     certification: "GIA",
  //     origin: "Sri Lanka"
  //   },
  //   {
  //     id: 2,
  //     name: "Colombian Emerald",
  //     type: "Emerald",
  //     carat: 2.1,
  //     color: "Rich Green",
  //     price: 8750,
  //     description: "Stunning Colombian emerald with minimal inclusions. AGL certified.",
  //     verified: true,
  //     image: "https://via.placeholder.com/300/00FF00/FFFFFF?text=Emerald",
  //     certification: "AGL",
  //     origin: "Colombia"
  //   },
  //   {
  //     id: 3,
  //     name: "Natural Ruby",
  //     type: "Ruby",
  //     carat: 1.8,
  //     color: "Pigeon Blood Red",
  //     price: 15300,
  //     description: "Classic pigeon blood red ruby from Burma. Excellent cut and clarity.",
  //     verified: false,
  //     image: "https://via.placeholder.com/300/FF0000/FFFFFF?text=Ruby",
  //     certification: "Pending",
  //     origin: "Burma"
  //   },
  //   {
  //     id: 4,
  //     name: "Yellow Diamond",
  //     type: "Diamond",
  //     carat: 2.5,
  //     color: "Fancy Yellow",
  //     price: 22000,
  //     description: "Fancy yellow diamond with excellent cut and VVS clarity.",
  //     verified: true,
  //     image: "https://via.placeholder.com/300/FFFF00/000000?text=Yellow+Diamond",
  //     certification: "GIA",
  //     origin: "South Africa"
  //   }
  // ]);

  // const [filters, setFilters] = useState({
  //   type: "",
  //   minPrice: "",
  //   maxPrice: "",
  //   verified: false
  // });

  // const [showAddForm, setShowAddForm] = useState(false);

  // const addGemstone = (newGemstone) => {
  //   newGemstone.id = gemstones.length + 1;
  //   setGemstones([...gemstones, newGemstone]);
  //   setShowAddForm(false);
  // };

  // const filterGemstones = () => {
  //   return gemstones.filter(gem => {
  //     // Filter by type
  //     if (filters.type && gem.type !== filters.type) return false;
      
  //     // Filter by price range
  //     if (filters.minPrice && gem.price < parseInt(filters.minPrice)) return false;
  //     if (filters.maxPrice && gem.price > parseInt(filters.maxPrice)) return false;
      
  //     // Filter by verification status
  //     if (filters.verified && !gem.verified) return false;
      
  //     return true;
  //   });
  // };

  return (
    <div className="app">
     
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="main-content">
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/gemstone/:id" element={<GemstoneDetail />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onLogin={handleLogin} />} />
      <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} />} />
      <Route path="/checkout/:id" element={<Checkout isLoggedIn={isLoggedIn} />} />
      <Route path="/create-listing" element={<CreateListing isLoggedIn={isLoggedIn} />} />
      </Routes>
      </main>
      {/* <Header/> */}
      <Footer />
      {/* <Navbar setShowAddForm={setShowAddForm} />
      <div className="container">
        <div className="sidebar">
          <SearchFilters filters={filters} setFilters={setFilters} />
        </div>
        
        <div className="main-content">
          {showAddForm ? (
            <AddGemstone addGemstone={addGemstone} setShowAddForm={setShowAddForm} />
          ) : (
            <GemstoneList gemstones={filterGemstones()} />
          )}
        </div>
      </div> */}
    </div>
  );
}

export default App;