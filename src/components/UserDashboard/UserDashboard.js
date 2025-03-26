import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css";
import ImageSlider from "./ImageSlider.js";
import sl1 from "../Assets/slider1.jpeg"
import sl2 from "../Assets/slider2.jpeg"
import sl3 from "../Assets/slider3.jpeg"
import sl4 from "../Assets/slider4.jpeg"
import sl5 from "../Assets/slider5.jpeg"
const UserDashboard = ({ searchQuery }) => {
  const images1 =[sl1,sl2,sl3,sl4,sl5];

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/inventory")
      .then((res) => setItems(res.data));
  }, []);

  const filteredProducts = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="user-dashboard">
      <div className="slider"><ImageSlider images={images1} /></div>
      <h2>User Dashboard</h2>
      <div className="user-items">
        {filteredProducts.map((item) => (
          <div key={item.id} className="user-item">
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} height="180px" width="250px" className="imageof"/>
              <p >{item.name}</p>
              <Link to={`/product/${item.id}`} className="view">View details</Link>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
