import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.css";
import cart from "../Assets/shopping-cart.png"

const Navbar = ({ setSearchQuery, isAdmin }) => {
  return (
    <nav className="navbar">
     <div className="divi1"><h1>E-commerce</h1>
     <SearchBar setSearchQuery={setSearchQuery} className="nav_search"/></div> 
     <div className="divisiono2">
      {isAdmin ? (
        <>
          <Link to="/admin-dashboard" className="nav-link ">
            Admin Dashboard
          </Link>
        </>
      ) : (
        <>
        <Link to="/" className="nav-link">
        <h4 className="textnav"> Home</h4> 
         </Link>
          <Link to="/admin-login" className="nav-link">
          <h4 className="textnav1">Admin Login</h4> 
          </Link>
          <Link to="/cart" className="nav-link">
          <img src={cart} alt="cart" className="carti" />
          </Link>
        </>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
