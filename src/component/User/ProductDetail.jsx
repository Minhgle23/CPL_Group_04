

import Comment from "./Comment";
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import CartContext from "../CartContext";

const ProductDetail = ({ user, isAuthenticated }) => {
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
            <img src={`/assets/images/products/${product.image}`} alt={product.title} height="400px" />
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

          </div>

        </div>
        <Comment productId={product.id} user={user} isAuthenticated={isAuthenticated} />
      </div>
  );
}

export default ProductDetail
