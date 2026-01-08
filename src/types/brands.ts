export type brand = {
  id: string
  name: string
  image: string | null
}

type brandsState = {
  data: brand[]
  loading: boolean
}