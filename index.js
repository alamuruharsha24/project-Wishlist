let todoin = document.querySelector(".input");
let todobtn = document.querySelector(".button");
let showtodo = document.querySelector(".todos-container");
let todo ;
let localdata = JSON.parse(localStorage.getItem("todo"));
let todolist=localdata || [];







function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(param) {
        let number = Math.random() * 16 | 0;
        let randomnum = param == 'x' ? number : (number & 0x8);
        return randomnum.toString(16);
    });
}


todobtn.addEventListener("click",(e)=>{
  e.preventDefault();
  todo=todoin.value;
  if(todo.length > 0){
    todolist.push({id:uuid() , todo , iscomplete : false})
  }
  render(todolist);
  localStorage.setItem("todo", JSON.stringify(todolist));
  todoin.value="";
})

showtodo.addEventListener("click",(e)=>{
  const key = e.target.dataset.key;
  let Deletetodokey = e.target.dataset.todokey;
  todolist = todolist.map(todo => todo.id === key ?{...todo,iscomplete:!todo.iscomplete}:todo)
  todolist = todolist.filter(todo => todo.id !== Deletetodokey);
  render(todolist);
  localStorage.setItem("todo", JSON.stringify(todolist));
  console.log(todolist)

})


function render (todolist){
  console.log(todolist);
  showtodo.innerHTML = todolist.map(({id, todo, iscomplete}) =>
  `<div class="relative todos"> 
    <input class="t-pointer t-checkbox"type="checkBox" id = "item-${id}" data-key='${id}'  ${iscomplete?"checked" : ""}> 
    <label class=" todo todo-text t-pointer ${iscomplete?"checked-todo" : ""}"  for="item-${id}" data-key='${id}'>${todo}</label> 
    <button class = "bttn cursor absolute right-0" ><span class="material-symbols-outlined" data-todokey = "${id}">Delete</span></button> 
  </div>`).join('');
  
}

render(todolist);


