import { DataSource } from '@angular/cdk/collections'
import { Feed, FeedList } from '../../entity/feed'
import { Observable, ReplaySubject } from 'rxjs'

export class FeedDataSource extends DataSource<Feed> {
  private _dataStream = new ReplaySubject<Feed[]>()

  constructor(initialData: FeedList) {
    super()
    this.setData(initialData)
  }

  connect(): Observable<Feed[]> {
    return this._dataStream
  }

  disconnect() {}

  setData(data: FeedList) {
    this._dataStream.next(Object.values(data) as Feed[])
  }
}
