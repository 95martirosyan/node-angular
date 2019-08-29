import {Message} from "./message.model";

import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class MessageService {
  private messages: Message[] = [];
  messageisEdited = new EventEmitter<Message>()

  constructor(private http: HttpClient) {
  }

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.post('http://localhost:3000/message' + token, body, httpOptions)
      .map((response: HttpResponse) => {
        const result = response;
        const message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id)
        this.messages.push(message);
        return message;
      })
      .catch((error: HttpResponse) => Observable.throw(error));
  }

  getMessages() {
    return this.http.get('http://localhost:3000/message')
      .map((response: HttpResponse) => {
        const messages = response.obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          console.log(message)
          transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: HttpResponse) => Observable.throw(error));
    ;
  }

  editMessage(message: Message) {
    this.messageisEdited.emit(message);
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, httpOptions)
      .map((response: HttpResponse) => response)
      .catch((error: HttpResponse) => Observable.throw(error));
  }

  deleteMessages(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    const body = JSON.stringify(message);
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
      .map((response: HttpResponse) => response)
      .catch((error: HttpResponse) => Observable.throw(error));
  }
}