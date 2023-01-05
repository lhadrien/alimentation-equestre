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

  constructor(
    private afs: Firestore
  ) { }

  async getFirebaseUser(uid: string) {
    if (this.user !== null) {
      const data: DocumentSnapshot<any> = await getDoc(doc(this.afs, this.user.user.uid));
      if (data.exists()) {
        const user = data.data();
        this.setUser(user);
      }
    }
  }

  async saveFirebaseUser(uid: string, user: LoggedUser) {
    if (this.user !== null) {
      await setDoc(doc(collection(this.afs, 'users'), this.user.user.uid), user);
    }
  }

  setUser(user: LoggedUser) {
    this.loggedUser = user;
  }

  getUser(): LoggedUser | null {
    return this.loggedUser;
  }
}
