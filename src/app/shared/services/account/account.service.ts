import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collection, CollectionReference, doc, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ILogin } from '../../interface/account/account.interface';
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isUserLogin$ = new Subject<boolean>;

  private static http: HttpClient;
  private static api: { auth: string };

  private authCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore,
  ) {
    this.authCollection = collection(this.afs, 'users');
  }

  static getData(): Observable<any> {
    return this.http.get(`${this.api.auth}?email='email'&password='password'`)
  }

  loginFirebase(credential: ILogin) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, credential.email, credential.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  updateUserFirebase(user: User, id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return updateDoc(userDocumentReference, { ...user });
  }

}
