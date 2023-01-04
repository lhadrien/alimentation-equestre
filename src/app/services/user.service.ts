import { Injectable } from '@angular/core';
import { Userlol } from "../entity/userlol";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Userlol | null = null;

  constructor() { }
}
