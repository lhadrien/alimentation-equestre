export type HorseState = 1 | 2 | 3 | 4 | 5;
export type HorseActivity = 'Retired' | 'Lawnmower' | 'Work a little' | 'Work a lot';

export type Horse = {
  name: string;
  weight: number;
  height: number;
  race: string | null;
  state: HorseState;
  activity: HorseActivity;
  age: number;
}
