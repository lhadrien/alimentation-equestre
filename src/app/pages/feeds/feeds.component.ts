import { Component } from '@angular/core'
import { Feed } from '../../entity/feed'
import { FeedService } from '../../services/feed.service'

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent {
  selectedFeed: Feed | undefined
  private displayNewFeed: boolean = false
  public feeds: { [key: string]: Feed }

  constructor(private feedService: FeedService) {
    this.feeds = this.feedService.getFeeds()
  }

  addFeed(): void {
    if (this.displayNewFeed) {
      return
    }
    const feed: Feed = new Feed({})
    this.feeds[feed.id] = feed
    this.displayNewFeed = true
    this.selectedFeed = feed
  }
}
