import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/rust/rust';
import React, { useEffect, useState } from "react";
import { mdiChevronLeft, mdiChevronRight, mdiCheck, mdiLightbulb, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import { Button, Row, Col, Container } from 'react-bootstrap'

function Footer({ currentChapter, setCurrentChapter, config }) {
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [showingAnswer, setShowAnswer] = useState(false);
  const goBack = () => {
    setCurrentChapter(Math.max(currentChapter - 1, 0))
  }
  const goForward = () => {
    setCurrentChapter(Math.min(config.chapters.length - 1, currentChapter + 1));
  }

  const isComplete = config?.chapters?.length - 1 === currentChapter;
  let chapter;
  if (currentChapter !== null) {
    chapter = config.chapters[currentChapter];
  } else {
    chapter = {}
  }
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="align-text-vertical-center">
            <div className="h4">{chapter.title}</div>
          </Col>
          <Col>
            <div className="text-center">
              {!checkAnswer && (
                <Button variant="outline-primary" onClick={() => {
                  setCheckAnswer(true);
                }}>
                  <Icon path={mdiCheck}
                    title="Check Answer"
                    size={1} />
                  Check Answer
                </Button>
              )}
              {checkAnswer && (
                <>
                  <Button className="mr-2" variant="outline-success" onClick={() => {
                    setShowAnswer(true);
                  }}>
                    <Icon path={mdiLightbulb}
                      title="Show Answer"
                      size={1} />
                    Show me the answer
                  </Button>
                  <Button variant="outline-danger" onClick={() => {
                    setShowAnswer(true);
                  }}>
                    <Icon path={mdiClose}
                      title="Try Again"
                      size={1} />
                    Try again
                  </Button>
                </>
              )}

            </div>
          </Col>
          <Col>
            <div className="text-right">
              <Button onClick={goBack}>
                <Icon path={mdiChevronLeft}
                  title="Back"
                  size={1} />
                Back
              </Button>
              <span className="h4 mx-4">
                {currentChapter + 1}/{config?.chapters?.length}
              </span>
              <Button disabled={isComplete} variant={isComplete ? "outline-secondary" : "primary"} onClick={goForward}>
                Next
                <Icon path={mdiChevronRight}
                  title="Next"
                  size={1} />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

