import { Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { collection, doc, DocumentSnapshot, Firestore, getDoc, setDoc } from "@angular/fire/firestore";
import { Horse } from "../entity/horse";

export type LoggedUser = {
  name: string;
  email: string;
}

export type UserData = {
  horses: { [key: string]: Horse };
  menus: [];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserCredential | null = null;
  userData: UserData | null = null;
  private loggedUser: LoggedUser | null = null;
  idUser: string | null = null;

  constructor(
    private afs: Firestore
  ) { }

  async getFirebaseUser(uid: string) {
    if (this.user !== null) {
      this.idUser = uid;
      const data: DocumentSnapshot<any> = await getDoc(doc(collection(this.afs, 'users'), this.idUser));
      const dataUser: DocumentSnapshot<any> = await getDoc(doc(collection(this.afs, 'userdata'), this.idUser));
      if (data.exists()) {
        this.setUser(data.data());
      }
      if (dataUser.exists()) {
        this.setUserData(dataUser.data());
      }
    }
  }

  async saveFirebaseUser(uid: string, user: LoggedUser) {
    if (this.user !== null) {
      this.idUser = uid;
      await setDoc(doc(collection(this.afs, 'users'), uid), user);
      await setDoc(doc(collection(this.afs, 'userdata'), uid), {
        horses: {},
        menus: [],
      } as UserData);
    }
  }

  setUser(user: LoggedUser) {
    this.loggedUser = user;
  }

  getUser(): LoggedUser | null {
    return this.loggedUser;
  }

  setUserData(user: UserData) {
    this.userData = user;
  }

  getUserData(): UserData | null {
    return this.userData;
  }
}
