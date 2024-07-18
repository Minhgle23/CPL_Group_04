import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9999/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Find the highest current id
    let maxId = 0;
    fetch('http://localhost:9999/products')
      .then(response => response.json())
      .then(data => {
        data.forEach(product => {
          if (product.id > maxId) {
            maxId = product.id;
          }
        });

        // Step 2: Create new product with incremented id
        const newProduct = {
          id: maxId + 1,
          title,
          price: Number(price), // Ensure price is converted to number if needed
          description,
          category: Number(category), // Ensure category id is a number
          quantity: Number(quantity), // Ensure quantity is converted to number if needed
          image
        };

        // Step 3: Send POST request to JSON Server to add product
        fetch('http://localhost:9999/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        })
          .then(response => {
            if (response.ok) {
              toast.success("Product added successfully!");
              // Optionally, reset the form or give feedback to the user
              setTitle('');
              setPrice('');
              setDescription('');
              setCategory('');
              setQuantity('');
              setImage('');
            } else {
              toast.error("Failed to add product!");
            }
          })
          .catch(error => {
            console.error('Error:', error);
            toast.error("Failed to add product!");
          });
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded">
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cate) => (
              <option key={cate.cateid} value={cate.cateid}>
                {cate.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="mr-2">
            Add Product
          </Button>
          <Link to="/manage/product" className="btn btn-secondary link-cancel">
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
