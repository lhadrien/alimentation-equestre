import { Injectable } from '@angular/core'
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth'
import { collection, doc, DocumentSnapshot, Firestore, getDoc, setDoc } from '@angular/fire/firestore'
import { HorseList } from '../entity/horse'
import { ActivatedRoute, Router } from '@angular/router'
import { FeedList } from '../entity/feed'
import { MealList } from '../entity/meal'

export type LoggedUser = {
  name: string
  email: string
}

export type UserData = {
  horses: HorseList
  feeds: FeedList
  meals: MealList
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: UserData | null = null
  idUser: string | null = null
  private displayName: string = ''
  private email: string = ''

  constructor(private afs: Firestore, private router: Router, private route: ActivatedRoute) {
    this.checkLocalAuthState() // Check local authentication state upon service initialization

    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.saveLocalAuthState(user.uid)
        this.idUser = user.uid
        this.getFirebaseUser(user.uid).then(() => {
          console.log('[onAuthStateChanged] Get User firebase done')
        })
        this.email = user.email ?? ''
        this.displayName = user.displayName ?? ''
      } else {
        console.log('[onAuthStateChanged] Disconnected')
        this.clearLocalAuthState()
        this.idUser = null
        this.displayName = ''
        this.email = ''
      }
    })
    const user = auth.currentUser
    if (user !== null) {
      console.log('[UserService startup] Is already connected')
      this.displayName = user.displayName ?? ''
      this.email = user.email ?? ''

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
    console.log('[saveFirebaseUser] Start saving')
    if (uid !== null) {
      this.idUser = uid
      await setDoc(doc(collection(this.afs, 'users'), uid), user)
      await setDoc(doc(collection(this.afs, 'userdata'), uid), {
        user: user,
        horses: {},
        feeds: {},
        meals: {},
      } as UserData)
      console.log('[saveFirebaseUser] Saved Firebase user')
    } else {
      console.warn('[saveFirebaseUser] Could not save FirebaseUser, no uid')
    }
  }

  saveLocalAuthState(uid: string) {
    this.setCookie('userValue', uid, 1)
  }

  checkLocalAuthState() {
    const uid = this.getCookie('userValue')
    const isAuthenticated = !!uid
    if (isAuthenticated) {
      this.idUser = uid
      // If local auth state exists, consider the user as logged in
      // You may want to adjust this logic to better fit your app's flow
      console.log('[UserService] User is considered authenticated locally')
      // Optionally, redirect the user to the dashboard or another route
      // this.router.navigate(['/dashboard']);
    }
  }

  clearLocalAuthState() {
    this.setCookie('userValue', '', -1)
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

  setCookie(name: string, value: string, days: number) {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }

  getCookie(name: string): string {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return ''
  }

  async signOut(): Promise<void> {
    try {
      const auth = getAuth()
      await auth.signOut()
      console.log('[signOut] Sign out done')
    } catch (error) {
      console.log('[signOut] Error while sign out from Firebase')
      console.warn(error)
    }
  }

  async signUp(email: string, password: string, name: string) {
    try {
      const auth = getAuth()
      await auth.setPersistence(browserLocalPersistence)
      const user: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('[createUserWithEmailAndPassword] Signed Up user')
      await this.saveFirebaseUser(user.user.uid, {
        name: name,
        email: email,
      })
      console.log('[saveFirebaseUser] User saved')
    } catch (error: any) {
      console.log(error.code)
      console.log(error.message)
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
