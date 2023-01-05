import { Injectable } from '@angular/core';
import { arrayUnion, collection, doc, Firestore, setDoc, updateDoc } from "@angular/fire/firestore";
import { UserService } from "./user.service";
import { Horse } from "../entity/horse";

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  constructor(private userService: UserService, private afs: Firestore) { }

  async saveHorse(horse: Horse) {
    if (horse !== null && this.userService.idUser !== null) {
      await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
        horses: arrayUnion(horse)
      });
    }
  }
}
