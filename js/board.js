
/**
 * When Board loads, first of all, an array names allTasks will be created with data from localstorage.
 * If the localstorage is empty, no array will be created, and the columns of tasks on Board will be empty.
 * Ater that, if Add Task is performed, Board will have a toto.
 */


let currentTask, currentTaskIndex;


async function initBoard(){
    init();
    
    await downloadFromServer();
    loadPage();
}






/** LOAD PAGE ========================================================== (start) */
function loadPage(){
   
    allTasks = getFromSmallestBackend('allTasks');
    

    let todoTasks = allTasks.filter(task => task.column == 'todo')
    let inProgressTasks = allTasks.filter(task => task.column == 'inProgress')
    let testingTasks = allTasks.filter(task => task.column == 'testing')
    let doneTasks = allTasks.filter(task => task.column == 'done')

    document.getElementById('todo').innerHTML = ``;
    document.getElementById('inProgress').innerHTML = ``;
    document.getElementById('testing').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;

    todoTasks.forEach(task =>{
        if(!task.isNewTaskFlag){
            document.getElementById('todo').innerHTML += generateTasks(task, task.id);
            generatePerformers(task, task.id);
        }
        
    });
    inProgressTasks.forEach(task =>{
        if(!task.isNewTaskFlag){
            document.getElementById('inProgress').innerHTML += generateTasks(task, task.id);
            generatePerformers(task, task.id);
        }
        
    });
    testingTasks.forEach(task =>{
        if(!task.isNewTaskFlag){
            document.getElementById('testing').innerHTML += generateTasks(task, task.id);
            generatePerformers(task, task.id);
        }
        
    });
    doneTasks.forEach(task =>{
        if(!task.isNewTaskFlag){
            document.getElementById('done').innerHTML += generateTasks(task, task.id);
            generatePerformers(task, task.id);
        }
        
    });
  
}

function generateTasks(task, id) {
    
    
        return `
        <div id="task${id}" class="task card border-light mt-1 mb-1"  style="width: 90%;" draggable="true" ondragstart="drag(${id})" onmouseover="showSide(${id})" onmouseout="hideSide(${id})">
            <div class="card-header">
                <b class="text-uppercase">${task.categorie}</b>
                <div>
                    <button id="editTask${id}" onclick="editTask(${id})" class="btn btn-light btn-sm"><i class="fas fa-pen"></i></button>
                    <button id="delTask${id}" onclick="delTask(${id})" class="btn btn-light btn-close p-2"></button>    
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title text-center">${task.title}</h5>
                <p class="card-text">${task.description.replaceAll('\n','</br>')}</p>
                <div id="assignedTo${id}"></div>
            </div>
            <div class="card-footer">
                <small>    <i>Ende am: ${task.date}</i> </small>
                <small>    <i>${task.urgency}</i> </small>
            </div>
        </div>
      `;
    
}

function generatePerformers(task, id){
    console.log(task.assignedTo)
    document.getElementById(`assignedTo${id}`).innerHTML = '';
    task.assignedTo.forEach(performer =>{
        
        document.getElementById(`assignedTo${id}`).innerHTML += `
            <img src="${performer.profileImg}"  data-bs-toggle="tooltip" title="${performer.name}" width="32px" height="32px">
        `;
    });
}
/** LOAD PAGE ========================================================== (end) */






/** SHOW HIDE CARD HEADER & FOOTER ========================================================== (start) */
function showSide(id){
    document.getElementById(`task${id}`).querySelector('.card-header').style.display = 'flex';
    document.getElementById(`task${id}`).querySelector('.card-footer').style.display = 'flex';
}
function hideSide(id){
    document.getElementById(`task${id}`).querySelector('.card-header').style.display = 'none';
    document.getElementById(`task${id}`).querySelector('.card-footer').style.display = 'none';
}
/** SHOW HIDE CARD HEADER & FOOTER ========================================================== (end) */






