setURL('http://daniel-helfenstein.developerakademie.com/smallest_backend_ever');


let allTasks = [];


/* == FOR ALL BODY TAGS =======================================*/

/**
 * Funtion init makes sure that <body> (or function includeHTML) is loaded before the other functions run
 * 
 */
function init(){

  includeHTML();
  

  setTimeout(function(){ //setTimeout 100ms makes sure that includeHTML() is loaded completely
    markActive();       //before function markActive() runs.
    arrowHeaderBtn();
  }, 100);

}


/* == HEADER =================================================*/

/**
* Function markActive marks the clicked navItem active.
* @param {string} currentLocation - the current adress of your page
*/

function markActive(){

  const currentLocation = location.href;
  console.log( 'Von Daniel currentlocation', currentLocation);
  let navItems = document.querySelectorAll('header nav a')
  console.log('das hier ist navitems', navItems);
  for(let i=0; i < navItems.length; i++){
      if(currentLocation === navItems[i].href){
          navItems[i].classList.add('active')
      }
  }

}



function arrowHeaderBtn(){
  let header = document.querySelector('header');
  let headerStyleLeft = window.getComputedStyle(header, null).getPropertyValue('left');
  if(headerStyleLeft === '-150px'){
    header.querySelector('#toggleHeaderBtn > i').style.display = 'none';
  } else{
    header.querySelector('#toggleHeaderBtn > i').style.display = 'block';
  }
}

function toggleHeader(){
  let header = document.querySelector('header');
  let headerStyleLeft = window.getComputedStyle(header, null).getPropertyValue('left');
  if(headerStyleLeft === '-150px'){
    header.style.left = '0px';
    document.querySelector('main').style.marginLeft = '170px';
    header.querySelector('#toggleHeaderBtn > i').style.display = 'block';
  } else{
    header.style.left = '-150px';
    document.querySelector('main').style.marginLeft = '20px';
    header.querySelector('#toggleHeaderBtn > i').style.display = 'none';
  }
}





/* == FOOTER ==========================================*/
function showLink(){
  document.getElementById('privacyPolicy').style.display = "flex";
  document.getElementById('impressum').style.display = "flex";
}
function hide(x){
  document.getElementById(`${x}`).style.display = "none";
}
function show(x){
  document.getElementById(`${x}`).style.display = "flex";
}





/* == HTML TEMPLATES ==========================================*/

/**
 * This Function is to include HTML snippets in HTML.
 * 
 */

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      console.log("statement" + xhttp);
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


/**
 * This Function is only a alert for login.
 * 
 */

function login() {
  alert("Anmeldefunktion ist im Moment nicht freigeschaltet")
}



/**
 * this function makes it easier to manage the storage this function saves to smallest backend
 * @param {*} key 
 * @param {*} array 
 */
async function setToSmallestBackend(key, array) { //set here and use below
  await backend.setItem(key, JSON.stringify(array));
//}


/**
 * this function makes it easier to manage the storage this function gets data from the smallest backend
 * @param {*} key 
 * @returns 
 */

async function getFromSmallestBackend(key) { //set here and use below
  return JSON.parse(backend.getItem(key))||[];
}

//function setToLocalStorage(key, array){
  //localStorage.setItem(key, JSON.stringify(array));
  //console.log("array in localstorage geschickt")
//}

//function getFromLocalStorage(key){
  //console.log("daten vom localstorage geholt");
  //return JSON.parse(localStorage.getItem(key));
//}

async function deleteAll(){
 allTasks = []; 
 await setToSmallestBackend('allTasks', allTasks);
 //setToLocalStorage('allTasks', allTasks);
 console.log(allTasks);
 console.log("ich bin fertig");
}
}