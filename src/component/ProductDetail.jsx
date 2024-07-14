PhanDucManh
  import React, { useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import Comment from "./Comment";
  
  const ProductDetail = ({ user, isAuthenticated }) => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      fetch(`http://localhost:9999/products/${id}`)
        .then((res) => res.json())
        .then((json) => setProduct(json));
    }, [id]);

    const handleAddToCart = () => {
      if (!isAuthenticated) {
        navigate('/login');
      } else {
        // Handle add to cart functionality
        console.log('Added to cart');
      }
    };

    return (
      <div className="container my-5 py-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mx-auto product">
            <img src={product.image} alt={product.title} height="400px" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold">{product.title}</h1>
            <hr />
            <h2 className="my-4">${product.price}</h2>
            <p className="lead">{product.description}</p>
            <button
              className="btn btn-outline-primary my-5"
              onClick={handleAddToCart}
            >
              Add to cart hehe
            </button>
           
          </div>
=======

import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import CartContext from "./CartContext";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  
  console.log(id)
  useEffect(() => {
    fetch(`http://localhost:9999/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  return (
    <div className="container my-5 py-3">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center mx-auto product">
          <img src={product.image} alt={product.title} height="400px" />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-5 fw-bold">{product.title}</h1>
          <hr />
          <h2 className="my-4">${product.price}</h2>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-primary my-5"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
 main
        </div>
        <Comment productId={product.id} user={user} isAuthenticated={isAuthenticated} />
      </div>
 PhanDucManh
    );
  };

  export default ProductDetail;
=======
    </div>
  );
}
export default ProductDetail
 main
