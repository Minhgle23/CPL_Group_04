import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Form,Button } from "react-bootstrap";
import  '../component/User/UserStyle/Product.css';

function Product() {
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [cateID, setCateID] = useState(0);
  // const [sortOption, setSortOption] = useState("");
  const [start] = useState(0);
  const [limit, setLimit] = useState(6);
  const [brandID, setBrandID] = useState(0);
  const [sortOption, setSortOption] = useState("best-sellers");
  const [viewMode, setViewMode] = useState("grid");
  const [itemsPerPage, setItemsPerPage] = useState(12);


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
    setLimit(6);
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
  const handleBrandChange = (e) => {
    setBrandID(Number(e.target.value));
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const cardItem = (item) => {
    return (
      <Col xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} className="d-flex align-items-stretch" key={item.id}>
        <div className={`card my-3 ${viewMode === 'list' ? 'flex-row' : ''}`} style={{width: "100%"}}>
          <div className="position-relative card-image-wrapper" >
            <span className="badge bg-dark position-absolute top-0 start-0 m-2">New</span>
            <NavLink to={`/products/${item.id}`}>
              <img
                src={process.env.PUBLIC_URL + `/assets/images/products/${item.image}`}
                className="card-img-top"
                alt={item.title}
                style={{height: "250px", objectFit: "contain"}}
              />
            </NavLink>
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-muted">{item.title}</h5>
            <p className="card-text text-muted" style={{fontSize: "20px"}}>{categories.find(c => c.cateid == item.category)?.name}</p>
            <p className="card-text text-muted fw-bold">${item.price}</p>
            <NavLink
              to={`/products/${item.id}`}
              className="btn btn-dark mt-auto"
            >
              Buy Now
            </NavLink>
          </div>
        </div>
      </Col>
    );
  };

  return (
    <Container fluid className="py-5">
      <h1 className="mb-0">Products</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
          <li className="breadcrumb-item active" aria-current="page"> Products </li>
        </ol>
      </nav>
      <Row>
        <Col lg={3} className="mb-4">
          <div className="category-sidebar">
            <h5>Shop by Category</h5>
            <ul className="list-unstyled">
              <li className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  id="category0"
                  value={0}
                  checked={cateID === 0}
                  onChange={handleCategoryChange}
                />
                <label className="form-check-label" htmlFor="category0">
                  All Categories
                </label>
              </li>
              {categories.map((category) => (
                <li className="form-check" key={category.cateid}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    id={`category${category.cateid}`}
                    value={category.cateid}
                    checked={cateID === category.cateid}
                    onChange={handleCategoryChange}
                  />
                  <label className="form-check-label" htmlFor={`category${category.cateid}`}>
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col lg={9}>
          <div className="product-toolbar d-flex flex-wrap justify-content-between align-items-center mb-4">
            <div className="view-options mb-3 mb-md-0">
              <Button variant="outline-dark" className="me-2" onClick={() => handleViewModeChange('grid')}>
                <i className="fa fa-th"></i>
              </Button>
              <Button variant="outline-dark" onClick={() => handleViewModeChange('list')}>
                <i className="fa fa-list"></i>
              </Button>
            </div>
            <div className="sort-options d-flex flex-wrap">
              <label>Sort by:</label>
              <Form.Select value={sortOption} onChange={handleSortChange} className="me-2 mb-2 mb-md-0">
                <option value="best-sellers">Best Sellers</option>
                <option value="az">Name: A-Z</option>
                <option value="za">Name: Z-A</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </Form.Select>
            </div>
          </div>
          <Row className="product-grid">{listProduct.map(cardItem)}</Row>
          <div className="text-center mt-4">
            <Button variant="outline-dark" onClick={handleLoadMore}>Load More</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;