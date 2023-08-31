import { v4 as uuidv4 } from 'uuid'
import { Feed } from './feed'

export type MealType = {
  id: string
  name: string
  feedComponents: FeedComponent[]
}

export interface FeedComponent {
  quantity: number
  feed: Feed
}

export type MealList = { [key: string]: Meal }

export class Meal {
  public id: string
  public name: string
  feedComponents: FeedComponent[]

  constructor(meal: Partial<MealType>) {
    this.id = meal.id ?? uuidv4()
    this.name = meal.name ?? ''
    this.feedComponents = meal.feedComponents ?? []
  }

  toFirestore(): MealType {
    return {
      id: this.id,
      name: this.name,
      feedComponents: this.feedComponents,
    }
  }
}
