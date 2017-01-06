import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TodoService } from '../../providers/todo-service';
import { Todo } from '../../providers/todo-model';
import { TodoFormPage } from '../todo-form/todo-form';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class TodoPage {

  selectedTodo: Todo;
  todos: Todo[];

  constructor(public todoService: TodoService, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedTodo = navParams.get('todo');
    this.todos = [];
    // this.list();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad TodoPage');
  // }

  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter TodoPage');
  // }

  ionViewDidEnter() {
    console.log('ionViewDidEnter TodoPage');
    this.list();
  }

  list() {
    let currentPage = 0;
    let itemsPerPage = 10;

    try {
      this.todoService.list(currentPage, itemsPerPage).subscribe(
        todos => {
          // this.totalItems = 20; // backend must send  the total items for proper pagination config

          // Replace all content of array
          // http://stackoverflow.com/questions/23486687/short-way-to-replace-content-of-an-array
          // [].splice.apply(this.todos, [0, this.todos.length].concat(todos));
          this.todos.length = 0;
          [].push.apply(this.todos, todos);
          // [].splice.apply(this.todos, [0, this.todos.length]).concat(todos);
          // this.todos = todos;
        },
        error => {
          console.error('Error', error);
          // this.notificationService.error('Não foi possível carregar a lista de "to-do\'s"!');
          // this.totalItems = 20;
          // this.todos = error;
        }
      );
    } catch (ex) {
      this.todos = [];
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(Page2, {
    //   item: item
    // });
  }

  defer(event, item) {
    console.log('TODO: defer item', item);
    this.todoService.get('bc68beea-2c23-4fb0-b4dd-13495b9c9b87')
      .subscribe(data => console.log('data', data));
  }

  archive(event, item) {
    // TODO:)
    console.log('TODO: archive item', item);
  }

  openTodoFormPage() {
    this.navCtrl.push(TodoFormPage, {});
  }
}
