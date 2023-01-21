import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore'
import { Food } from '../entity/food'

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private userService: UserService, private afs: Firestore) {}

  async saveFood(food: Food): Promise<boolean> {
    console.log('[saveFood] Saving food...', food)
    if (food !== null && this.userService.idUser !== null) {
      try {
        await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
          ['foods.' + food.id]: food.toFirestore(),
        })
        return true
      } catch (error) {
        console.log('Error : failed to save to Firebase')
        console.error(error)
      }
    }
    return false
  }
}
