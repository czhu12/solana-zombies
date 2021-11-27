import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'

function RemoteMarkdown({url}) {
  const [children, setChildren] = useState(null);
  useEffect(() => {
    if (url) {
      axios.get(url).then(response => {
        setChildren(response.data);
      })
    }
  }, [url])
  return (
    <ReactMarkdown children={children} />
  );
}

export default RemoteMarkdown;
