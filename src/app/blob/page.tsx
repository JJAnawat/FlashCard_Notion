"use client";

import { useState, useEffect } from "react";
import FlashCard from "../_components/flashCard";

import type { FlashCardData,MissCountsType, ScoreCountsType } from "~/interface";

import { api } from "~/trpc/react";
import { STATUS, STATUS_PROB } from "~/const";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isSuccess } = api.word.getAllWords.useQuery();

  const [items, setItems] = useState<FlashCardData[]>([]);
  const [idx, setIdx] = useState<number>(0);
  
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('startTime', Date.now().toString());
    if (data && isSuccess) {
      const ret = [];
      const scoreCount: ScoreCountsType = {};
      for (const item of data) {
        // Add all item list
        // console.log(item);
        const statusIdx = STATUS.indexOf(item.properties.status);
        let prob = STATUS_PROB[statusIdx];
        // console.log(statusIdx, prob)
        if (prob === undefined) prob = 0;
        for (let i = 0; i < prob; i++) {
          ret.push(item);
        }

        scoreCount[item.id] = item.properties.score;
      }
      setItems(ret);
      setIdx(Math.floor(Math.random()*ret.length));
      localStorage.setItem("initialScores", JSON.stringify(scoreCount));
      localStorage.setItem("scoreCounts", JSON.stringify(scoreCount));
      // console.log("Return to blob");
    }
  }, [data, isSuccess]);

  const handleMiss = () => {
    const word = items[idx]?.properties.word;
    // handle miss counter
    if (word) {
      const storedMissCounts = localStorage.getItem("missCounts");
      const missCounts: MissCountsType = storedMissCounts ? (JSON.parse(storedMissCounts) as MissCountsType) : {};
      missCounts[word] = (missCounts[word] ?? 0) + 1;
      localStorage.setItem("missCounts", JSON.stringify(missCounts));
    }
    // handle score counter
    const pageId = items[idx]?.id;
    if(pageId){
      const storedScoreCounts = localStorage.getItem("scoreCounts");
      const scoreCounts: ScoreCountsType = storedScoreCounts ? (JSON.parse(storedScoreCounts) as ScoreCountsType) : {};
      scoreCounts[pageId] = Math.max((scoreCounts[pageId] ?? 0)-2,0);
      localStorage.setItem("scoreCounts", JSON.stringify(scoreCounts));
    }
    nextIndex();
  };

  const handleNext = () => {
    // handle score counter
    const pageId = items[idx]?.id;
    if(pageId){
      const storedScoreCounts = localStorage.getItem("scoreCounts");
      const scoreCounts: ScoreCountsType = storedScoreCounts ? (JSON.parse(storedScoreCounts) as ScoreCountsType) : {};
      scoreCounts[pageId] = Math.min((scoreCounts[pageId] ?? 0)+1,10);
      localStorage.setItem("scoreCounts", JSON.stringify(scoreCounts));
    }
    nextIndex();
  }

  const nextIndex = () => {
    let newIdx = Math.floor(Math.random() * items.length);
    while(items[idx]?.properties.word === items[newIdx]?.properties.word){
      newIdx = Math.floor(Math.random() * items.length);
    }
    setIdx(newIdx);
  };

  return (
      <main className="flex min-h-screen relative items-center justify-center bg-dark-gray">
        { isLoading && 
        <div className="inline-block h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading.</span>
        </div>
        }
        { isSuccess && items.length != 0 && !isLoading &&
        <>
          <FlashCard data={items[idx]}/>
          <div className="absolute bottom-12 flex gap-4">
            <button className="font-bold text-sm md:text-lg text-light-red bg-light-gray px-4 py-2 rounded-xl hover:scale-95 transition active:bg-opacity-50 shadow-xl" onClick={handleMiss}>Skip</button>
            <button className="font-bold text-sm md:text-lg text-light-green bg-light-gray px-4 py-2 rounded-xl hover:scale-95 transition active:bg-opacity-50 shadow-xl" onClick={handleNext}>Next word</button>
          </div>
          <Link href='/summary' className="absolute top-5 right-7 font-bold text-2xl opacity-70 text-light-cyan">X</Link>
        </>
        }
        
      </main>
  );
}
