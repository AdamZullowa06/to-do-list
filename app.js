const inputBox = document.querySelector(".inputField input");
const addbtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const listItems = document.querySelector(".todoList li");
const deleteAllBtn = document.querySelector('.footer button');

console.log(todoList);
console.log(listItems);

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if(userData.trim() != 0) {
        addbtn.classList.add('active');
    } else {
        addbtn.classList.remove('active');
    }
}

showTasks();

addbtn.onclick = () => {
    let List = {
        userData: inputBox.value,
        status: false
    };
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(List);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(List);
    addbtn.classList.remove('active');
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector('.pendingNumb');
    pendingNumb.textContent = listArr.length;
    if(listArr.length > 0) {
        deleteAllBtn.classList.add('active');
    } else {
        deleteAllBtn.classList.remove('active');
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li class="listItems">${element.userData}<span class="trash" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span> <span class="check" onclick="checkTask(${index})"><i class="fas fa-check-square"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

function checkTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listItem = listArr[index];
    // console.log(listItem);
    if(!listItem.status) {
        listItem.status = true;
        localStorage.setItem("New Todo", JSON.stringify(listArr));
        
    } else {
        listItem.status = false;
        localStorage.setItem("New Todo", JSON.stringify(listArr));
        console.log(itemList);
    }
    showTasks();  
}

deleteAllBtn.onclick = () => {
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}