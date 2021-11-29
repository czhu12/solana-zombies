import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'

function RemoteMarkdown({ chapter }) {
  const [children, setChildren] = useState(null);
  useEffect(() => {
    if (chapter) {
      axios.get('/' + chapter.content).then(response => {
        setChildren(response.data);
      })
    }
  }, [chapter]);
  return (
    <div id="lesson-content" className="mt-2">
      <ReactMarkdown children={children} />
    </div>
  );
}

export default RemoteMarkdown;
