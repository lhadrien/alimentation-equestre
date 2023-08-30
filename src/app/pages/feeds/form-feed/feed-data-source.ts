import { DataSource } from '@angular/cdk/collections'
import { Feed } from '../../../entity/feed'
import { Observable, ReplaySubject } from 'rxjs'

export class FeedDataSource extends DataSource<Feed> {
  private _dataStream = new ReplaySubject<Feed[]>()

  constructor(initialData: Feed[]) {
    super()
    this.setData(initialData)
  }

  connect(): Observable<Feed[]> {
    return this._dataStream
  }

  disconnect() {}

  setData(data: Feed[]) {
    this._dataStream.next(data)
  }
}
