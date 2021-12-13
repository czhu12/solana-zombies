import axios from "axios";
import React, { useEffect, useState } from "react";
import yaml from 'js-yaml';
import { Container, Row, Col } from 'react-bootstrap';
import BookPreview from './components/BookPreview';

function IndexLessons() {
  const [lessons, setLessons] = useState();
  useEffect(() => {
    axios.get("/index.yml").then(response => {
      setLessons(yaml.load(response.data));
    })
  }, [])
  return (
    <Container className="my-4">
      {lessons && (
        <Row>
          {lessons.books.map((book) => {
            return (
              <Col md={4} className="mb-3">
                <BookPreview book={book}/>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default IndexLessons;
