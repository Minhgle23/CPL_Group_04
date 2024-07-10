import { Carousel } from "react-bootstrap";


function Homeheader(){
    return(
        <Carousel>
        <Carousel.Item interval={3000}>
            <a href='#'>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            className="d-block w-100"
            src={process.env.PUBLIC_URL + `assets/images/them2.jpeg`}
            alt="Image One"
          />
          </a>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            className="d-block w-100"
            src={process.env.PUBLIC_URL + `assets/images/them1.webp`}
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3>Label for second slide</h3>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
}

export default Homeheader;