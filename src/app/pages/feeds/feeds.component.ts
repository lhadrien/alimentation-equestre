import { Component } from '@angular/core'
import { Feed } from '../../entity/feed'
import { FeedService } from '../../services/feed.service'
import { FeedDataSource } from './form-feed/feed-data-source'

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent {
  selectedFeed: Feed | undefined
  private displayNewFeed: boolean = false
  public feeds: Feed[]
  displayedColumns: string[] = ['name', 'brand', 'price', 'weight', 'ratio']
  feedsSource = new FeedDataSource([])

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

  deleteFeed(feed: Feed) {
    this.feedService.deleteFeed(feed).then()
    this.feeds = this.feeds.filter((f) => f.id !== feed.id)
    this.feedsSource.setData(this.feeds)
  }

  addFeedToList(feed: Feed) {
    this.displayNewFeed = false
    this.feeds.push(feed)
    this.feedsSource.setData(this.feeds)
  }

  feedSelected(id: string) {
    console.log('[feedSelected FeedsComponent] clicked on :' + id)
    this.selectedFeed = this.feeds.find((f) => f.id === id)
    console.log('[feedSelected FeedsComponent] clicked on', this.selectedFeed)
  }

  protected readonly Feed = Feed
}
