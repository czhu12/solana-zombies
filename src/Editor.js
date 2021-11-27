import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Controlled as CodeMirror } from 'react-codemirror2'
import { render } from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-chaos";

function Editor({ urls }) {
  const [codeFiles, setCodeFiles] = useState({});
  const [key, setKey] = useState('home');

  useEffect(() => {
    if (!urls) {
      return;
    }
    const requests = urls.map((url) => {
      return axios.get(url);
    });
    Promise.all(requests).then((responses) => {
      const newCodeFiles = {};
      responses.forEach(response => {
        const file = response.request.responseURL;
        const pieces = file.split('/');
        const baseName = pieces[pieces.length - 1];
        newCodeFiles[baseName] = response.data;
      });
      setCodeFiles(newCodeFiles);
      const files = Object.keys(codeFiles);
      const activeFile = files[files.length - 1]
      setKey(activeFile);
    }).catch((err) => {
      console.log(err)
    });
  }, [urls]);

  return (
    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      {Object.keys(codeFiles).map((name) => {
        const code = codeFiles[name];
        return (
          <Tab key={name} eventKey={name} title={name}>
            <AceEditor
              mode="rust"
              theme="chaos"
              value={code}
              onChange={(v) => {
                const newCodeFiles = { ...codeFiles }
                newCodeFiles[name] = v;
                setCodeFiles(newCodeFiles)
              }}
              name={name}
              editorProps={{ $blockScrolling: true }}
            />
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default Editor;
