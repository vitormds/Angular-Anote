import { ApiService } from './../shared/api.service';
import { Notebook } from './model/notebooks';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Note } from './model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }
  public getAllNotebooks() {
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;

      }, err => {
        alert("Ocorreu um erro");
      }
    );
  }
  getAllNotes() {
    this.apiService.getAllNotes().subscribe(res => {
      this.notes = res;
    }, error => {
      alert("Ocorreu um erro ao tentar buscar as anotações");
    });
  }
  createNotebook() {
    let newNotebook: Notebook = {
      name: 'New notebook',
      id: null,
      nbOfNotes: 0
    }
    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => { alert("Um erro está ocorrendo enquanto salva o notebook"); }
    );
  }
  updateNotebook(updateNotebook: Notebook) {
    this.apiService.postNotebook(updateNotebook).subscribe(
      res => {

      }, err => {
        alert("Um erro está ocorrendo enquanto salva o notebook");
      }
    );
  }
  deleteNotebook(notebook: Notebook) {
    if (confirm("tem certeza de que deseja excluir o bloco de anotações"))
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        err => {
          alert("Não conseguir deletar o caderno");
        }
      );
  }
  deleteNote(note: Note) {
    if(confirm("Você tem certeza que quer excluir essa anotação")){
      this.apiService.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },err => {
    
        });
    }
  
  }
  createNote(notebookId: string) {
    let newNote: Note = {
      id: null,
      title: "New Note",
      text: "Write some text in here",
      lastModifiedOn: null,
      notebookId: notebookId
    };
    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      }, err => {
        alert("Ocorreu um erro enquanto estava salvando");
      }
    );
  }
  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getNotesByNotebooks(notebook.id).subscribe(
      res => { this.notes = res; },
      err => { alert("Ocorreu um erro enquanto estava buscando"); },
    );
  }
  updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {

      }, err => {
        alert("Ocorreu um erro enquanto estava salvando");
      }
    );
  }
  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}

