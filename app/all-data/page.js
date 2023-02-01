"use client";
import React, { useState } from "react";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import AutoLogout from "../auto-logout";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `https://pokeapi.co/api/v2/pokemon?offset=${index + 1}&limit=20`,
    fetcher
  );

  //   console.log(data);

  const pokemons = data ? [].concat(...data) : [];
  // pokemons.map((e) => console.log(e));
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div style={{ fontFamily: "sans-serif" }}>
        <h1>API RETURN 20 ITEM EVERY FETCH</h1>
        <p style={{ position: "fixed", right: "0" }}>
          showing {size} page(s) {isLoadingMore ? "..." : ""}
          {isLoadingMore ? "..." : "  Total Item:" + pokemons.length * 20}{" "}
          {"  "}
          issue(s){" "}
          <button onClick={() => setSize(size + 1)}>LOAD MeeORE</button>
          <button disabled={isRefreshing} onClick={() => mutate()}>
            {isRefreshing ? "refreshing..." : "refresh"}
          </button>
          <button disabled={!size} onClick={() => setSize(0)}>
            clear
          </button>
        </p>
        <div>
          <AutoLogout />
        </div>
        {/* {pokemons.map((e) => (
        <ul key={e.next}>
          {e.results.map((res) => (
            <li key={res.name}>{res.name}</li>
          ))}
        </ul>
      ))} */}
        <InfiniteScroll
          dataLength={pokemons.length} //This is important field to render the next data
          next={() => setSize(size + 1)}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {pokemons.map((e) => (
            <ul key={e.next}>
              {e.results.map((res) => (
                <li
                  style={{
                    marginTop: "50px",
                    listStyleType: "decimal-leading-zero",
                  }}
                  key={res.name}
                >
                  {res.name}
                </li>
              ))}
            </ul>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
