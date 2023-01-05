export type HorseState = 1 | 2 | 3 | 4 | 5;
export type HorseActivity = 'Lawnmower' | 'Work a little' | 'Work a lot';

export type HorseType = {
  name: string;
  weight: number | null;
  height: number | null;
  race: string | null;
  state: HorseState;
  activity: HorseActivity;
  age: number | null;
}

export class Horse {
  public name: string;
  public weight: number | null;
  public height: number | null;
  public race: string;
  public state: HorseState;
  public activity: HorseActivity;
  public age: number | null;

  constructor(horse: Partial<HorseType>) {
    this.name = horse.name ?? '';
    this.weight = horse.weight ?? null;
    this.height = horse.height ?? null;
    this.race = horse.race ?? '';
    this.state = horse.state ?? 3;
    this.activity = horse.activity ?? 'Lawnmower';
    this.age = horse.age ?? null;
  }
}
