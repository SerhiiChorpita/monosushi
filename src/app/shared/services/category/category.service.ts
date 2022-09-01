import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryRequest, ICategoryResponce } from '../../interface/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL;
  private api = { category: `${this.url}/category` }

  constructor(private http: HttpClient) { }

  getAll(): Observable<ICategoryResponce[]> {
    return this.http.get<ICategoryResponce[]>(this.api.category)
  }

  getOne(id: number): Observable<ICategoryResponce> {
    return this.http.get<ICategoryResponce>(`${this.api.category}/${id}`)
  }

  create(category: ICategoryRequest): Observable<ICategoryResponce> {
    return this.http.post<ICategoryResponce>(this.api.category, category)
  }

  update(category: ICategoryRequest, id: number): Observable<ICategoryResponce> {
    return this.http.patch<ICategoryResponce>(`${this.api.category}/${id}`, category)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.category}/${id}`)
  }
}
