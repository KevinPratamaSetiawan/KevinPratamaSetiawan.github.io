document.addEventListener('DOMContentLoaded', loadItems);
document.getElementById('add-item-btn').addEventListener('click', addItem);
const scheduleFilter = '[S]';

function addItem() {
    const itemText = document.getElementById('new-item').value.trim();
    if (itemText !== '') {
        let ul = document.getElementById('todo-items');
        const li = createListItem(itemText, false, false);

        // if(itemText.startsWith(scheduleFilter)){
        //     ul = document.getElementById('todo-schedule');
        // }

        if(itemText.endsWith(scheduleFilter)){
            ul = document.getElementById('todo-schedule');
        }

        appendOrInsertAfterNumbered(ul, li);

        saveItem(itemText, false, false);
        document.getElementById('new-item').value = '';

        updateCounter();
        displayTodoRatios();
    }
}

function createListItem(text, completed, priority) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const checkboxIcon = document.createElement('i');
    checkboxIcon.classList.add('fa-regular', completed ? 'fa-circle-check' : 'fa-circle');
    checkboxIcon.addEventListener('click', toggleComplete);

    const span = document.createElement('span');
    span.textContent = text;
    if (completed) {
        span.classList.add('completed');
    }

    const priorityBtn = document.createElement('i');
    priorityBtn.classList.add(priority ? 'fa-circle-exclamation' : 'fa-circle');
    priorityBtn.classList.add(priority ? 'fa-solid' : 'fa-regular');
    priorityBtn.classList.add('priority-indicator');
    priorityBtn.addEventListener('click', togglePriority);

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fa-solid', 'fa-trash-can');
    deleteBtn.addEventListener('click', removeItem);

    li.appendChild(checkboxIcon);
    li.appendChild(priorityBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

function toggleComplete(event) {
    const icon = event.target;
    const li = icon.parentElement;
    const span = icon.nextElementSibling.nextElementSibling;
    const isChecked = icon.classList.contains('fa-circle');

    if (isChecked) {
        icon.classList.replace('fa-circle', 'fa-circle-check');
        span.classList.add('completed');
        updateItem(span.textContent, true, isPriority(li));
        moveToList(li, true, isPriority(li));
    } else {
        icon.classList.replace('fa-circle-check', 'fa-circle');
        span.classList.remove('completed');
        updateItem(span.textContent, false, isPriority(li));
        moveToList(li, false, isPriority(li));
    }
    updateCounter();
    displayTodoRatios();
}

function togglePriority(event) {
    const icon = event.target;
    const li = icon.parentElement;
    const span = li.querySelector('span');
    const isPriority = icon.classList.contains('fa-circle-exclamation');

    if (!isPriority) {
        icon.classList.replace('fa-circle', 'fa-circle-exclamation');
        icon.classList.replace('fa-regular', 'fa-solid');
        updateItem(span.textContent, isCompleted(li), true);
        moveToList(li, isCompleted(li), true);
    } else {
        icon.classList.replace('fa-circle-exclamation', 'fa-circle');
        icon.classList.replace('fa-solid', 'fa-regular');
        updateItem(span.textContent, isCompleted(li), false);
        moveToList(li, isCompleted(li), false);
    }
    updateCounter();
    displayTodoRatios();
}

function moveToList(li, completed, priority) {
    const ulSchedule = document.getElementById('todo-schedule');
    const ulItems = document.getElementById('todo-items');
    const ulFinish = document.getElementById('todo-finish');
    const ulPriority = document.getElementById('todo-priority');

    if (completed) {
        ulFinish.appendChild(li);
    } 
    // else if(li.querySelector('span').textContent.startsWith(scheduleFilter)){
    //     ulSchedule.appendChild(li);
    // } 
    else if(li.querySelector('span').textContent.endsWith(scheduleFilter)){
        ulSchedule.appendChild(li);
    } 
    else if (priority) {
        ulPriority.appendChild(li);
    } else {
        ulItems.appendChild(li);
    }
    updateCounter();
    displayTodoRatios();
}

function isCompleted(li) {
    return li.querySelector('span').classList.contains('completed');
}

function isPriority(li) {
    return li.querySelector('.fa-circle-exclamation') !== null;
}

function removeItem(event) {
    const li = event.target.parentElement;
    const itemText = li.querySelector('span').textContent;
    li.remove();
    deleteItem(itemText);

    updateCounter();
    displayTodoRatios();
}

function saveItem(text, completed, priority) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items.push({ text: text, completed: completed, priority: priority });
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function deleteItem(text) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items = items.filter(item => item.text !== text);
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function updateItem(text, completed, priority) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.text === text);
    if (item) {
        item.completed = completed;
        item.priority = priority;
    }
    localStorage.setItem('todoItems', JSON.stringify(items));
    updateCounter();
    displayTodoRatios();
}

