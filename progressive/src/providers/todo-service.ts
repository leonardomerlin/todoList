import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Rx';

import { AuthService } from '@demoiselle/security';

import { Todo } from './todo-model';

/*
  Generated class for the TodoService provider.
*/
@Injectable()
export class TodoService {

  endpoint: string = 'http://localhost:8080/todo/api/user/';

  constructor(protected http: Http, protected authService: AuthService) {
    console.log('Hello TodoService Provider');
  }

  get(id: string) {
    return this.http.get(this.endpoint + id).map(res => <Todo>res.json());
  }

  list(currentPage: number, itemsPerPage: number) {
    console.log('TODO: implementar paginação:', currentPage, itemsPerPage);

    let url = this.endpoint + this.authService.getIdentityFromToken();
    return this.http.get(url).map(res => {
      return <Todo[]>(res.json().todos);
    });
  }

  create(todo: Todo) {
    todo.user = {
      id: this.authService.getIdentityFromToken()
    };
    return this.http.post('~main/todo', todo).map(res => res.json());
  }

  update(todo: Todo) {
    todo.user = {
      id: this.authService.getIdentityFromToken()
    };
    return this.http.put('~main/todo', todo);
  }

  delete(todo: Todo) {
    todo.user = {
      id: this.authService.getIdentityFromToken()
    };
    return this.http.delete('~main/todo/' + todo.id);
  }

  defer(todo: Todo) {
    console.log('TODO: implement defer:', todo);
  }

  archive(todo: Todo) {
    console.log('TODO: implement archive:', todo);
  }
}
