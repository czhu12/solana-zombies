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
  }, [chapter])
  return (
    <ReactMarkdown children={children} />
  );
}

export default RemoteMarkdown;
