import { Injectable } from '@angular/core'
import { collection, deleteField, doc, Firestore, updateDoc } from '@angular/fire/firestore'
import { UserData, UserService } from './user.service'
import { Horse } from '../entity/horse'

@Injectable({
  providedIn: 'root',
})
export class HorseService {
  constructor(private userService: UserService, private afs: Firestore) {}

  async saveHorse(horse: Horse): Promise<boolean> {
    console.log('[saveHorse] Saving horse...', horse)
    if (horse !== null && this.userService.idUser !== null) {
      try {
        await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
          ['horses.' + horse.id]: horse.toFirestore(),
        })
        return true
      } catch (error) {
        console.log("Erreur lors de l'appel a Firebase")
        console.error(error)
      }
    } else {
      console.log('on fait rien car this.userService.idUer est vide', this.userService.idUser)
    }
    return false
  }

  async deleteHorse(horse: Horse) {
    if (horse !== null && this.userService.idUser !== null) {
      await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
        ['horses.' + horse.id]: deleteField(),
      })
    }
  }

  getHorses(): { [key: string]: Horse } {
    const user: UserData | null = this.userService.getUserData()
    let horses: { [key: string]: Horse } = {}
    if (user && user.horses) {
      Object.keys(user.horses).forEach((horseId) => {
        horses[horseId] = new Horse(user.horses[horseId])
      })
    }

    return horses ?? {}
  }
}