function loadItems() {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const ulItems = document.getElementById('todo-items');
    const ulFinish = document.getElementById('todo-finish');
    const ulPriority = document.getElementById('todo-priority');

    items.sort((a, b) => a.completed - b.completed);

    items.forEach(item => {
        const li = createListItem(item.text, item.completed, item.priority);
        moveToList(li, item.completed, item.priority);
    });

    updateCounter();
}

function appendOrInsertAfterNumbered(ul, li) {
    const numberedItems = Array.from(ul.children).filter(item => /^\d+\.\s/.test(item.textContent));
    if (numberedItems.length > 0) {
        ul.insertBefore(li, numberedItems[numberedItems.length - 1].nextSibling);
    } else {
        ul.appendChild(li);
    }
}

function updateCounter(){
    const scheduleUl = document.getElementById('todo-schedule');
    const priorityUl = document.querySelector("#todo-priority");
    const itemsUl = document.querySelector("#todo-items");
    const finishUl = document.querySelector("#todo-finish");

    let scheduleNum, priorityNum, itemsNum, finishNum;
    const currentHistoryFormat = localStorage.getItem('currentHistoryCountFormat');

    if(currentHistoryFormat == 1){
        scheduleNum = scheduleUl.querySelectorAll("li").length.toString();
        priorityNum = priorityUl.querySelectorAll("li").length.toString();
        itemsNum = itemsUl.querySelectorAll("li").length.toString();
        finishNum = finishUl.querySelectorAll("li").length.toString();
    }else if(currentHistoryFormat == 2){
        scheduleNum = numberToRoman(scheduleUl.querySelectorAll("li").length);
        priorityNum = numberToRoman(priorityUl.querySelectorAll("li").length);
        itemsNum = numberToRoman(itemsUl.querySelectorAll("li").length);
        finishNum = numberToRoman(finishUl.querySelectorAll("li").length);
    }else if(currentHistoryFormat == 3){
        scheduleNum = numberToKanji(scheduleUl.querySelectorAll("li").length) + '<ruby>個<rt>こ</rt></ruby>';
        priorityNum = numberToKanji(priorityUl.querySelectorAll("li").length) + '<ruby>個<rt>こ</rt></ruby>';
        itemsNum = numberToKanji(itemsUl.querySelectorAll("li").length) + '<ruby>個<rt>こ</rt></ruby>';
        finishNum = numberToKanji(finishUl.querySelectorAll("li").length) + '<ruby>個<rt>こ</rt></ruby>';
    }

    document.getElementById('schedule-display-num').innerHTML = scheduleNum;
    document.getElementById('priority-display-num').innerHTML = priorityNum;
    document.getElementById('items-display-num').innerHTML = itemsNum;
    document.getElementById('finish-display-num').innerHTML = finishNum;
}

// Todo Clock
document.addEventListener('DOMContentLoaded', function() {
    startTime();
    displayTodoRatios();
});

