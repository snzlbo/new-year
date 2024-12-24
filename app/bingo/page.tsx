'use client';
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

export default function Bingo() {
  const [bingos, setBingos] = useState<number[]>([]);
  const [bingo, setBingo] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);

  const fetchData = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:3090/api/bingo', {
          method: 'GET',
        });
        const data = await response.json();
        if (data.bingo === null) {
          return;
        }
        setBingos(data.bingos);
        setBingo(data.bingo);
      } catch (error) {
        console.error('error fetching bingo data:', error);
      } finally {
        setLoading(false);
      }
    }, 3000)
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setBingo(Math.floor(Math.random() * 75) + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="flex flex-col bg-zinc-950 h-screen justify-center items-center space-y-12">
      <div className="text-zinc-100 grid grid-cols-15 gap-2">
        {numbers.map((number, index) => 
          <div 
            key={index} 
            className={`p-8 text-2xl size-24 text-center rounded ${bingos.includes(number) ? 'bg-green-500' : 'bg-zinc-900'}`}
          >
            {number}
          </div>
        )}
      </div>
      <motion.div 
        className="text-zinc-100 text-5xl p-8 bg-zinc-900 font-bold rounded"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.5 }}
        onClick={() => { fetchData(); }}
      >
        {bingo !== null ? bingo : 'GO!'}
      </motion.div>
    </div>
  );
}
