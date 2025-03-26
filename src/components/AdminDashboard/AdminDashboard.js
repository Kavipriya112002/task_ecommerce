import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/inventory");
    setProducts(data);
  };

  const addProduct = async () => {
    const name = prompt("Enter product name:");
    const image = prompt("Enter image URL:");
    const price = prompt("Enter price:");
    const discount = prompt("Enter discount:");

    if (name && image && price && discount) {
      const newProduct = {
        name,
        image,
        price: Number(price),
        discount: Number(discount),
      };
      await axios.post("http://localhost:5000/inventory", newProduct);
      fetchProducts();
    }
  };

  const updateProduct = async (id) => {
    const name = prompt("Enter new name:");
    if (name) {
      await axios.patch(`http://localhost:5000/inventory/${id}`, { name });
      fetchProducts();
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/inventory/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={addProduct}>Add Product</button>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <button onClick={() => updateProduct(product.id)}>Update</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;