import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MessageResponse } from "../model/message/message.response";
import { CreateMessageRequest } from "../model/employee/create-message.request";

@Injectable({
  providedIn: 'root'
})
export class MessageApiService {

  basePath: string = environment.production ? environment.prodBasePath : environment.serverBasePath;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  createMessage(request: CreateMessageRequest): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<MessageResponse>(`${this.basePath}/messages`, request, this.httpOptions)
        .subscribe({
          next: (response) => {
            console.log(`Message created with id ${response.id}`);
            resolve(true);
          },
          error: (error: HttpErrorResponse) => {
            let errorMessage = error.error?.message || 'Unknown error';
            reject(errorMessage);
          }
        });
    });
  }

  markMessageAsRead(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.post<void>(`${this.basePath}/messages/${id}`, {}, this.httpOptions)
        .subscribe({
          next: () => {
            console.log(`Message with id ${id} marked as read`);
            resolve();
          },
          error: (error: HttpErrorResponse) => {
            let errorMessage = error.error?.message || 'Unknown error';
            reject(errorMessage);
          }
        });
    });
  }

  getMessageById(id: number): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve, reject) => {
      this.httpClient.get<MessageResponse>(`${this.basePath}/messages/${id}`)
        .subscribe({
          next: (response) => {
            console.log(`Message fetched with id ${response.id}`);
            resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            let errorMessage = error.error?.message || 'Unknown error';
            reject(errorMessage);
          }
        });
    });
  }

  getReceiversBySenderId(senderId: number): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.basePath}/messages?senderId=${senderId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching receivers:', error);
          return throwError(error);
        })
      );
  }

  getMessagesBySenderAndReceiver(senderId: number, receiverId: number): Observable<MessageResponse[]> {
    return this.httpClient.get<MessageResponse[]>(
      `${this.basePath}/messages?senderId=${senderId}&receiverId=${receiverId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching messages:', error);
          return throwError(error);
        })
      );
  }

  getMessagesWithParams(params: { senderId?: number, receiverId?: number }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params.senderId) {
      queryParams.append('senderId', params.senderId.toString());
    }
    if (params.receiverId) {
      queryParams.append('receiverId', params.receiverId.toString());
    }

    return new Promise<any>((resolve, reject) => {
      this.httpClient.get<any>(`${this.basePath}/messages?${queryParams.toString()}`)
        .subscribe({
          next: (response) => {
            console.log('Messages fetched', response);
            resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            let errorMessage = error.error?.message || 'Unknown error';
            reject(errorMessage);
          }
        });
    });
  }
}
