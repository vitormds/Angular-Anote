
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Notebook } from '../notes/model/notebooks';
import { HttpClient } from '@angular/common/http';
import { FeedbackViewModel } from '../feedback/feedback.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/api";
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SEND_FEEDBACK = `${this.BASE_URL}\\feedback`;
  constructor(private http: HttpClient) { }
  
  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }
  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK, feedback);
  }
}
