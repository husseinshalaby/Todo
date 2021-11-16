const users = document.getElementById('users');
const input = document.getElementById('input');
const submit = document.getElementById('submit');
const showAllButton = document.querySelector('.showAll');
const toBeDoneButton = document.querySelector('.toBeDone');
const doneButton = document.querySelector('.done');
const sorting = document.querySelector('.sorting');
const todoList = document.querySelector('.event-bubbling');
const textarea = document.querySelector('.textarea');

const add = () => {
  if (input.value) {
    const newTodo = document.createElement('li');
    const newP = document.createElement('p');
    const deleteButton = document.createElement('button');
    const doneButton = document.createElement('button');
    const showDetailsButton = document.createElement('button');
    const select =document.getElementById('category-select')
    const todoDetails = document.createElement('p');
    if(!select.value) { 
      select.options[select.selectedIndex].value = 'personal'
    }
    newTodo.setAttribute("class", "child ");
    newTodo.classList.add(select.options[select.selectedIndex].value)
    deleteButton.setAttribute('class', 'btn btn-danger');
    showDetailsButton.setAttribute('class', 'btn btn-default');
    newP.setAttribute('class', 'todo-name');
    todoDetails.setAttribute('class', 'todo-details');
    doneButton.setAttribute('class', 'btn btn-success');

    newP.appendChild(document.createTextNode(`${input.value}: (${select.options[select.selectedIndex].value})`));
    if(textarea.value){
      todoDetails.appendChild(document.createTextNode(`todo details :${textarea.value}`))
     }else{
      todoDetails.appendChild(document.createTextNode(`No details !`))
     };
    deleteButton.appendChild(document.createTextNode('x'));
    doneButton.appendChild(document.createTextNode('√'));
    showDetailsButton.appendChild(document.createTextNode('+'));
    users.appendChild(newTodo);
    newTodo.appendChild(newP);
    newTodo.appendChild(todoDetails); 
    newTodo.appendChild(showDetailsButton);
    newTodo.appendChild(doneButton);
    newTodo.appendChild(deleteButton);
    input.value = '';
    textarea.value = '';
    select.selectedIndex = null;
    users.appendChild(newTodo);
  } else {
    alert('you dont have todo to add bro!!');
  }
}
submit.addEventListener('click', add)

const deleteTodo = () => {
  console.log(event.target.parentNode)
  event.target.parentNode.remove();
}
const markDone = () => {
  console.log(event.target.parentNode)
  event.target.parentNode.classList.toggle('doneTodo');
}

const toggleDetails = () => {
  const allTodos = document.querySelectorAll('.event-bubbling li');
  const todoList = Array.from(allTodos);
  todoList.map(todo => {
    todo.classList.remove('active');
  })
  event.target.parentNode.classList.add('active');

  const activeDetails = document.querySelectorAll('.active .todo-details');
  const active = Array.from(activeDetails);
  active.map(a => {
    a.classList.toggle('show')
  })
}
const container = document.querySelector('.event-bubbling');
const child = document.querySelectorAll('.child');

container.addEventListener('click', (event) => {
    if (event.target.tagName ==="BUTTON" && event.target.innerText === 'x'){
      deleteTodo()
    }
    else if (event.target.tagName ==="BUTTON" && event.target.innerText === '√'){
      markDone()
    }
    else if (event.target.tagName ==="BUTTON" && event.target.innerText === '+'){
      toggleDetails()
    }else {
      event.stopPropagation();
    }
});

const categoryFilter = document.querySelector('#category-filter')
categoryFilter.addEventListener('change', function() {
  const list = document.querySelectorAll('.event-bubbling li');
  let todos = Array.from(list);
  todos.map(todo=>{
    if(categoryFilter.options[categoryFilter.selectedIndex].value === 'all'){
      todo.style.display="grid"
    }
    else if (todo.classList.contains(categoryFilter.options[categoryFilter.selectedIndex].value)){
      todo.style.display="grid"
    }else{
      todo.style.display="none"
    }
  })
  if (!showAllButton.classList.contains("btn-primary")) {
    showAllButton.classList.add("btn-primary")
    toBeDoneButton.classList.remove("btn-primary")
    doneButton.classList.remove('btn-primary')
  } 
  for(let i = 0; i < todos.length; i ++){
    if (categoryFilter.options[categoryFilter.selectedIndex].value === 'all'){
      todos[i].style.display = 'grid'
    }
    else if(todos[i].classList.contains(categoryFilter.options[categoryFilter.selectedIndex].value)){
      todos[i].style.display = 'grid'
    }else{
      todos[i].style.display = 'none'
    }
  }
})

sorting.addEventListener('click', (event) => {
  const todos = document.querySelectorAll('.child');
  if (event.target.classList.contains("showAll")){
    if (!showAllButton.classList.contains("btn-primary")) {
      showAllButton.classList.add("btn-primary")
      toBeDoneButton.classList.remove("btn-primary")
      doneButton.classList.remove('btn-primary')
    } 

    for(let i = 0; i < todos.length; i ++){
      if (categoryFilter.options[categoryFilter.selectedIndex].value === 'all'){
        todos[i].style.display = 'grid'
      }
      else if(todos[i].classList.contains(categoryFilter.options[categoryFilter.selectedIndex].value)){
        todos[i].style.display = 'grid'
      }else{
        todos[i].style.display = 'none'
      }
    }
  }
  else if (event.target.classList.contains("toBeDone")){
    if (!toBeDoneButton.classList.contains("btn-primary")) {
      toBeDoneButton.classList.add("btn-primary")
      showAllButton.classList.remove("btn-primary")
      showAllButton.classList.add('btn-default')
      doneButton.classList.remove('btn-primary')
    }
    for(let i = 0; i < todos.length; i ++){
      if (categoryFilter.options[categoryFilter.selectedIndex].value === 'all' && !todos[i].classList.contains('doneTodo')){
        todos[i].style.display = 'grid'
      }
      else if(!todos[i].classList.contains('doneTodo') && todos[i].classList.contains(categoryFilter.options[categoryFilter.selectedIndex].value)){
        todos[i].style.display = 'grid'
      }else{
        todos[i].style.display = 'none'
      }
    }
    
  }
  else if (event.target.classList.contains("done")){
    if (!doneButton.classList.contains("btn-primary")) {
      doneButton.classList.add("btn-primary")
      showAllButton.classList.add('btn-default')
      toBeDoneButton.classList.remove("btn-primary")
      showAllButton.classList.remove('btn-primary')
    } 
    for(let i = 0; i < todos.length; i ++){
      if (categoryFilter.options[categoryFilter.selectedIndex].value === 'all' && todos[i].classList.contains('doneTodo')){
        todos[i].style.display = 'grid'
      }
      else if(todos[i].classList.contains('doneTodo') && todos[i].classList.contains(categoryFilter.options[categoryFilter.selectedIndex].value)){
        todos[i].style.display = 'grid'
      }else{
        todos[i].style.display = 'none'
      }
    }
  }
  else {
    event.stopPropagation();
  }
});
