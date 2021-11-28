import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/rust/rust';
import React, { useEffect, useState } from "react";
import { mdiMenu, mdiChevronLeft, mdiChevronRight, mdiCheck, mdiLightbulb, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import { Button, Row, Col, Container } from 'react-bootstrap'
import { useContext } from 'react';
import { checkAnswer } from './utils/checker';
import AppContext from './context';
import Swal from 'sweetalert2'


function Footer({ currentChapter, setCurrentChapter, config, showChaptersSidebar }) {
  const [checkingAnswer, setCheckAnswer] = useState(false);
  const [showingAnswer, setShowAnswer] = useState(false);
  const { codeFiles, targetCodeFiles } = useContext(AppContext);

  const goBack = () => {
    setCurrentChapter(Math.max(currentChapter - 1, 0))
  }
  const goForward = () => {
    setCurrentChapter(Math.min(config.chapters.length - 1, currentChapter + 1));
  }
  const performCheckAnswer = () => {
    const isCorrect = checkAnswer(codeFiles, targetCodeFiles);
    if (isCorrect) {
      Swal.fire({
        title: 'Correct!',
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: 'Hide',
        confirmButtonText: 'Next Page',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          goForward();
        }
      })
    } else {
      setCheckAnswer(true);
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }

  const isComplete = config?.chapters?.length - 1 === currentChapter;
  let chapter;
  if (currentChapter !== null) {
    chapter = config.chapters[currentChapter];
  } else {
    chapter = {}
  }
  return (
    <footer className="shadow-lg">
      <Container fluid>
        <Row>
          <Col style={{display: 'flex', alignItems: 'flex-end'}}>
            <div className="h4 pointer" onClick={() => {
              showChaptersSidebar();
            }}>
              <Icon className="mr-2" path={mdiMenu}
                title="Menu"
                size={1} />
              {chapter.title}
              </div>
          </Col>
          <Col>
            <div className="text-center">
              {!checkingAnswer && (
                <Button variant="outline-primary" onClick={performCheckAnswer}>
                  <Icon path={mdiCheck}
                    title="Check Answer"
                    size={1} />
                  Check Answer
                </Button>
              )}
              {checkingAnswer && (
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
                    performCheckAnswer();
                  }}>
                    <Icon
                      path={mdiClose}
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

