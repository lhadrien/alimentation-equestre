import { Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { collection, doc, DocumentSnapshot, Firestore, getDoc, setDoc } from "@angular/fire/firestore";

export type LoggedUser = {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserCredential | null = null;
  private loggedUser: LoggedUser | null = null;
  idUser: string | null = null;

  constructor(
    private afs: Firestore
  ) { }

  async getFirebaseUser(uid: string) {
    if (this.user !== null) {
      this.idUser = uid;
      const data: DocumentSnapshot<any> = await getDoc(doc(this.afs, this.idUser));
      if (data.exists()) {
        const user = data.data();
        this.setUser(user);
      }
    }
  }

  async saveFirebaseUser(uid: string, user: LoggedUser) {
    if (this.user !== null) {
      this.idUser = uid;
      await setDoc(doc(collection(this.afs, 'users'), uid), user);
      await setDoc(doc(collection(this.afs, 'userdata'), uid), {
        horses: [],
        menus: [],
      });
    }
  }

  setUser(user: LoggedUser) {
    this.loggedUser = user;
  }

  getUser(): LoggedUser | null {
    return this.loggedUser;
  }
}
