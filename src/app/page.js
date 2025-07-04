"use client";

import Game from "@/components/Game";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [name, setName] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputBorderColor, setInputBorderColor] = useState("border-black");
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  const fetchName = async () => {
    const res = await fetch("/api/random-name");
    const data = await res.json();
    setName(data.name);
  };

  const checkNameSpelling = (e) => {
    const input = e.target.value;
    const inputLength = input.length;
    const isInputSpelledCorrectly =
      input.toLowerCase() === name.toLowerCase().slice(0, inputLength);

    setInputValue(input);
    changeInputBorderColor(inputLength, isInputSpelledCorrectly);

    if (inputLength === name.length && isInputSpelledCorrectly) {
      resetInput();
    }
  };

  const changeInputBorderColor = (inputLength, isInputSpelledCorrectly) => {
    if (inputLength === 0) {
      setInputBorderColor("border-black");
    } else if (isInputSpelledCorrectly) {
      setInputBorderColor("border-green-700");
    } else {
      setInputBorderColor("border-red-700");
    }
  };

  const resetInput = () => {
    setInputValue("");
    setInputBorderColor("border-black");
    setScore(score + 1);
    fetchName();
  };

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen w-[90%] max-w-2xl my-0 mx-auto font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full text-xl sm:text-3xl">
        {hasGameStarted ? (
          <Game
            name={name}
            inputValue={inputValue}
            inputBorderColor={inputBorderColor}
            setInputBorderColor={setInputBorderColor}
            score={score}
            timeRemaining={timeRemaining}
            setTimeRemaining={setTimeRemaining}
            checkNameSpelling={checkNameSpelling}
          />
        ) : (
          <button
            onClick={() => setHasGameStarted(true)}
            className="bg-blue-500 text-white text-3xl p-6 rounded-4xl cursor-pointer"
            disabled={!name}
          >
            {name ? "Start" : "Loading..."}
          </button>
        )}
      </main>
    </div>
  );
}

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
