
import { Container, Row } from "react-bootstrap";
import Homeheader from "./common/Homeheader";
import Product from "./Product";
import HomeTitle from "./common/HomeTitle";
import HomeReco from "./common/HomeReco";


function Home() {
  return (
    <Container>

      <Row>
        <Homeheader />
      </Row>
      <Row>
        <HomeTitle />
        <HomeReco/>
      </Row>
    </Container>
  );
}

export default Home;
