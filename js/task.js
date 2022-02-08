
let urgency = [];
let categorie = [];
let assignedTo = [];
let allMembers = [
    {
        name: 'Julian Stahl',
        profileImg: 'assets/profileImg/julianStahl.jpg',
        id: 1,
        mailAdress: 'julian.stahl@gmx.de',
    },
    {
        name: 'Daniel Helfenstein',
        profileImg: 'assets/profileImg/danielhelfenstein.jpg',
        id: 2,
        mailAdress: 'daniel.helfenstein@mail.de',
    },
    {
        name: 'Tung Lam Dao',
        profileImg: 'assets/profileImg/tunglamdao.jpeg',
        id: 3,
        mailAdress: 'lam90namdinh@gmail.com',
    },
];

async function initTask(){
    init();
    await downloadFromServer();
    allTasks = await getFromSmallestBackend('allTasks');
    //allTasks = getFromLocalStorage('allTasks');
}




/**
 * This function shows the which categorie was choosen.
 * @param {string} id the categorie which was choosen
 */
function switchCategorie(id) {
    categorie = document.getElementById(`categorie(${id})`).innerHTML;
    document.getElementById("dropdownMenuButton1").innerHTML = `${categorie}`;
}

/**
 * This function shows the which urgency was choosen.
 * @param {string} id the urgency which was choosen
 */
function switchUrgency(id) {
    urgency = document.getElementById(`urgency(${id})`).innerHTML;
    document.getElementById("dropdownMenuButton2").innerHTML = `${urgency}`;
}

function show(x){
    document.getElementById(x).style.display = 'block';
}
function hide(x){
    document.getElementById(x).style.display = 'none';
}

function generateAllMembers(){
    document.getElementById('allMembers').innerHTML = '';      
    allMembers.forEach(element => {
        document.getElementById('allMembers').innerHTML += `       
            <div class="list-group-item" 
                onclick="
                        showPerformers(${element.id}),
                        hide('allMembers'), 
                        show('addPerformer')">
                <img src="${element.profileImg}" width="40px">${element.name}
            </div>
        `;
    });
}

function findObjectById(array, id){
    return array.find(object => object['id'] == id);
}
function findObjectIndexById(array, id){
    return array.indexOf(
        array.find(object => object['id'] == id)
    );
}

function showPerformers(id){
    let selectedMember = findObjectById(allMembers, id);
    if(!findObjectById(assignedTo,id)){ //to make sure every member is selected max 1 time
        assignedTo.push(selectedMember);
    }
    document.getElementById('assignedTo').innerHTML = '';
    assignedTo.forEach(item =>{
        document.getElementById('assignedTo').innerHTML += `
            <img src="${item.profileImg}"  data-bs-toggle="tooltip" title="${item.name}">
        `
    })
}

/**
 * This function save the new task
 */
async function addTask() {
    title = document.getElementById('title').value;
    date = document.getElementById('date').value;
    description = document.getElementById('description').value;

    if (title == "") {
        alert("Bitte einen Titel eingeben");
        return;
    } else if (date=="") {
        alert("Bitte ein Datum auswählen");
        return;
    } else if (description==""){
        alert("Bitte eine Beschreibung hinzufügen");
        return;
    } else if (categorie==""){
        alert("Bitte eine Kategorie auswählen");
        return;
    } else if (urgency=="") {
        alert("Bitte die Wichtigkeit auswählen");
        return;
    }else if(assignedTo.length==0){
        alert("Bitte die zuständige Person zuweisen");
        return;
    }
    


    let task = {
        'column': 'todo', //to specify this task goes to column To Do, In Progress, Test or Done
        'title': title,
        'date': date,
        'categorie': categorie,
        'urgency': urgency,
        'description': description,
        'id': new Date().getTime(),
        'isNewTaskFlag': true,
        'assignedTo': assignedTo,
    }
    allTasks.push(task);
    
   console.log(allTasks);



    await setToSmallestBackend('allTasks', allTasks);
    //setToLocalStorage('allTasks', allTasks);
    cancel();

   window.location.assign('backlog.html');


}

/**
 * This function cancel the actual task
 */
function cancel() {
    title = document.getElementById('title').value = ``;
    date = document.getElementById('date').value = ``;
    description = document.getElementById('description').value = ``;
    categorie = ``;
    urgency = ``;
    document.getElementById("dropdownMenuButton1").innerHTML = "Kategorie";
    document.getElementById("dropdownMenuButton2").innerHTML = "Wichtigkeit";
}


function getFromSmallestBackend(key) { //set here and use below
    return JSON.parse(backend.getItem(key))||[];
}

