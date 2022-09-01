import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscountRequest, IDiscountResponce } from '../../interface/disount/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private url = environment.BACKEND_URL;
  private api = { discount: `${this.url}/discounts` }

  constructor(private http: HttpClient) { }

  getAll(): Observable<IDiscountResponce[]> {
    return this.http.get<IDiscountResponce[]>(this.api.discount)
  }

  getOne(id: number): Observable<IDiscountResponce> {
    return this.http.get<IDiscountResponce>(`${this.api.discount}/${id}`)
  }

  create(discount: IDiscountRequest): Observable<IDiscountResponce> {
    return this.http.post<IDiscountResponce>(this.api.discount, discount)
  }

  update(discount: IDiscountRequest, id: number): Observable<IDiscountResponce> {
    return this.http.patch<IDiscountResponce>(`${this.api.discount}/${id}`, discount)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discount}/${id}`)
  }
}