let langChoice = 1;
let dayNameEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthNameEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dayNameIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
let monthNameIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function startTime() {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let day = today.getDay();
    let h = today.getHours();
    let m = today.getMinutes();
    let ampm = 'Ante Meridiem';

    if (h > 12) {
        h -= 12;
        ampm = 'Post Meridiem';
    }

    if (window.innerWidth > 660) {
        if (langChoice % 2 === 0) {
            document.getElementById('date-day').textContent = dayNameIndo[day].slice(0, 3) + ',';
            document.getElementById('date-digit').textContent = (date < 10 ? '0' : '') + date + ' ' + monthNameIndo[month].slice(0, 3) + ' ' + year;
            document.getElementById('time-digit').textContent = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m;
            document.getElementById('time-ampm').textContent = "WIB";
        } else {
            document.getElementById('date-day').textContent = dayNameEn[day].slice(0, 3) + ',';
            document.getElementById('date-digit').textContent = (date < 10 ? '0' : '') + date + ' ' + monthNameEn[month].slice(0, 3) + ' ' + year;
            document.getElementById('time-digit').textContent = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m;
            document.getElementById('time-ampm').textContent = ampm;
        }
    } else {
        if (ampm === 'Post Meridiem'){
            ampm = 'PM';
        }else {
            ampm = 'AM';
        }


        if (langChoice % 2 === 0) {
            document.getElementById('date-digit').textContent = (date < 10 ? '0' : '') + date + ' ' + monthNameIndo[month].slice(0, 3) + ' ' + year;
            document.getElementById('time-digit').textContent = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m;
            document.getElementById('time-ampm').textContent = "WIB";
        } else {
            document.getElementById('date-digit').textContent = (date < 10 ? '0' : '') + date + ' ' + monthNameEn[month].slice(0, 3) + ' ' + year;
            document.getElementById('time-digit').textContent = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m;
            document.getElementById('time-ampm').textContent = ampm;
        }
    }

    setTimeout(startTime, 1000);
}

document.getElementById('todo-date').addEventListener('click', function() {copyClock('todo-date');});
document.getElementById('todo-time').addEventListener('click', function() {copyClock('todo-time');});
document.getElementById('clock-lang').addEventListener('click', function() {
    if (langChoice % 2 === 1) {
        document.getElementById('clock-lang').innerHTML = 'ID';
    } else {
        document.getElementById('clock-lang').innerHTML = 'EN';
    }
    langChoice++;
});

function copyClock(type) {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let day = today.getDay();
    let h = today.getHours();
    let m = today.getMinutes();
    let ampm = 'Ante Meridiem';
    let copyText;

    if (h > 12) {
        h -= 12;
        ampm = 'Post Meridiem';
    }

    if (langChoice % 2 === 0) {
        if (type === 'todo-date') {
            copyText = dayNameIndo[day] + ', ' + (date < 10 ? '0' : '') + date + ' ' + monthNameIndo[month] + ' ' + year;
        } else if (type === 'todo-time') {
            copyText = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m;
        }
    } else {
        if (type === 'todo-date') {
            copyText = dayNameEn[day] + ', ' + (date < 10 ? '0' : '') + date + ' ' + monthNameEn[month] + ' ' + year;
        } else if (type === 'todo-time') {
            copyText = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + " " + ampm;
        }
    }

    navigator.clipboard.writeText(copyText);
    const originalContent = document.getElementById(type).innerHTML;
    document.getElementById(type).innerHTML = '<i class="fa-solid fa-copy"></i> Copied!';
    
    setTimeout(function() {
        document.getElementById(type).innerHTML = originalContent;
    }, 1000);
}

