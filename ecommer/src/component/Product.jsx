import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Product() {
  const [listProduct, setListProduct] = useState([]);

  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setListProduct(json));
  }, []);
  
  
  const cardItem = (item) => {
    return (
      <div className="card my-5 py-4" key={item.id} style={{ width: "18rem" }}>
        <img
          src={item.image}
          class="card-img-top"
          alt={item.title}
          height={"300px"}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{item.title}</h5>
          <p className="lead">${item.price}</p>
          <NavLink to={`/products/${item.id}`} className="btn btn-outline-dark">
            Buy Now
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Product</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          {listProduct.map(cardItem)}
        </div>
      </div>
    </div>
  );
}

export default Product;
