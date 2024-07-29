"use client";

import { useEffect, useState } from "react";

import type { FlashCardData } from "~/interface";
import HighlightedText from "./highlightText";

export default function FlashCard({data} : {data:FlashCardData | undefined}){
    const [frontSide, setFrontSide] = useState<boolean>(true);

    useEffect(()=>{
        setFrontSide(true);
    },[data]);

    // const selectItems = data?.properties.select?.map((item) => " " + item.toLowerCase()) ?? [];

    return (
        <div className="h-80 w-72 md:w-[28rem] [perspective:1000px]" onClick={()=>{setFrontSide(!frontSide);}}>
            <div className={`relative h-full w-full bg-light-gray rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${!frontSide ? '[transform:rotateY(180deg)]' : ''}`}>
                <div className="absolute inset-0 px-10 py-10 text-light-cyan">
                    <h1 className="font-bold text-xl md:font-extrabold md:text-2xl">{data?.properties.word}</h1>
                    <span className="font-normal text-sm md:text-base">{`( ${data?.properties.pos.toLowerCase() } )`}</span>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-light-gray px-12 text-center text-grayish-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex min-h-full flex-col items-start py-10 gap-1">
                        <h1 className="text-md md:text-xl font-bold">Meaning</h1>
                        <p className="text-sm md:text-base text-left">{data?.properties.meaning}</p>
                        <h1 className="text-md md:text-xl font-bold mt-2">Example</h1>
                        <p className="text-sm md:text-base text-left">
                            <HighlightedText word={data?.properties.word} sentence={data?.properties.example} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}