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

class Todo {

  constructor(todolist){
    this.todolist=[];
  }

  add(task){
    this.todolist.push(task);
  }

  remove(i){
    if(i<this.todolist.length){
    this.todolist.splice(i,1);
  }
    else{
      return;
    }
  }

  update(i, updatedtask){
    if(i<this.todolist.length){
    this.todolist.splice(i, 1, updatedtask);
    return updatedtask;
    }
    else{
      return;
    }
  }

  getAll(){
    return this.todolist;
  }

  get(i){
    if(i<this.todolist.length){
      return this.todolist[i]
    }
    else{
      return null;
    }
  }

  clear(){
    this.todolist.length=0;
    return this.todolist;
  }
}


module.exports = Todo;
