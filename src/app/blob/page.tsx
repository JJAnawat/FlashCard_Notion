"use client";

import { useState, useEffect, Factory } from "react";
import FlashCard from "../_components/flashCard";

import { FlashCardData } from "~/interface";

import { api } from "~/trpc/react";
import { STATUS, STATUS_PROB } from "~/const";

export default function Home() {
  const { data, isLoading, isSuccess } = api.word.getAllWords.useQuery();
  const [items, setItems] = useState<FlashCardData[]>([]);
  const [idx, setIdx] = useState<number>(0);
  
  useEffect(() => {
    if (data && isSuccess) {
      let ret = [];
      for (const item of data) {
        // console.log(item);
        const statusIdx = STATUS.indexOf(item.properties.status);
        let prob = STATUS_PROB[statusIdx];
        if (prob === undefined) prob = 0;
        for (let i = 0; i < prob; i++) {
          ret.push(item);
        }
      }
      // console.log(ret);
      setItems(ret);
    }
  }, [data, isSuccess]);

  const handleNextButton = () => {
    let newIdx = Math.floor(Math.random() * items.length);
    while(items[idx]?.properties.word === items[newIdx]?.properties.word){
      newIdx = Math.floor(Math.random() * items.length);
    }
    console.log(items[idx]?.properties.word,items[newIdx]?.properties.word);

    setIdx(newIdx);
  };

  return (
      <main className="flex min-h-screen relative items-center justify-center bg-dark-gray">
        { isLoading && 
        <div className="inline-block h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading.</span>
        </div>
        }

        { isSuccess && items.length != 0 &&
        <>
          <FlashCard data={items[idx]}/>
          <button className="absolute bottom-12 font-bold text-sm md:text-lg text-light-cyan bg-light-gray px-4 py-2 rounded-xl hover:scale-95 transition active:bg-opacity-50" onClick={handleNextButton}>Next word</button>
        </>
        }
        
      </main>
  );
}
