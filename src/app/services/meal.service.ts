import { Injectable } from '@angular/core'
import { UserData, UserService } from './user.service'
import { collection, deleteField, doc, Firestore, updateDoc } from '@angular/fire/firestore'
import { Meal, MealList } from '../entity/menu'

@Injectable({
  providedIn: 'root',
})
export class MealService {
  constructor(private userService: UserService, private afs: Firestore) {}

  async saveMeal(meal: Meal): Promise<boolean> {
    console.log('[saveMeal MealService] Saving meal...', meal)
    if (meal !== null && this.userService.idUser !== null) {
      try {
        await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
          ['meals.' + meal.id]: meal.toFirestore(),
        })
        return true
      } catch (error) {
        console.log('Error : failed to save to Firebase')
        console.error(error)
      }
    }
    return false
  }

  async deleteMeal(meal: Meal) {
    if (meal !== null && this.userService.idUser !== null) {
      await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
        ['meals.' + meal.id]: deleteField(),
      })
    }
  }

  getMeals(): MealList {
    const user: UserData | null = this.userService.getUserData()
    let meals: MealList = {}
    if (user?.meals) {
      Object.keys(user.feeds).forEach((mealId) => {
        meals[mealId] = new Meal(user.feeds[mealId])
      })
    }

    return meals ?? {}
  }
}
