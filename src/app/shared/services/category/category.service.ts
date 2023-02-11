import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, DocumentData } from '@firebase/firestore';
import { environment } from 'src/environments/environment';
import { ICategoryRequest, ICategoryResponse } from '../../interface/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection!: CollectionReference<DocumentData>;
  private url = environment.BACKEND_URL;
  private api = { category: `${this.url}/category` }

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'category');
  }

  getAll(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.api.category)
  }

  getOne(id: number): Observable<ICategoryResponse> {
    return this.http.get<ICategoryResponse>(`${this.api.category}/${id}`)
  }

  create(category: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(this.api.category, category)
  }

  update(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${this.api.category}/${id}`, category)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.category}/${id}`)
  }
  //---------------------------------------------------Firebase

  createFirebase(category: ICategoryRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.categoryCollection, category)
  }

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' })
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `category/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `category/${id}`);
    return updateDoc(categoryDocumentReference, { ...category });
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `category/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
}
