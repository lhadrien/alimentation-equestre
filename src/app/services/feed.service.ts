import { Injectable } from '@angular/core'
import { UserData, UserService } from './user.service'
import { collection, deleteField, doc, Firestore, updateDoc } from '@angular/fire/firestore'
import { Feed, FeedList } from '../entity/feed'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private userService: UserService, private afs: Firestore) {}

  async saveFeed(feed: Feed): Promise<boolean> {
    console.log('[saveFeed FeedService] Saving feed...', feed)
    if (feed !== null && this.userService.idUser !== null) {
      try {
        await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
          ['feeds.' + feed.id]: feed.toFirestore(),
        })
        return true
      } catch (error) {
        console.log('Error : failed to save to Firebase')
        console.error(error)
      }
    }
    return false
  }

  async deleteFeed(feed: Feed) {
    if (feed !== null && this.userService.idUser !== null) {
      await updateDoc(doc(collection(this.afs, 'userdata'), this.userService.idUser), {
        ['feeds.' + feed.id]: deleteField(),
      })
    }
  }

  getFeeds(): FeedList {
    const user: UserData | null = this.userService.getUserData()
    let feeds: { [key: string]: Feed } = {}
    if (user?.feeds) {
      Object.keys(user.feeds).forEach((feedId) => {
        feeds[feedId] = new Feed(user.feeds[feedId])
      })
    }

    return feeds ?? {}
  }
}
