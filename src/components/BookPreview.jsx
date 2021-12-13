import React from "react";
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function BookPreview({book}) {
  return (
    <Card className="book-preview p-3">
      <div>
        <div>
          <div className="h3 text-center">{book.name}</div>
          <div className="text-center">{book.description}</div>
        </div>
      </div>
      <div>
        <Link to={`/lessons/?source=${book.source}`}>
          <Button block variant="outline-info" size="lg" className="large-button">
            Get Started
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default BookPreview;
