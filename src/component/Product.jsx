import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Form,Button } from "react-bootstrap";


function Product() {
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [cateID, setCateID] = useState(0);
  const [sortOption, setSortOption] = useState("");
  const [start] = useState(0);
  const [limit, setLimit] = useState(6);


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [cateID, search, sortOption, limit]);

  const fetchProducts = () => {
    let url = cateID 
      ? `http://localhost:9999/products/?category=${cateID}&_start=${start}&_limit=${limit}` 
      : `http://localhost:9999/products?_start=${start}&_limit=${limit}`;
    
    fetch(url)
      .then(res => res.json())
      .then(result => {
        let searchResult = [];
        if (cateID === 0) {
          searchResult = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
        } else {
          searchResult = result.filter(p => p.category === cateID && p.title.toLowerCase().includes(search.toLowerCase()));
        }

        searchResult = sortProducts(searchResult);
        setListProduct(searchResult);
      });
  };

  const fetchCategories = () => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((result) => setCategories(result));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCateID(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleLoadMore = () => {
    setLimit(limit + 6);
  };
  const sortProducts = (products) => {
    switch (sortOption) {
      case "az":
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case "low-high":
        return products.sort((a, b) => a.price - b.price);
      case "high-low":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const cardItem = (item) => {
    return (
      <Col md={4} className="d-flex align-items-stretch" key={item.id}>
        <div className="card my-3" style={{ width: "100%" }}>
          <NavLink to={`/products/${item.id}`}>
          <img
            src={item.image}
            className="card-img-top"
            alt={item.title}
            style={{ height: "350px", objectFit: "contain" }}
          />
          </NavLink>
          <div className="card-body text-center">
            <h5 className="card-title">{item.title}</h5>
            <p className="lead">${item.price}</p>
            <NavLink
              to={`/products/${item.id}`}
              className="btn btn-outline-dark"
            >
              Buy Now
            </NavLink>
          </div>
        </div>
      </Col>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}></Col>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center ">
            <h1>Shop</h1>
            <span>Showing {listProduct.length} results</span>
          </div>
        </Col>
      </Row>
      <Row className="py-5">
        <Col md={3}>
          <div className="mb-4">
            <h5>Search</h5>

            <div class="input-group">
              <div class="form-outline" data-mdb-input-init>
                <input
                  type="search"
                  id="form1"
                  class="form-control"
                  placeholder="Search products"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <button
                type="button"
                class="btn btn-primary"
                data-mdb-ripple-init
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault0"
                  value={0}
                  checked={cateID === 0}
                  onChange={handleCategoryChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault0">
                  All Categories
                </label>
              </li>
              {categories.map((category) => (
                <li className="form-check" key={category.cateid}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={`flexRadioDefault${category.cateid}`}
                    value={category.cateid}
                    checked={cateID === category.cateid}
                    onChange={handleCategoryChange}
                  />
                  <label className="form-check-label" htmlFor={`flexRadioDefault${category.cateid}`}>
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
        <div className="d-flex justify-content-between mb-4">
            <div></div> {/* Empty div to push the sort dropdown to the right */}
            <Form.Select value={sortOption} onChange={handleSortChange} className="w-auto">
              <option value="">Sort By</option>
              <option value="az">Name: A-Z</option>
              <option value="za">Name: Z-A</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </Form.Select>
          </div>
          <Row>{listProduct.map(cardItem)}</Row>
          <div className="text-center mt-4">
            <Button onClick={handleLoadMore}>Load More</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;
