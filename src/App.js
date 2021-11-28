import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/rust/rust';
import React, { useEffect, useState, useRef } from "react";
import yaml from 'js-yaml';
import { Row, Col } from 'react-bootstrap'
import RemoteMarkdown from './RemoteMarkdown';
import Editor from './Editor';
import Footer from './Footer';
import AppContext from './context';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


function App() {
  const [config, setConfig] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [targetCodeFiles, setTargetCodeFiles] = useState({});
  const [codeFiles, setCodeFiles] = useState({});
  const [_showChaptersSidebar, setShowChaptersSidebar] = useState(false);
  const sidebarRef = useRef(null);

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
      {_showChaptersSidebar && (
        <Sidebar
          hideChaptersSidebar={() => setShowChaptersSidebar(false)}
          chapters={config.chapters}
          setCurrentChapter={setCurrentChapter}
          currentChapter={currentChapter}
        />
      )}
      <Navbar />
      <div className="wrapper">
        <div id="content">
          {chapter && (
            <Row>
              <Col sm={hasCode ? 5 : 8} className={hasCode ? "" : "offset-sm-2"}>
                <div className="px-4">
                  <RemoteMarkdown chapter={chapter} />
                </div>
              </Col>
              {hasCode && (
                <Col sm={hasCode ? 7 : 0}>
                  <Editor chapter={chapter} />
                </Col>
              )}
            </Row>
          )}
        </div>
        <Footer
          config={config}
          currentChapter={currentChapter}
          setCurrentChapter={setCurrentChapter}
          showChaptersSidebar={() => {
            setShowChaptersSidebar(true)
          }}
          hideChaptersSidebar={() => {
            setShowChaptersSidebar(false)
          }}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
