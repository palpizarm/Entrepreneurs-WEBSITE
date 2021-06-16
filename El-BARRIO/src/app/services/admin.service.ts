import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  registerQues(id_customer:number,
    question:string)
  {
  const url = `http://localhost:3000/questionToAdmin/registerQuestion`;
  const body = {
    'id_customer':id_customer,
    'question':question
  }
  return this.http.post(url,body);
  }


  getShowQuestions() {
    const url = `http://localhost:3000/questionToAdmin/showQuestions`;
    return this.http.post(url,{});
  }

  changeQuestionAnswer(answer:string,id_question:number) {
    const url =  `http://localhost:3000/questionToAdmin/updateQuestion`;
    return this.http.post(url,{'answer':answer, 'id_question':id_question});
  }

  getQuestionsConsumer(q:number) {
    const url = `http://localhost:3000/questionToAdmin/showQuestionsConsumer`;
    return this.http.post(url,{'id_customer':q});
  }

}
