declare interface Operation {
  id: string
  status: 'success' | 'pending' | 'failed'
  investment: number
  profit: number
  balance: number
}