import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { removeEmptyFields } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  protected url: string;

  protected constructor(
    @Inject(HttpClient) protected http: HttpClient,
  ) {
  }

  getAll(data?, url?): Observable<T[]> {
    data = removeEmptyFields(data)
    return this.http.get<T[]>(url ? url : this.url, {params:removeEmptyFields(data)});
  }

  getById(id, url?): Observable<T[]> {
    return this.http.get<T[]>(`${url ? url : this.url}/${id}`);
  }

  post(dto: T, url?): Observable<T> {
    return this.http.post<T>(url ? this.url + '/' + url : this.url, dto);
  }

  put(dto: T, url?): Observable<T> {
    return this.http.put<T>(`${url ? url : this.url}/${dto['id']}`, dto);
  }

  delete(id, url?): Observable<T> {
    return this.http.delete<T>(`${url ? url : this.url}/${id}`);
  }
}
