import React, { useState } from "react";
import useSWRInfinite from "swr/infinite";

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function App() {

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `https://pokeapi.co/api/v2/pokemon?offset=${index + 1}&limit=20`,
    fetcher
  );

  console.log(data);

  const issues = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <div style={{ fontFamily: "sans-serif" }}>
    
      <button
        onClick={() => {
          setSize(1);
        }}
      >
        load issues
      </button>
      <p>
        showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
        issue(s){" "}
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
        </button>
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? "refreshing..." : "refresh"}
        </button>
        <button disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
      </p>
    </div>
  );
}











// "use client";
// import axios from "axios";
// import useSWRInfinite from "swr/infinite";
// const getKey = (pageIndex, previousData) => {
//   //   if (previousData && !previousData.length) return null;
//   pageIndex == pageIndex + 1;
//   return `https://pokeapi.co/api/v2/pokemon?offset=${pageIndex}&limit=20`;
// };
// // const fetcher = (url) => fetch(url).then((res) => res.json());
// export default function Page() {
//   //   const fetcher = (url) => axios.get(url).then((res) => res.data);
//   const {
//     data: paginatedData,
//     size,
//     setSize,
//   } = useSWRInfinite(getKey);
//   if (!paginatedData) return "loading";
//   console.log({ paginatedData, size });
//   return (
//     <div>
//       <button onClick={() => setSize(size + 1)}>load more</button>
//     </div>
//   );
// }
