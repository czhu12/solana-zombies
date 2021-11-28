import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-chaos";
import AppContext from './context';

function Editor({ chapter }) {
  const [key, setKey] = useState('home');

  const { codeFiles, setCodeFiles, targetCodeFiles, setTargetCodeFiles }= useContext(AppContext);

  const getAllCodeUrls = (urls) => {
    const requests = urls.map((url) => {
      return axios.get('/' + url);
    });

    return Promise.all(requests).then((responses) => {
      const newCodeFiles = {};
      responses.forEach(response => {
        const file = response.request.responseURL;
        const pieces = file.split('/');
        const baseName = pieces[pieces.length - 1];
        newCodeFiles[baseName] = response.data;
      });
      return newCodeFiles;
    });
  }

  const downloadStartingCode = () => {
    if (!chapter.before_code) return;

    getAllCodeUrls(chapter.before_code).then((newCodeFiles) => {
      setCodeFiles(newCodeFiles);
      const files = Object.keys(codeFiles);
      const activeFile = files[0]
      setKey(activeFile);
    }).catch((err) => {
      console.log(err)
    });
  }

  const downloadTargetCode = () => {
    if (!chapter.after_code) return;

    getAllCodeUrls(chapter.after_code).then((newCodeFiles) => {
      setTargetCodeFiles(newCodeFiles);
    }).catch((err) => {
      console.log(err)
    });
  }

  useEffect(() => {
    if (!chapter) {
      return;
    }
    downloadStartingCode();
    downloadTargetCode();
  }, [chapter]);

  return (
    <div id="editor" className="mt-2">
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        {Object.keys(codeFiles).map((name) => {
          const code = codeFiles[name];
          return (
            <Tab key={name} eventKey={name} title={name}>
              <AceEditor
                showPrintMargin={false}
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
    </div>
  );
}

export default Editor;