function displayTodoRatios (){
    const scheduleWidth = document.querySelector("#todo-schedule").querySelectorAll("li").length;
    const priorityWidth = document.querySelector("#todo-priority").querySelectorAll("li").length;
    const taskWidth = document.querySelector("#todo-items").querySelectorAll("li").length;
    const completeWidth = document.querySelector("#todo-finish").querySelectorAll("li").length;
    const totalWidth = scheduleWidth + priorityWidth + taskWidth + completeWidth;

    document.getElementById('schedule-ratio').style.width = (scheduleWidth / totalWidth * 100) + '%';
    document.getElementById('priority-ratio').style.width = (priorityWidth / totalWidth * 100) + '%';
    document.getElementById('task-ratio').style.width = (taskWidth / totalWidth * 100) + '%';
    document.getElementById('complete-ratio').style.width = (completeWidth / totalWidth * 100) + '%';

    document.querySelector('#schedule-ratio p').innerText = (scheduleWidth / totalWidth * 100).toFixed(2).toString().padStart(2, '0') + '%';
    document.querySelector('#priority-ratio p').innerText = (priorityWidth / totalWidth * 100).toFixed(2).toString().padStart(2, '0') + '%';
    document.querySelector('#task-ratio p').innerText = (taskWidth / totalWidth * 100).toFixed(2).toString().padStart(2, '0') + '%';
    document.querySelector('#complete-ratio p').innerText = (completeWidth / totalWidth * 100).toFixed(2).toString().padStart(2, '0') + '%';

    if(priorityWidth === 0 && taskWidth === 0 && completeWidth === 0){
        document.getElementById('schedule-ratio').style.borderRadius = '5px';
    }else if(priorityWidth !== 0 || taskWidth !== 0 || completeWidth !== 0){
        document.getElementById('schedule-ratio').style.borderRadius = '5px 0 0 5px';
    }

    if(scheduleWidth === 0 && taskWidth === 0 && completeWidth === 0){
        document.getElementById('priority-ratio').style.borderRadius = '5px';
    }else if(scheduleWidth === 0 && (taskWidth !== 0 || completeWidth !== 0)){
        document.getElementById('priority-ratio').style.borderRadius = '5px 0 0 5px';
    }else if(scheduleWidth !== 0 && taskWidth === 0 && completeWidth === 0){
        document.getElementById('priority-ratio').style.borderRadius = ' 0 5px 5px 0';
    }else if(scheduleWidth !== 0 && (taskWidth !== 0 || completeWidth !== 0)){
        document.getElementById('priority-ratio').style.borderRadius = '0';
    }

    if(scheduleWidth === 0 && priorityWidth === 0 && completeWidth === 0){
        document.getElementById('task-ratio').style.borderRadius = '5px';
    }else if((scheduleWidth !== 0 || priorityWidth !== 0) && completeWidth === 0){
        document.getElementById('task-ratio').style.borderRadius = '0 5px 5px 0';
    }else if(scheduleWidth === 0 && priorityWidth === 0 && completeWidth !== 0){
        document.getElementById('task-ratio').style.borderRadius = '5px 0 0 5px';
    }else if((scheduleWidth !== 0 || priorityWidth !== 0) && completeWidth !== 0){
        document.getElementById('task-ratio').style.borderRadius = '0';
    }

    if(scheduleWidth === 0 && priorityWidth === 0 && taskWidth === 0){
        document.getElementById('complete-ratio').style.borderRadius = '5px';
    }else if(scheduleWidth !== 0 || priorityWidth !== 0 || taskWidth !== 0){
        document.getElementById('complete-ratio').style.borderRadius = '0 5px 5px 0';
    }

    // Control Todo List Toggle
    const todoToggles = document.querySelectorAll('.todo-list-toggles');
    const todoLists = document.querySelectorAll('.todo-lists');

    todoToggles.forEach((toggle, index) => {
        if(index < 3){   
            const correspondingList = todoLists[index];
            console.log(index);
            console.log(todoToggles);
            console.log(todoLists);
            
            function checkTodoItems() {
                const todoItems = correspondingList.querySelectorAll('.todo-item');
                
                if (todoItems.length > 0) {
                    toggle.setAttribute('open', 'true');
                } else {
                    toggle.removeAttribute('open');
                }
            }  
            checkTodoItems();
        }
    });
}

// window.numberToRoman = numberToRoman;
window.updateCounter = updateCounter;