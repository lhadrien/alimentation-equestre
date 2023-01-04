import { User } from "@angular/fire/auth";

type FirebaseUser = User

export class Userlol {
  email: string | null = null;
  uid: string | null;

  constructor(props: User) {
    this.uid = props.uid;
    this.email = props.email;
  }

}
