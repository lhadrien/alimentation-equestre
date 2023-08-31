import { DataSource } from '@angular/cdk/collections'
import { Observable, ReplaySubject } from 'rxjs'
import { Meal, MealList } from '../../entity/meal'

export class MealDataSource extends DataSource<Meal> {
  private _dataStream = new ReplaySubject<Meal[]>()

  constructor(initialData: MealList) {
    super()
    this.setData(initialData)
  }

  connect(): Observable<Meal[]> {
    return this._dataStream
  }

  disconnect() {}

  setData(data: MealList) {
    this._dataStream.next(Object.values(data))
  }
}
