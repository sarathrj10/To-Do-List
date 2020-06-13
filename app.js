//Declaring UI variables
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.list-group');
const clrbtn=document.querySelector('.clear-task');
const filter=document.querySelector('#filter');
const input=document.querySelector('#task');

//Load all event Listeners
loadAllEventListeners();

//Load all event Listeners
 function loadAllEventListeners(){
     document.addEventListener('DOMContentLoaded',getTask)
     form.addEventListener('submit', addTask);
     taskList.addEventListener('click',removeTask);
     clrbtn.addEventListener('click',clearTasks);
     filter.addEventListener('input',filterTasks);
 }
 //get task from LS
 function getTask(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
         //create li elements
  const li=document.createElement('li');
  li.className='list-group-item';
  //create text node
  li.appendChild(document.createTextNode(task));
  //create link element
  const link=document.createElement('a');
  link.className='delete-item';
  //add link icon
  link.innerHTML=`<i class="fa fa-remove float-right"></i>`;
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
    })
 
 }

 //Add tasks
 function addTask(e){
     if(input.value===''){
         alert('Add a task')
     }else{
  //create li elements
  const li=document.createElement('li');
  li.className='list-group-item';
  //create text node
  li.appendChild(document.createTextNode(input.value));
  //create link element
  const link=document.createElement('a');
  link.className='delete-item';
  //add link icon
  link.innerHTML=`<i class="fa fa-remove float-right"></i>`;
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
  //store to local storage
  storeLocal(input.value);
  //clear text
  input.value='';
  e.preventDefault();
 }
}
//store task
function storeLocal(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
 //removeTask
 function removeTask(e){
   
     if(e.target.classList.contains('fa-remove')){
         if(confirm('Are you sure?')){
         e.target.parentElement.parentElement.remove();
         //remove from LS
         removeLocal(e.target.parentElement.parentElement)
         }
     }
 }
 //remove from ls
 function removeLocal(taskitem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskitem.textContent===task){
           tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
 }
 //clear button
 function clearTasks(){
     if(confirm('Are you sure to clear all tasks?')){
     taskList.innerHTML='';
     localStorage.clear();
    }
 }
 //searching a task
 function filterTasks(e)
 {
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display='block';
        }else{
            task.style.display='none';   
        }
    })
    
 }