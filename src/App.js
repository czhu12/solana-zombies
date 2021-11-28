import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/rust/rust';
import React, { useEffect, useState } from "react";
import yaml from 'js-yaml';
import { Row, Col } from 'react-bootstrap'
import RemoteMarkdown from './RemoteMarkdown';
import Editor from './Editor';
import Footer from './Footer';
import AppContext from './context';
import Navbar from './Navbar';

function App() {
  const [config, setConfig] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [targetCodeFiles, setTargetCodeFiles] = useState({});
  const [codeFiles, setCodeFiles] = useState({});

  useEffect(() => {
    fetch('/lessons/index.yml').then(response => {
      return response.text();
    }).then(text => {
      const newConfig = yaml.load(text)
      setConfig(newConfig);
      if (newConfig.chapters.length > 0) {
        setCurrentChapter(0)
      }
    })
  }, [])

  let chapter;
  if (currentChapter !== null) {
    chapter = config.chapters[currentChapter];
  } else {
    chapter = {}
  }

  const hasCode = !!chapter.before_code;

  return (
    <AppContext.Provider value={{
      targetCodeFiles,
      setTargetCodeFiles,
      codeFiles,
      setCodeFiles,
    }}>
      <Navbar />
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
                <Editor chapter={chapter} />
              </Col>
            </Row>
          )}
        </div>
        <Footer
          config={config}
          currentChapter={currentChapter}
          setCurrentChapter={setCurrentChapter}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
