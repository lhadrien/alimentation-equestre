import { Component } from '@angular/core'
import { Feed } from '../../entity/feed'
import { FeedService } from '../../services/feed.service'
import { FeedDataSource } from './feed-data-source'

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent {
  selectedFeed: Feed | undefined
  private displayNewFeed: boolean = false
  public feeds: { [key: string]: Feed } = {}
  displayedColumns: string[] = ['name', 'brand', 'price', 'weight', 'unit', 'ratio']
  feedsSource = new FeedDataSource({})

  constructor(private feedService: FeedService) {
    this.feeds = this.feedService.getFeeds()
    this.feedsSource = new FeedDataSource(this.feeds)
    this.feedsSource.setData(this.feeds)
  }

  addFeed(): void {
    if (this.displayNewFeed) {
      return
    }
    const feed: Feed = new Feed({})
    console.log(`[addFeed FeedComponent]`, feed)
    this.displayNewFeed = true
    this.selectedFeed = feed
  }

  deleteFeed(feed: Feed): void {
    this.feedService.deleteFeed(feed).then()
    delete this.feeds[feed.id]
    this.feedsSource.setData(this.feeds)
    this.selectedFeed = undefined
  }

  addFeedToList(feed: Feed): void {
    this.displayNewFeed = false
    this.feeds[feed.id] = feed
    this.feedsSource.setData(this.feeds)
  }

  feedSelected(id: string): void {
    console.log('[feedSelected FeedsComponent] clicked on :' + id)
    this.selectedFeed = this.feeds[id]
    console.log('[feedSelected FeedsComponent] clicked on', this.selectedFeed)
  }

  hasFeeds(): boolean {
    return Object.keys(this.feeds).length > 0
  }
}
