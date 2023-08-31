import { v4 as uuidv4 } from 'uuid'

export type HorseState = 1 | 2 | 3 | 4 | 5
export type HorseActivity = 'Lawnmower' | 'Work a little' | 'Work a lot'

export type HorseType = {
  id: string
  name: string
  weight: number | null
  height: number | null
  race: string | null
  state: HorseState
  activity: HorseActivity
  age: number | null
}

export type HorseList = { [key: string]: Horse }

export function convertToHorseActivity(value: number | string): HorseActivity {
  switch (value) {
    case 1:
    case 'Lawnmower':
    case 'Tondeuse':
      return 'Lawnmower'
    case 2:
    case 'Work a little':
    case 'Peu':
      return 'Work a little'
    case 3:
    case 'Work a lot':
    case 'Beaucoup':
      return 'Work a lot'
    default:
      return 'Lawnmower'
  }
}

export function convertToHorseState(value: number | string): HorseState {
  if (Number.isInteger(value) && value >= 1 && value <= 5) {
    return value as HorseState
  }
  switch (value) {
    case 'Très maigre':
      return 1
    case 'Maigre':
      return 2
    case 'Normal':
      return 3
    case 'Gras':
      return 4
    case 'Obèse':
      return 5
    default:
      return 3
  }
}

export class Horse {
  public name: string
  public weight: number | null
  public height: number | null
  public race: string
  public state: HorseState
  public activity: HorseActivity
  public age: number | null
  public id: string

  constructor(horse: Partial<HorseType>) {
    this.id = horse.id ?? uuidv4()
    this.name = horse.name ?? ''
    this.weight = horse.weight ?? null
    this.height = horse.height ?? null
    this.race = horse.race ?? ''
    this.state = horse.state ?? 3
    this.activity = horse.activity ?? 'Lawnmower'
    this.age = horse.age ?? null
  }

  toFirestore(): HorseType {
    return {
      id: this.id,
      name: this.name,
      weight: this.weight,
      height: this.height,
      race: this.race,
      state: this.state,
      activity: this.activity,
      age: this.age,
    }
  }
}
