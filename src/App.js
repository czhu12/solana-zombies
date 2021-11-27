import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/rust/rust';
import React, { useEffect, useState } from "react";
import yaml from 'js-yaml';
import { mdiChevronLeft, mdiChevronRight, mdiCheck, mdiLightbulb, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import { Button, Row, Col, Container } from 'react-bootstrap'
import RemoteMarkdown from './RemoteMarkdown';
import Editor from './Editor';

function App() {
  const [config, setConfig] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [showingAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch('/lessons/index.yml').then(response => {
      return response.text()
    }).then(text => {
      const newConfig = yaml.load(text)
      setConfig(newConfig);
      if (newConfig.chapters.length > 0) {
        setCurrentChapter(0)
      }
    })
  }, [])

  const goBack = () => {
    setCurrentChapter(Math.max(currentChapter - 1, 0))
  }
  const goForward = () => {
    setCurrentChapter(Math.min(config.chapters.length - 1, currentChapter + 1));
  }

  let chapter;
  if (currentChapter !== null) {
    chapter = config.chapters[currentChapter];
  } else {
    chapter = {}
  }
  const isComplete = config?.chapters?.length - 1 === currentChapter;
  return (
    <div className="wrapper">
      <div id="content">
        {chapter && (
          <Row>
            <Col sm={5}>
              <div className="px-5">
                <RemoteMarkdown chapter={chapter} />
              </div>
            </Col>
            <Col sm={7}>
              <Editor chapter={chapter}  />
            </Col>
          </Row>
        )}
      </div>
      <footer>
        <Container fluid>
          <Row>
            <Col>
              {chapter.title}
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
                    <Button className="mr-2" variant="outline-primary" onClick={() => {
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
                  {currentChapter + 1}/{config?.chapters.length}
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
    </div>
  );
}

export default App;
