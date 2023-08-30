import { v4 as uuidv4 } from 'uuid'

export type FeedType = {
  id: string
  name: string
  brand: string
  price: number
  weight: number
  ratio: number
}

export class Feed {
  public id: string
  public name: string
  public brand: string
  public price: number
  public weight: number
  public ratio: number

  constructor(feed: Partial<FeedType>) {
    this.id = feed.id ?? uuidv4()
    this.name = feed.name ?? ''
    this.brand = feed.brand ?? ''
    this.price = feed.price ?? 0
    this.weight = feed.weight ?? 0
    this.ratio = feed.ratio ?? 0
  }

  toFirestore(): FeedType {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      price: this.price,
      weight: this.weight,
      ratio: this.ratio,
    }
  }
}
