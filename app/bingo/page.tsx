'use client';
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Bingo() {
  const [bingos, setBingos] = useState<number[]>([]);
  const [bingo, setBingo] = useState(null);
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

  return (
    <div className="flex flex-col bg-zinc-950 h-screen justify-center items-center space-y-12">
      <div className="text-zinc-100 grid grid-cols-15 gap-2">
        {numbers.map((number, index) => 
          <div 
        key={index} 
        className={`p-8 text-2xl size-24 rounded ${bingos.includes(number) ? 'bg-green-500' : 'bg-zinc-900'}`}
          >
        {number}
          </div>
        )}
      </div>
      <div className="text-zinc-100 text-5xl p-8 bg-zinc-900 font-bold rounded">
        {bingo !== null ? bingo : 'XX'}
      </div>
      <div>
        <Button onClick={() => { fetchData(); }} disabled={loading} className="rounded-full bg-indigo-500 size-32 text-2xl font-bold uppercase">
          {loading && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          ) ? '' : 'Bingo'}
        </Button>
      </div>
    </div>
  );
}
