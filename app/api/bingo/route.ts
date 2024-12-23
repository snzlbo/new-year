const bingos: number[] = []

export async function GET() {
  if (bingos.length === 75) {
    return new Response(JSON.stringify({ bingo: null }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const min = 1
  const max = 75
  let bingo = arbitraryRandom(min, max)
  
  while (bingos.includes(bingo)) {
    bingo = arbitraryRandom(min, max)
  }
  
  bingos.push(bingo)
  return new Response(JSON.stringify({ bingo: bingo, bingos: bingos }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

function arbitraryRandom(min: number, max: number) {
  const arbitrary_random = Math.random() * (max - min + 1) + min
  return Math.floor(arbitrary_random)
}
