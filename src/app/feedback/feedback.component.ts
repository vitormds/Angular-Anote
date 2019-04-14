import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model: FeedbackViewModel ={
    name:'',
    email:'',
    feedback:''
  };

  constructor(private apiService: ApiService) {

   }

  ngOnInit() {
  }
sendFeedback(): void{
  this.apiService.postFeedback(this.model).subscribe(
    res => {
      
      location.reload();
      console.log(this.model);
    },
    err => {
         alert("Erro enquanto enviava o comentário");
    }
  );
}
 

}
export interface FeedbackViewModel{
    name: string;
    email:string;
    feedback: string;
}