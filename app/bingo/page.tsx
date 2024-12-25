"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Bingo() {
  const [bingos, setBingos] = useState<number[]>([]);
  const [bingo, setBingo] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:3090/api/bingo", {
          method: "GET",
        });
        const data = await response.json();
        if (data.bingo === null) {
          return;
        }
        setBingos(data.bingos);
        setBingo(data.bingo);
      } catch (error) {
        console.error("error fetching bingo data:", error);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setBingo(Math.floor(Math.random() * 75) + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const treePositions = [
    { top: "1%", left: "47%" },
    { top: "7%", left: "38%" },
    { top: "8%", left: "55%" },
    { top: "16%", left: "64%" },
    { top: "15%", left: "33%" },
    { top: "14%", left: "47%" },
    { top: "24%", left: "63%" },
    { top: "25%", left: "52%" },
    { top: "24%", left: "40%" },
    { top: "24%", left: "28%" },
    { top: "32%", left: "20%" },
    { top: "36%", left: "28%" },
    { top: "33%", left: "48%" },
    { top: "34%", left: "37%" },
    { top: "33%", left: "70%" },
    { top: "34%", left: "60%" },
    { top: "40%", left: "20%" },
    { top: "42%", left: "75%" },
    { top: "43%", left: "36%" },
    { top: "44%", left: "50%" },
    { top: "44%", left: "63%" },
    { top: "53%", left: "68%" },
    { top: "55%", left: "80%" },
    { top: "55%", left: "55%" },
    { top: "50%", left: "12%" },
    { top: "49%", left: "25%" },
    { top: "49%", left: "37%" },
    { top: "57%", left: "43%" },
    { top: "56%", left: "30%" },
    { top: "58%", left: "20%" },
    { top: "60%", left: "9%" },
    { top: "67%", left: "30%" },
    { top: "63%", left: "88%" },
    { top: "65%", left: "75%" },
    { top: "65%", left: "60%" },
    { top: "66%", left: "45%" },
    { top: "69%", left: "17%" },
    { top: "65%", left: "0%" },
    { top: "73%", left: "6%" },
    { top: "75%", left: "40%" },
    { top: "75%", left: "54%" },
    { top: "73%", left: "68%" },
    { top: "75%", left: "84%" },
    { top: "79%", left: "97%" },
    { top: "78%", left: "28%" },
    { top: "79%", left: "18%" },
    { top: "80%", left: "0%" },
    { top: "83%", left: "80%" },
    { top: "82%", left: "65%" },
    { top: "90%", left: "70%" },
    { top: "90%", left: "87%" },
    { top: "90%", left: "100%" },
    { top: "86%", left: "10%" },
    { top: "88%", left: "0%" },
    { top: "86%", left: "24%" },
    { top: "90%", left: "32%" },
    { top: "90%", left: "80%" },
    { top: "90%", left: "60%" },
    { top: "80%", left: "80%" },
    { top: "80%", left: "80%" },
    { top: "80%", left: "90%" },
    { top: "85%", left: "10%" },
    { top: "85%", left: "20%" },
    { top: "85%", left: "30%" },
    { top: "85%", left: "40%" },
    { top: "85%", left: "50%" },
    { top: "85%", left: "60%" },
    { top: "85%", left: "80%" },
    { top: "85%", left: "80%" },
    { top: "85%", left: "90%" },
    { top: "90%", left: "10%" },
    { top: "90%", left: "20%" },
    { top: "90%", left: "30%" },
    { top: "90%", left: "40%" },
    { top: "90%", left: "50%" },
    { top: "90%", left: "90%" },
    { top: "90%", left: "70%" },
    { top: "90%", left: "90%" },
    { top: "90%", left: "90%" },
  ];

  return (
    <div className="relative bg-zinc-950 h-screen w-full flex items-center justify-center  bg-[url('/images/bgs.jpg')] bg-cover bg-center bg-no-repeat p-10">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        {Array.from({ length: 100 }).map((_, index) => (
          <Image
            key={index}
            src="/images/snowpiece.png" // Replace with your snowflake image
            alt="Snowflake"
            width={20}
            height={20}
            className="absolute animate-snow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 3}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <Image
        src="/images/tre.png"
        alt="tree"
        width={1150}
        height={100}
        className="absolute mt-24"
      />
      <Image
        src="/images/gift5.png"
        alt="tree"
        width={400}
        height={400}
        className="absolute  left-[8%] top-[62%]"
      />
      <Image
        src="/images/gift3.png"
        alt="tree"
        width={300}
        height={300}
        className="absolute   left-[0%] top-[70%]"
      />
      <Image
        src="/images/gift4.png"
        alt="tree"
        width={300}
        height={300}
        className="absolute  left-[17%] top-[75%]"
      />

      <div className="relative w-full h-full max-w-screen-md bg">
        {bingos.map((num, index) => (
          <motion.div
            key={index}
            className="absolute text-xl rounded size-[70px] flex items-end  justify-center "
            initial={{
              opacity: 0,
              scale: 0.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              top: treePositions[index]?.top,
              left: treePositions[index]?.left,
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={`/images/${num}.png`}
              alt={`.`}
              width={200}
              height={200}
              className=""
            />
            <div className="absolute font-extrabold text-red bg-black text-zinc-100 rounded-full size-10 left-8 top-8 justify-center items-center flex z-10">
              {num}
            </div>
          </motion.div>
        ))}
      </div>
      <Image
        src="/images/gift1.png"
        alt="tree"
        width={400}
        height={400}
        className="absolute  right-[0%] top-[65%]"
      />
      <Image
        src="/images/gift2.png"
        alt="tree"
        width={300}
        height={300}
        className="absolute  right-[14%] top-[73%]"
      />
      <motion.div
        className="absolute bottom-10 text-black text-5xl p-8 bg-white font-bold rounded-full flex items-center justify-center h-32 w-32 border-[6px]  "
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.6 }}
        onClick={() => {
          fetchData();
        }}
      >
        <span> {bingo !== null ? bingo : "GO"}</span>
      </motion.div>
      <Image
        src="/images/white.png"
        alt="tree"
        width={150}
        height={150}
        className="absolute top-[88%] "
      />
    </div>
  );
}
