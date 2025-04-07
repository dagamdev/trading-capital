import { create } from 'zustand'

interface ResultsStore {
  results: number[]
}

interface ResultsActions {
  addOperation: (result: 1 | 0) => void
  removeOperation: (index: number) => void
}

export const useResultsStore = create<ResultsStore & ResultsActions>()((set) => ({
  results: [],
  addOperation(result) {
    set((state) => ({
      results: [...state.results, result]
    }))
  },
  removeOperation(index) {
    set(state => ({
      results: state.results.filter((_, i) => i !== index)
    }))
  }
}))
