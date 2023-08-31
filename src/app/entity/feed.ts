import { v4 as uuidv4 } from 'uuid'

export type FeedUnit = 'kg' | 'L'

export type FeedType = {
  id: string
  name: string
  brand: string
  price: number
  weight: number
  ratio: number | null
  unit: FeedUnit
}

export type FeedList = { [key: string]: Feed }

export class Feed {
  public id: string
  public name: string
  public brand: string
  public price: number
  public weight: number
  public ratio: number | null
  public unit: FeedUnit

  constructor(feed: Partial<FeedType>) {
    this.id = feed.id ?? uuidv4()
    this.name = feed.name ?? ''
    this.brand = feed.brand ?? ''
    this.price = feed.price ?? 0
    this.weight = feed.weight ?? 0
    this.ratio = feed.ratio ?? null
    this.unit = feed.unit ?? 'kg'
  }

  toFirestore(): FeedType {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      price: this.price,
      weight: this.weight,
      ratio: this.ratio,
      unit: this.unit,
    }
  }
}
