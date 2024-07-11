import {  Container } from "react-bootstrap";
import Homeheader from "./common/Homeheader";
import Product from "./Product";

function Home() {
  return (
    <Container>
      <Homeheader/>
      <Product/>
    </Container>
  );
}

export default Home;
