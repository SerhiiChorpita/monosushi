import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { IProductResponse } from '../../interface/products/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.productCollection = collection(this.afs, 'product');
  }

  createFirebase(product: IProductResponse): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.productCollection, product)
  }

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' })
  }

  getOneFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `product/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  updateFirebase(product: IProductResponse, id: string) {
    const productDocumentReference = doc(this.afs, `product/${id}`);
    return updateDoc(productDocumentReference, { ...product });
  }

  deleteFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `product/${id}`);
    return deleteDoc(productDocumentReference);
  }
}
