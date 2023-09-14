import { Component } from '@angular/core'
import { Meal, MealList } from '../../entity/meal'
import { MealDataSource } from './meal-data-source'
import { MealService } from '../../services/meal.service'

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MealsComponent {
  selectedMeal: Meal | undefined
  private displayNewMeal: boolean = false
  public meals: MealList = {}
  displayedColumns: string[] = ['name']
  mealsSource = new MealDataSource({})

  constructor(private mealService: MealService) {
    this.meals = this.mealService.getMeals()
    this.mealsSource = new MealDataSource(this.meals)
    this.mealsSource.setData(this.meals)
  }

  addMeal(): void {
    if (this.displayNewMeal) {
      return
    }
    const meal: Meal = new Meal({})
    console.log(`[addMeal MealComponent]`, meal)
    this.displayNewMeal = true
    this.selectedMeal = meal
  }

  deleteMeal(meal: Meal): void {
    this.mealService.deleteMeal(meal).then()
    delete this.meals[meal.id]
    this.mealsSource.setData(this.meals)
    this.selectedMeal = undefined
  }

  addMealToList(meal: Meal): void {
    this.displayNewMeal = false
    this.meals[meal.id] = meal
    this.mealsSource.setData(this.meals)
  }

  mealSelected(id: string): void {
    console.log('[mealSelected MealsComponent] clicked on :' + id)
    this.selectedMeal = this.meals[id]
    console.log('[mealSelected MealsComponent] clicked on', this.selectedMeal)
  }

  hasMeals(): boolean {
    return Object.keys(this.meals).length > 0
  }
}
