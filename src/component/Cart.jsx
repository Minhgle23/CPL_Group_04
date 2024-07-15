import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";

const Cart = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  // const totalMoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
  return (
    <Container>
      <h2 className="text-center">Cart</h2>
      <div className="text-end">
        <Button variant="danger" className="m-3" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td style={{ maxWidth: "150px" }}>
                <p className="text-truncate overflow-hidden text-nowrap">
                  {product.title}
                </p>
              </td>
              <td>{product.price}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 100 }}
                />
              </td>
              <td>{product.userQuantity}</td>
              <td>{(product.price * product.userQuantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total: {totalPrice} $</h4>
      <p>include tax 8%</p>
      <Link to={"/cart/verify"} className="btn btn-primary">
        Buy
      </Link>
    </Container>
  );
};

export default Cart;
