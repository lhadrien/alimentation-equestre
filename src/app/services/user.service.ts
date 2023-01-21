import { Injectable } from '@angular/core'
import { browserLocalPersistence, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth'
import { collection, doc, DocumentSnapshot, Firestore, getDoc, setDoc } from '@angular/fire/firestore'
import { Horse } from '../entity/horse'

export type LoggedUser = {
  name: string
  email: string
}

export type UserData = {
  horses: { [key: string]: Horse }
  menus: []
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: UserData | null = null
  idUser: string | null = null
  private displayName: string = ''
  private email: string = ''

  constructor(private afs: Firestore) {
    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.idUser = user.uid
        this.getFirebaseUser(user.uid).then(() => {
          console.log('[onAuthStateChanged] Get User firebase done')
        })
        this.email = user.email || ''
        this.displayName = user.displayName || ''
      } else {
        console.log('[onAuthStateChanged] Disconnected')
        this.idUser = null
      }
    })
    const user = auth.currentUser
    if (user !== null) {
      console.log('[UserService startup] Is already connected')
      this.displayName = user.displayName || ''
      this.email = user.email || ''

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      this.idUser = user.uid
    }
  }

  async getFirebaseUser(uid: string) {
    console.log('[getFirebaseUser] Start getting firebase user : ' + uid)
    if (uid !== null) {
      this.idUser = uid
      const dataUser: DocumentSnapshot<any> = await getDoc(doc(collection(this.afs, 'userdata'), this.idUser))
      if (dataUser.exists()) {
        console.log('[getFirebaseUser] Got user, now saving')
        this.setUserData(dataUser.data())
      } else {
        console.warn('[getFirebaseUser] Got no user finally')
      }
    }
  }

  async saveFirebaseUser(uid: string, user: LoggedUser) {
    if (uid !== null) {
      this.idUser = uid
      await setDoc(doc(collection(this.afs, 'users'), uid), user)
      await setDoc(doc(collection(this.afs, 'userdata'), uid), {
        horses: {},
        menus: [],
      } as UserData)
      console.log('[saveFirebaseUser] Saved Firebase user')
    } else {
      console.warn('[saveFirebaseUser] Could not save FirebaseUser, no uid')
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const auth = getAuth()
      await auth.setPersistence(browserLocalPersistence)
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log('[signIn] Sign in done')
    } catch (error) {
      console.log('[signIn] Error while sign in to Firebase')
      console.warn(error)
    }
  }

  setUserData(user: UserData) {
    this.userData = user
  }

  getUserData(): UserData | null {
    return this.userData
  }

  getName(): string {
    return this.displayName
  }
}
