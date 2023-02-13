import { Injectable } from '@angular/core';
import { collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, DocumentData } from '@firebase/firestore';
import { ICategoryRequest } from '../../interface/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  createFirebase(category: ICategoryRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.categoryCollection, category)
  }

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' })
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, { ...category });
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
}
