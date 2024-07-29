
import { Container, Row } from "react-bootstrap";
import Homeheader from "./common/Homeheader";
import HomeTitle from "./common/HomeTitle";
import HomeReco from "./common/HomeReco";
import HomeBlog from "./common/HomeBlog";
import Footer from "./common/Footer";


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
      <HomeBlog/>
      <Footer/>
    </Container>
  );
}

export default Home;
