
import { Container, Row } from "react-bootstrap";
import Homeheader from "./common/Homeheader";
import HomeTitle from "./common/HomeTitle";
import HomeReco from "./common/HomeReco";
import HomeBlog from "./common/HomeBlog";


function Home() {
  return (
    <Container>
      <Row>
        <Homeheader />
      </Row>
      <Row>
        <HomeTitle />
        
      </Row>
      <Row>
      <HomeReco/>
      </Row>
      <Row>
      <HomeBlog/>
      </Row>
      
    </Container>
  );
}

export default Home;
