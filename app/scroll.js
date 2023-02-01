import _ from "lodash";
import React, { useEffect, useRef } from "react";

function ListObserver({ onEnd, loading, children }) {
  const myRef = useRef();

  const onTriggered = ([entry]) => {
    console.log(entry);
    if (_.isFunction(onEnd) && entry.isIntersecting && !loading) onEnd();
  };

  useEffect(() => {
    const options = {
      root: document.querySelector("#end-of-list"),
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(onTriggered, options);

    observer.observe(myRef.current);
  }, []);

  return (
    <>
      {loading ? "loadingsss ......" : <>{children}</>}
      <div ref={myRef} />
    </>
  );
}

export default ListObserver;
