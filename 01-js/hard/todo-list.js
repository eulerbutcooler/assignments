/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

// class Todo {

//   constructor(todolist){
//     this.todolist=todolist;
//   }

//   add(task){
//     this.todolist.push(task);
//   }

//   remove(i){
//     this.todolist.splice(i,1);
//   }

//   update(i, task){
//     this.todolist(i)==task;
//   }

//   getAll(){
//     console.log(this.todolist);
//   }

//   get(i){
//     console.log(this.todolist(i));
//   }

//   clear(){
//     this.todolist.length=0;
//     console.log(this.todolist);
//   }
// }


class Todo {

  constructor(todolist) {
    this.todolist = todolist;
  }

  add(task) {
    this.todolist.push(task);
  }

  remove(i) {
    this.todolist.splice(i, 1);
  }

  update(i, updatedTodo) {
    this.todolist.splice(i, 1, updatedTodo);
    return updatedTodo; // Return the updated todo
  }

  getAll() {
    return this.todolist; // Return the entire todo list
  }

  get(i) {
    return this.todolist[i]; // Return the todo at index i
  }

  clear() {
    this.todolist.length = 0;
    return this.todolist; // Return the empty todo list
  }
}

module.exports = Todo;
