var id_count = 1;
class_name = "todo";

function addTodo() {
    var todos = document.getElementById("todos");
    var field = document.getElementById("input");
    var date = document.getElementById("date");

    if (!field.value) {
        alert("Error: Please enter a task.");
        return;
    }
    if (!date.value) {
        alert("Error: Please select a date.");
        return;
    }

    var dateCheck = checkDate(date.value);
    if (!dateCheck.isValid) return;

    var elem = document.createElement("div");
    elem.setAttribute('id', id_count);
    elem.setAttribute('class', class_name);

    elem.innerHTML = `
        <p>${field.value}</p> 
        <p style="${dateCheck.dateStyle}">Date: ${date.value}</p>
        <div class="options">
        <select id="status">
            <option value="pending">Pending</option>
            <option value="done">Done</option>
        </select>
        <button onClick="deleteTodo(${id_count});">Delete</button> 
        <button onclick="updateTodo(${id_count})">Update</button>
        </div>`;

    todos.appendChild(elem);
    id_count += 1;
}

function updateTodo(id) {
    var field = document.getElementById("input");
    var date = document.getElementById("date");
    var update = document.getElementById(id);

    if (!field.value) {
        alert("Error: Please enter a task.");
        return;
    }
    if (!date.value) {
        alert("Error: Please select a date.");
        return;
    }

    var dateCheck = checkDate(date.value);
    if (!dateCheck.isValid) return;

    update.innerHTML = `
        <p>${field.value}</p> 
        <p style="${dateCheck.dateStyle}">Date: ${date.value}</p>
        <div class="options">
        <select id="status">
            <option value="pending">Pending</option>
            <option value="done">Done</option>
        </select>
        <button onClick="deleteTodo(${id});">Delete</button> 
        <button onclick="updateTodo(${id})">Update</button>
        </div>`;
}

function deleteTodo(id){
    var del = document.getElementById(id);
    var parentElem = del.parentNode;
    parentElem.removeChild(del);
}

function checkDate(date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var inputDate = new Date(date + "T00:00:00");

    if (inputDate < today) {
        alert("Error: The task cannot be set for a past date");
        return { isValid: false };
    }
    var isToday = inputDate.getTime() === today.getTime();
    var dateStyle = isToday ? 'color: red;' : ''; 
    
    return { isValid: true, dateStyle: dateStyle };
}
