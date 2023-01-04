import { Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserCredential | null = null;
  private name: string | null = null;
  private email: string | null = null;

  constructor() { }

  setName(value: string | null) {
    this.name = value;
  }

  setEmail(value: string | null) {
    this.email = value;
  }
}
