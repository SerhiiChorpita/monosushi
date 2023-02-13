import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { IDiscountResponse } from '../../interface/disount/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private discountCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.discountCollection = collection(this.afs, 'discounts');
   }

    createFirebase(discount: IDiscountResponse): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.discountCollection, discount)
  }

  getAllFirebase() {
    return collectionData(this.discountCollection, { idField: 'id' })
  }

  getOneFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return docData(discountDocumentReference, { idField: 'id' });
  }

  updateFirebase(discount: IDiscountResponse, id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountDocumentReference, { ...discount });
  }

  deleteFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountDocumentReference);
  }
}