/** SPECIFY WHICH TASK IS BEING WORKED ON ========================================================== (start) */
function findTaskById(id){
    currentTask = allTasks.find(task => task['id'] == id);
    currentTaskIndex = allTasks.indexOf(currentTask);
    console.log(currentTask, currentTaskIndex)
  
}
/** SPECIFY WHICH TASK IS BEING WORKED ON ========================================================== (end) */






/** DRAG-DROP ========================================================== (start) */
function allowDrop(ev){
    ev.preventDefault()
}

function drag(id){
    findTaskById(id);
}

async function dropIn(columnName){
    currentTask.column = columnName;
    await setToSmallestBackend('allTasks', allTasks);
    loadPage();
}
/** DRAG-DROP ========================================================== (end) */






/** EDIT ========================================================== (start) */
function editTask(id){
    findTaskById(id);
    document.getElementById(`task${id}`).draggable = false;
    document.getElementById(`task${id}`).onmouseover = false;
    document.getElementById(`task${id}`).onmouseout = false;
    document.getElementById(`task${id}`).innerHTML = `

        <select id="categorie${id}" class="form-select mt-1 mb-2">
            <option selected>${currentTask.categorie}</option>
            <option value="Vertrieb">Vertrieb</option>
            <option value="Einkauf">Einkauf</option>
            <option value="IT">IT</option>
            <option value="Management">Management</option>
        </select>

        <input id="title${id}" class="form-control card" value="${currentTask.title}" aria-describedby="passwordHelpBlock" required>
        <textarea id="description${id}" type="text" class="form-control card" oninput="this.style.height = '';this.style.height = this.scrollHeight + 'px';" required>${currentTask.description}</textarea>
        
        <input id="date${id}" class="form-control" type="date" value="${currentTask.date}">
        <select id="urgency${id}" class="form-select">
            <option selected>${currentTask.urgency}</option>
            <option value="Wichtig">Wichtig</option>
            <option value="Neutral">Neutral</option>
            <option value="Unwichtig">Unwichtig</option>
        </select>
        
        <div class="card-footer bg-transparent border-light d-flex">
            <button id="saveEditedTask${id}" onclick="saveEditedTask(${id})" class="btn btn-light btn-sm">Speichern</button>
            <button id="delTask${id}" onclick="delTask(${id})" class="btn btn-light btn-sm">Löschen</button>    
        </div>

    `;
}
/** EDIT ========================================================== (end) */






/** DELETE TASK ========================================================== (start) */
async function delTask(id){
    findTaskById(id);
    allTasks.splice(currentTaskIndex, 1);
    await setToSmallestBackend('allTasks', allTasks);
    loadPage();
}
/** DELETE TASK ========================================================== (end) */






/** SAVE EDITED TASK ========================================================== (start) */
async function saveEditedTask(id){
    findTaskById(id);
    
    let editedColumn = currentTask.column;
    let editedCategorie = document.getElementById(`categorie${id}`);
    let editedTitle = document.getElementById(`title${id}`);
    let editedDescription = document.getElementById(`description${id}`);
    let editedDate = document.getElementById(`date${id}`);
    let editedUrgency = document.getElementById(`urgency${id}`);
    
    if (editedTitle.value == "") {
        alert("Bitte ein Titel hinzugügen");
        return;
    } else if (editedDescription.value ==""){
        alert("Bitte ein Beschreibung hinzufügen");
        return;
    }
    
    let newTask = {
        'column': editedColumn,
        'title': editedTitle.value,
        'date': editedDate.value,
        'categorie': editedCategorie.value,
        'urgency': editedUrgency.value,
        'description': editedDescription.value, //without replaceAll() all breaklines from textarea will be showed as spaces on the browser.
        'id': id,
        'isNewTaskFlag': true//this boolean states if the task has already been opened and transfered to the board; True: the task is new (task is one the backlog); False: the taks is already on the board
    }

    allTasks.splice(currentTaskIndex, 1, newTask);

    await setToSmallestBackend('allTasks', allTasks);

    loadPage();
}

/** SAVE EDITED TASK ========================================================== (end) */









