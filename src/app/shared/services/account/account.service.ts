import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../../interface/account/account.interface';
import { IChangePassword } from '../../interface/account/changePassword.interface';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp } from '@angular/fire/app';
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isUserLogin$ = new Subject<boolean>;

  private url = environment.BACKEND_URL;
  private api = { auth: `${this.url}/auth` };
  private static http: HttpClient;
  private static api: { auth: string };

  private authCollection!: CollectionReference<DocumentData>;
  
  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) {
    this.authCollection = collection(this.afs, 'auth');
   }

  login(credential: ILogin): Observable<any> {
    return this.http.get(`${this.api.auth}?email=${credential.email}&password${credential.password}`)
  }
  changePass(credential: IChangePassword): Observable<any> {
    return this.http.get(`${this.api.auth}?password${credential.password}`)
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

  // changePassFirebase(credential: IChangePassword, id: string){
  //   return this.http.get(`${this.api.auth}?password${credential.password}`)
  // }

  //   changePassFirebase(credential: IChangePassword) {
  //   const authDocumentReference = doc(this.afs, `auth/${id}`);
  //   return updateDoc(authDocumentReference, { ...credential });
  // }

  changePassFirebase(credential: IChangePassword) {
    const cpUser = firebase.auth().currentUser; 
      cpUser.updatePassword(credential.password).then(function() {
      console.log('succcess!')
    }).catch(function(error) {
      alert(error)
    });
  }

  static getDataFirebase(): Observable<any> {
    return this.http.get(`${this.api.auth}?email='email'&password='password'`)
  }
}
