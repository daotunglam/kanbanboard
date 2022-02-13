async function initBacklog(){
    init();
    //await downloadFromServer();
    renderBacklog();
}


/**
 * This function render all Backlogelements that have been added.
 */

async function renderBacklog() {

    //allTasks = await getFromSmallestBackend('allTasks');
    allTasks = getFromLocalStorage('allTasks');
    let container = document.getElementById('container');
    container.innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].isNewTaskFlag) {

            container.innerHTML += `
            
            <div class= "backlog-element" onclick="showTaskElementOnTheBoard(${allTasks[i].id})">
            
                <div class="color-marking" id="color-marking${i}"></div>
                <div class= "backlog-element-info">
                    <div class="erstelltVonClass hide-mobile">
                        <img src="${allTasks[i]['assignedTo'][0]['profileImg']}" style="width: 50px; height: 50px; border-radius: 100%; margin-left: 20px; margin-right: 20px; object-fit: cover;" >
            
                        <div class="backlog-author">
                            <p style="display: flex; align-items: center;">${allTasks[i]['assignedTo'][0]['name']}</p>
                            <p style="color: rgb(17, 82, 179); display: flex; align-items: center;">${allTasks[i]['assignedTo'][0]['mailAdress']}</p>
                        </div>
                    </div>
            
                    <div class="category hide-mobile">
                    <h5>${allTasks[i].categorie}</h5>
                    </div>
                    <div class="task-content">
                        <div class="task-content-title"><h5><b>${allTasks[i].title}</b></h5> </div>
                        <div class="task-content-description">${allTasks[i].description}</div>
                    </div>
               
                </div>
                <div class="d-none-button">
                    <button style="background-color: rgb(17, 89, 172); color: white; border-radius: 5px; margin-right: 5px;" onclick="showTaskElementOnTheBoard(${allTasks[i].id})">Show</button>
                </div>
            

            </div>
            `;

            let colorString = 'color-' + allTasks[i].categorie;
            document.getElementById('color-marking' + i).classList.add(colorString);

        }
    }
}



/**
 * function take the element from the backlog and brings the element onto the board 
 * @param {} id 
 */

async function showTaskElementOnTheBoard(id) {
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id == id) {
            allTasks[i].isNewTaskFlag = false;
            console.log(allTasks[i].isNewTaskFlag);
        }

    }
    
    //await setToSmallestBackend('allTasks', allTasks);
    setToLocalStorage('allTasks', allTasks);
    renderBacklog();

    window.location.assign('board.html');

}

/**
 * function to get the data from the backend 
 * @param {} key 
 * @returns 
 */
function getFromSmallestBackend(key) { //set here and use below
    return JSON.parse(backend.getItem(key))||[];
}





