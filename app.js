
function createTodoItem(title)
{
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.className='checkbox';

    const label=document.createElement('label');
    label.innerText=title;//тот параметр, который принимет функция
    label.className='title';

    const editInput=document.createElement('input');
    editInput.type='text';
    editInput.className='textfield';

    const editButton=document.createElement('button');
    editButton.innerText="Изменить";//написать текст в кнопке
    editButton.className='edit';

    const deleteButton=document.createElement('button');
    deleteButton.innerText="Удалить";
    deleteButton.className='delete';

    const listItem=document.createElement('li');
    listItem.className='todo-item';

    //поместить все созданные элементы в лист айтем
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    //привязать событие (код с addEventListener)
    bindEvents(listItem);
    return listItem;//вернули новое значение
}

function bindEvents(todoItem){
    //получить доступ к дом элементам
    const checkbox=todoItem.querySelector('.checkbox');
    const editButton=todoItem.querySelector('button.edit');
    const deleteButton=todoItem.querySelector('button.delete');

    checkbox.addEventListener('change',toggleTodoItem);
    editButton.addEventListener('click',editTodoItem);
    deleteButton.addEventListener('click',deleteTodoItem);
}
//так как ф-я является обработчиком, то ставим событие event
function addTodoItem(event) {
    //остановить отправку данных на сервер, чтобы не перегружалась страница
    event.preventDefault();

    if(addInput.value==='') return alert("Необходимо ввести задачу!");
    //создание нового элемента
    const todoItem=createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value='';
}

function toggleTodoItem({toggle}) {
    //получить родителя, то есть li
    const listItem=this.parentNode;
    //если присутствует у элемента, то уберет, если нет, то добавит
    listItem.classList.toggle('completed');
}
function editTodoItem(){
    const listItem=this.parentNode;
    const title=listItem.querySelector('.title');
    const editInput=listItem.querySelector('.textfield');
    const isEditing=listItem.classList.contains('editing');

    if(isEditing){
        //присвоить новое значение из поля
        title.innerText=editInput.value;
        this.innerText="Изменить";
    }
    else {
        editInput.value=title.innerText;
        this.innerText="Сохранить";
    }
    listItem.classList.toggle('editing');    

}
function deleteTodoItem(){
    const listItem=this.parentNode;
    todoList.removeChild(listItem);
}
const todoForm=document.getElementById('todo-form');
const addInput=document.getElementById('add-input'); 
const todoList=document.getElementById('todo-list');
//возвращает массив
const todoItems=document.querySelectorAll('.todo-item');

function main(){
   //привязать обработчик события на событие отправки формы
//при событии submit сработает ф-я
todoForm.addEventListener('submit',addTodoItem);
todoItems.forEach(item=>bindEvents(item));
}
main();