import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

export interface ICombinationService{

  start(n: number): Observable<any>
  getNext(currentIndex: number): Observable<any> 
  getAll(pageIndex: number, pageSize: number): Observable<any> 

}
@Injectable({
  providedIn: 'root'
})
export class CombinationService implements ICombinationService{
  private apiUrl = environment.apiUrl+'/combination';
  public n: number =0;
  public totalCombinations:number =0;

  constructor(private http: HttpClient) {}

  start(n: number): Observable<number> {
    this.n = n; 

    return this.http.get<number>(`${this.apiUrl}/Start?n=${n}`).pipe(
      tap((totalCombinations: number) => {
        this.totalCombinations = totalCombinations;
      })
    );
  }

  getNext(currentIndex: number): Observable<number[]> {
    
    return this.http.get<number[]>(`${this.apiUrl}/GetNext?Index=${currentIndex}`);
  }

  getAll(pageIndex: number, pageSize: number): Observable<number[][]> {
    return this.http.get<number[][]>(`${this.apiUrl}/GetAll?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
}
