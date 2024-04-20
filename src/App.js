import axios from "axios";
import React from "react";
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AxiosPostRequest from "./AxiosPostRequest";
import AxiosPostRequest335 from "./AxiosPostRequest335";
import AxiosPutRequest from "./AxiosPutRequest";
import AxiosDeleteRequest from "./AxiosDeleteRequest";
import AxiosPostRequestForm from "./AxiosPostRequestForm";
import AxiosUserst33501 from "./AxiosUserst335-01";


const baseURL = "https://jsonplaceholder.typicode.com/posts/1";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      <Container>
        
        <Row>
        <Col className="class1 col1111">
              <AxiosUserst33501/>     
          </Col>
          <Col className="class1 col2222">
              <AxiosPostRequest/>     
          </Col>
        </Row>

        <Row>
        <Col className="class1 col3333">
              <AxiosPutRequest/>  
          </Col>
          <Col className="class1 col4444">
              <AxiosDeleteRequest/>
          </Col>
        </Row>

        <Row>
        <Col className="class1 col5555">
              <AxiosPostRequestForm/>  
          </Col>
          <Col className="class1 col6666">
              <AxiosPostRequest335/>     
          </Col>
        </Row>
      </Container>
    </div>
  );
}