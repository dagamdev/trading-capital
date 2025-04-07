export function generateMatris (wins: number, total: number, profit: number) {
  const matris: number[][] = [[]]

  for (let col=0; col<wins; col++) {
    const cellValue = getCellValue(wins, total, col, 0)
    matris[0][col] = cellValue
  }  

  return matris

  function getCellValue (wins: number, total: number, x: number, y: number): number {
    if (x === wins) return 1
    const value = matris[y]?.[x]
    if (value) {
      return value
    }

    if (wins - x === total - y) {
      return profit**(total-y)
    } else {
      const nextRow = getCellValue(wins, total, x, y+1)
      const nextRowTwo = getCellValue(wins, total, x+1, y+1)

      if (matris[y+1]) {
        matris[y+1][x] = nextRow
      } else {
        matris[y+1] = []
        matris[y+1][x] = nextRow
      }
      
      if (matris[y+1].length < wins && wins-1 >= x+1) {
        matris[y+1][x+1] = nextRowTwo
      }

      return +(profit * (nextRow || 1) * nextRowTwo / (nextRow + (profit - 1) * nextRowTwo)).toFixed(9)
    }
  }
}