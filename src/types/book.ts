export interface IBook {
  id: string
  title: string,
  authors: string[]
  photoURL: string
  description?: string
  year?: number
  rating? : number
  ISBN?: string
}