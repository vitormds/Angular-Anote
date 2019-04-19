
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Notebook } from '../notes/model/notebooks';
import { HttpClient } from '@angular/common/http';
import { FeedbackViewModel } from '../feedback/feedback.component';
import { Note } from '../notes/model/note';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/api";
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SEND_FEEDBACK = `${this.BASE_URL}\\feedback`;
  private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}\\notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks\\`;
  private ALL_NOTES_URL = `${this.BASE_URL}\\notes\\all`;
  private NOTES_BY_NOOTEBOOK_URL = `${this.BASE_URL}\\notes\\byNotebook\\`;
  private SAVE_UPDATE_NOTE_URL = `${this.BASE_URL}\\notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes\\`;

  constructor(private http: HttpClient) { }
  
  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }
  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK, feedback);
  }
  postNotebook(notebook: Notebook): Observable<Notebook>{
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK, notebook);
  }
  deleteNotebook(id:string): Observable<any>{
    return this.http.delete(this.DELETE_NOTEBOOK_URL + id);
  }
  getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }
  getNotesByNotebooks(notebookId: string): Observable<Note[]>{
    return this.http.get<Note[]>(this.NOTES_BY_NOOTEBOOK_URL + notebookId);
  }
  saveNote(note: Note): Observable<Note>{
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL, note);
  }
  deleteNote(noteId: string):Observable<any>{
    return this.http.delete(this.DELETE_NOTE_URL + noteId);
  }
}
