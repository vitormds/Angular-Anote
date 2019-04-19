import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotesComponent } from './notes/notes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {Router, Routes, RouterModule} from "@angular/router";
import {FormsModule} from  '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { NoteComponent } from './note/note.component';
const appRoutes :Routes = [
  {
    path:'notes',
    component:NotesComponent
  },
  {
    path:'feedback',
    component:FeedbackComponent
  },
  {
    path:'',
    component:NotesComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FeedbackComponent,
    NotesComponent,
    NotFoundComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    FormsModule,
   RouterModule.forRoot(appRoutes)
   // RouterModule.forRoot(appRoutes, {enableTracing:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
