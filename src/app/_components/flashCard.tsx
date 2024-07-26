"use client";

import { useState } from "react";

export default function FlashCard(){
    const [frontSide, setFrontSide] = useState<boolean>(true);

    return ( // TODO add button to the card
        <div className="h-80 w-72 md:w-[28rem] [perspective:1000px] cursor-pointer" onClick={()=>{setFrontSide(!frontSide);}}>
            <div className={`relative h-full w-full bg-light-gray rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${!frontSide ? '[transform:rotateY(180deg)]' : ''}`}>
            <div className="absolute inset-0 px-10 py-10 text-light-cyan">
                <h1 className="font-bold text-xl md:font-extrabold md:text-2xl">hemorrhage</h1><span className="font-normal text-sm md:text-base">( noun, verb )</span>
            </div>
            <div className="absolute inset-0 h-full w-full rounded-xl bg-light-gray px-12 text-center text-grayish-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="flex min-h-full flex-col items-start py-10 gap-1">
                <h1 className="text-md md:text-xl font-bold">Meaning</h1>
                <p className="text-sm md:text-base text-left">a large flow of blood from a damaged blood vessel</p>
                <h1 className="text-md md:text-xl font-bold">Example</h1>
                <p className="text-sm md:text-base text-left">The car accident caused him to hemorrhage internally.</p>
                <div className="">button</div>
                </div>
            </div>
            </div>
        </div>
    )
}