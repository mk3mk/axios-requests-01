import axios from "axios";
import React from "react";
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AxiosPostRequest from "./AxiosPostRequest";
import AxiosPutRequest from "./AxiosPutRequest";
import AxiosDeleteRequest from "./AxiosDeleteRequest";
import AxiosPostRequestForm from "./AxiosPostRequestForm";


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
          <Col className="class1">
              <div>GET</div>
              <h1>App :{post.title}</h1>
              <p>App :{post.body}</p>   
          </Col>
          <Col className="class1">
              <AxiosPostRequest/>     
          </Col>
        </Row>

        <Row>
        <Col className="class1">
              <AxiosPutRequest/>  
          </Col>
          <Col className="class1">
              <AxiosDeleteRequest/>
          </Col>
        </Row>

        <Row>
        <Col className="class1">
              <AxiosPostRequestForm/>  
          </Col>
          <Col className="class1">
              0000
          </Col>
        </Row>
      </Container>
    </div>
  );
}