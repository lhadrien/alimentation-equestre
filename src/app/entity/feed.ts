import { v4 as uuidv4 } from 'uuid'

export type FoodType = {
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

  constructor(food: Partial<FoodType>) {
    this.id = food.id ?? uuidv4()
    this.name = food.name ?? ''
    this.brand = food.brand ?? ''
    this.price = food.price ?? 0
    this.weight = food.weight ?? 0
    this.ratio = food.ratio ?? 0
  }

  toFirestore(): FoodType {
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
