"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

export default function Summary() {
  const [topMissedWords, setTopMissedWords] = useState<[[string, number]] | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const startTime = parseInt(localStorage.getItem("startTime") || "0", 10);
    const endTime = Date.now();
    if (startTime) {
      const durationInMs = endTime - startTime;
      setDuration(Math.floor(durationInMs/1000));
    }

    const missCounts = JSON.parse(localStorage.getItem("missCounts") || "{}");
    let sortable = [];
    for (let item in missCounts) {
      sortable.push([item, missCounts[item]]);
    }
    sortable.sort(function(a, b){
      return b[1] - a[1];
    });
    console.log(sortable);
    setTopMissedWords(sortable);
  }, []);

  return ( // TODO add summary page for details look in notion na
      <main className="flex flex-col min-h-screen items-center justify-center bg-dark-gray text-grayish-white">
        <div className="h-96 w-72 md:w-[28rem] px-10 py-10 bg-light-gray rounded-xl flex flex-col gap-2 shadow-xl">
          <h1 className="font-bold text-lg md:text-2xl text-light-cyan">Summary</h1>
          <h2 className="font-bold text-base md:text-lg">Time spent : 
            { duration !== null ? (
              <span className="font-normal text-sm md:text-base"> {` ${Math.floor(duration/60)} mins ${duration-Math.floor(duration/60)*60} secs`} </span>
            ) : (
              <span className="font-normal text-sm md:text-base"> Calculating time </span>
            )
            } 
          </h2>
          <h2 className="font-bold text-base md:text-lg">Most miss words</h2>
          {(!topMissedWords || topMissedWords.length == 0) && <div>You don't miss any word !!</div>}
          {topMissedWords?.map((item)=>{
            return <div key={item[0]} className="text-sm md:text-base">{`${item[0]} : ${item[1]}`}</div>
          })}
        </div>
        <div className="flex w-72 md:w-[28rem] gap-2 mt-2">
          <Link className="flex-1 font-bold text-sm md:text-lg text-light-green bg-light-gray py-3 rounded-xl hover:scale-95 transition active:bg-opacity-50 text-center shadow-xl" href='/blob'>Use Again</Link>
          <Link className="flex-1 font-bold text-sm md:text-lg text-light-red bg-light-gray py-3 rounded-xl hover:scale-95 transition active:bg-opacity-50 text-center shadow-xl" href='/'>Back to home</Link>
        </div>
      </main>
  );
}