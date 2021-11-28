import React, { useRef, useEffect } from "react";
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react'


function useOutsideAlerter(ref, hideChaptersSidebar) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        hideChaptersSidebar()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


function Sidebar({ hideChaptersSidebar, chapters, setCurrentChapter, currentChapter }) {
  const sidebarRef = useRef(null);
  useOutsideAlerter(sidebarRef, hideChaptersSidebar);
  return (
    <div ref={sidebarRef} className="sidebar-wrapper">
      <div className="sidebar">
        <div className="text-right">
          <Icon
            className="pointer mt-3 mr-3"
            onClick={() => hideChaptersSidebar()}
            path={mdiClose}
            title="Close"
            size={1} />
        </div>
        <h2 className="p-3 py-4 border-bottom">{chapters[currentChapter].title}</h2>
        {chapters.map((chapter, index) => {
          return (
            <div onClick={() => {
              if (index === currentChapter) {
                return;
              }
              setCurrentChapter(index);
              hideChaptersSidebar();
            }} className={`p-3 ${index === currentChapter ? "font-weight-bold" : "pointer"}`}>
              {chapter.title}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Sidebar;

