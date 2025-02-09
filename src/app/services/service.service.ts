import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoClienteDTO, InfoResponseClienteDTO } from '../models/cliente-model/cliente-model.module';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlServicio = 'http://3.80.42.177:8085/';

  constructor( private http: HttpClient) {
    this.handleError = this.handleError.bind(this);
   }

   public handleError(error) {
    console.error(error);
    return throwError(error);
  }

  public crearCliente(data: InfoClienteDTO): Observable<InfoResponseClienteDTO> {
    return this.http
    .post<InfoResponseClienteDTO>(
      `${this.urlServicio}api/cliente`, data)
    .pipe(
      retry(0),
      catchError(this.handleError),
      map((response) => response)
    );
   }
}
