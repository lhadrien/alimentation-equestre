import { Injectable } from '@angular/core';
import { collection, deleteField, doc, Firestore, updateDoc } from "@angular/fire/firestore";
import { UserData, UserService } from "./user.service";
import { Horse } from "../entity/horse";

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  constructor(private userService: UserService, private afs: Firestore) { }

  async saveHorse(horse: Horse) {
    if (horse !== null && this.userService.idUser !== null) {
      await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
        ['horses.' + horse.id]: horse
      });
    }
  }

  async deleteHorse(horse: Horse) {
    if (horse !== null && this.userService.idUser !== null) {
      await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
        ['horses.' + horse.id]: deleteField()
      });
    }
  }

  getHorses(): { [key: string]: Horse } {
    const user: UserData | null = this.userService.getUserData();
    return user?.horses ?? {};
  }
}
