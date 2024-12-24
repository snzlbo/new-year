'use client';
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

export default function Bingo() {
  const [bingos, setBingos] = useState<number[]>([]);
  const [bingo, setBingo] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

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
    }, 500)
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
    { top: '10%', left: '50%' },
    { top: '15%', left: '40%' },
    { top: '15%', left: '50%' },
    { top: '15%', left: '60%' },
    { top: '20%', left: '30%' },
    { top: '20%', left: '40%' },
    { top: '20%', left: '50%' },
    { top: '20%', left: '60%' },
    { top: '20%', left: '70%' },
    { top: '25%', left: '20%' },
    { top: '25%', left: '30%' },
    { top: '25%', left: '40%' },
    { top: '25%', left: '50%' },
    { top: '25%', left: '60%' },
    { top: '25%', left: '70%' },
    { top: '25%', left: '80%' },
    { top: '30%', left: '10%' },
    { top: '30%', left: '20%' },
    { top: '30%', left: '30%' },
    { top: '30%', left: '40%' },
    { top: '30%', left: '50%' },
    { top: '30%', left: '60%' },
    { top: '30%', left: '70%' },
    { top: '30%', left: '80%' },
    { top: '30%', left: '90%' },
    { top: '35%', left: '10%' },
    { top: '35%', left: '20%' },
    { top: '35%', left: '30%' },
    { top: '35%', left: '40%' },
    { top: '35%', left: '50%' },
    { top: '35%', left: '60%' },
    { top: '35%', left: '70%' },
    { top: '35%', left: '80%' },
    { top: '35%', left: '90%' },
    { top: '40%', left: '10%' },
    { top: '40%', left: '20%' },
    { top: '40%', left: '30%' },
    { top: '40%', left: '40%' },
    { top: '40%', left: '50%' },
    { top: '40%', left: '60%' },
    { top: '40%', left: '70%' },
    { top: '40%', left: '80%' },
    { top: '40%', left: '90%' },
    { top: '45%', left: '10%' },
    { top: '45%', left: '20%' },
    { top: '45%', left: '30%' },
    { top: '45%', left: '40%' },
    { top: '45%', left: '50%' },
    { top: '45%', left: '60%' },
    { top: '45%', left: '70%' },
    { top: '45%', left: '80%' },
    { top: '45%', left: '90%' },
    { top: '50%', left: '10%' },
    { top: '50%', left: '20%' },
    { top: '50%', left: '30%' },
    { top: '50%', left: '40%' },
    { top: '50%', left: '50%' },
    { top: '50%', left: '60%' },
    { top: '50%', left: '70%' },
    { top: '50%', left: '80%' },
    { top: '50%', left: '90%' },
    { top: '55%', left: '10%' },
    { top: '55%', left: '20%' },
    { top: '55%', left: '30%' },
    { top: '55%', left: '40%' },
    { top: '55%', left: '50%' },
    { top: '55%', left: '60%' },
    { top: '55%', left: '70%' },
    { top: '55%', left: '80%' },
    { top: '55%', left: '90%' },
    { top: '60%', left: '10%' },
    { top: '60%', left: '20%' },
    { top: '60%', left: '30%' },
    { top: '60%', left: '40%' },
    { top: '60%', left: '50%' },
    { top: '60%', left: '60%' },
    { top: '60%', left: '70%' },
    { top: '60%', left: '80%' },
    { top: '60%', left: '90%' },
  ];

  return (
    <div className="relative bg-zinc-950 h-screen w-full flex flex-col items-center justify-center">
      <div className="relative w-full h-full max-w-screen-md">
        {bingos.map((num, index) => (
            <motion.div 
            key={index} 
            className="absolute bg-zinc-800 text-zinc-100 text-xl p-4 rounded size-16 flex items-center justify-center"
            initial={{ 
              opacity: 0, 
              scale: 0.5, 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              top: treePositions[index]?.top, 
              left: treePositions[index]?.left 
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            {num}
            </motion.div>
        ))}
      </div>
      <motion.div 
        className="absolute bottom-10 text-zinc-100 text-5xl p-8 bg-zinc-900 font-bold rounded size-32 flex items-center justify-center"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.5 }}
        onClick={() => { fetchData(); }}
      >
        {bingo !== null ? bingo : 'GO!'}
      </motion.div>
    </div>
  );
}
