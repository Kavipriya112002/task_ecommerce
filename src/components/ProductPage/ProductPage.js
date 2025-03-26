import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/inventory/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = () => {
    axios.post("http://localhost:5000/cart", product);
  };

  return (
    <div className="product-page">
      {product ? (
        <>
        <div className="pro_div">
          <div><img src={product.image} alt={product.name} height="300" width="550"/></div>
          <div className="prodivi2"><h3>{product.name}</h3>
          <h2>{product.price}</h2>
          <p>{product.description}</p>
          <button onClick={addToCart}>Add to Cart</button></div></div>
          <br/> 
         </>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
