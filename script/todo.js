document.addEventListener('DOMContentLoaded', loadItems);
document.getElementById('add-item-btn').addEventListener('click', addItem);

function addItem() {
    const itemText = document.getElementById('new-item').value.trim();
    if (itemText !== '') {
        const ul = document.getElementById('todo-items');
        const li = createListItem(itemText, false, false);

        const match = itemText.match(/^(\d+)\.\s+(.*)$/);
        if (match) {
            const position = parseInt(match[1], 10) - 1;
            insertItemAtPosition(ul, li, position);
        } else {
            appendOrInsertAfterNumbered(ul, li);
        }

        saveItem(itemText, false, false);
        document.getElementById('new-item').value = '';

        updateCounter();
    }
}

function createListItem(text, completed, priority) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    if (document.body.classList.contains('dark-mode')) {
        li.classList.add('dark-mode');
    }

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
}

function moveToList(li, completed, priority) {
    const ulItems = document.getElementById('todo-items');
    const ulFinish = document.getElementById('todo-finish');
    const ulPriority = document.getElementById('todo-priority');

    if (completed) {
        ulFinish.appendChild(li);
    } else if (priority) {
        ulPriority.appendChild(li);
    } else {
        ulItems.appendChild(li);
    }
    updateCounter();
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

function insertItemAtPosition(ul, li, position) {
    if (position >= ul.children.length) {
        ul.appendChild(li);
    } else {
        ul.insertBefore(li, ul.children[position]);
    }
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
    const priorityUl = document.querySelector("#todo-priority");
    const priorityNum = numberToRoman(priorityUl.querySelectorAll("li").length);
    document.getElementById('priority-display-num').textContent = priorityNum;

    const itemsUl = document.querySelector("#todo-items");
    const itemsNum = numberToRoman(itemsUl.querySelectorAll("li").length);
    document.getElementById('items-display-num').textContent = itemsNum;

    const finishUl = document.querySelector("#todo-finish");
    const finishNum = numberToRoman(finishUl.querySelectorAll("li").length);
    document.getElementById('finish-display-num').textContent = finishNum;
}

function numberToRoman(num) {
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];
    
    let result = '';

    if(num === 0){
        result = '零';
    }
    
    for (const { value, numeral } of romanNumerals) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }
    
    return result;
}

//Todo Clock
document.addEventListener('DOMContentLoaded', function() {startTime();});

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

    if (window.innerWidth > 660) {
        if(langChoice % 2 === 0){
            document.getElementById('todo-date').innerHTML = dayNameIndo[day].slice(0, 3) + ', ' + (date < 10 ? '0' : '') + date + ' ' + monthNameIndo[month].slice(0, 3) + ' ' + year;
            document.getElementById('todo-time').innerHTML = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + " ";
        }
    } else {
        if(langChoice % 2 === 0){
            document.getElementById('todo-date').innerHTML = (date < 10 ? '0' : '') + date + ' ' + monthNameIndo[month].slice(0, 3) + ' ' + year;
            document.getElementById('todo-time').innerHTML = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + " ";
        }
    }

    if(h > 12){
        h -= 12;
        ampm = 'PM';
    }

    if (window.innerWidth > 660) {
        if(langChoice % 2 === 1){
            document.getElementById('todo-date').innerHTML = dayNameEn[day].slice(0, 3) + ', ' + (date < 10 ? '0' : '') + date + ' ' + monthNameEn[month].slice(0, 3) + ' ' + year;
            document.getElementById('todo-time').innerHTML = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + " " + ampm;
        }
    } else {
        if(langChoice % 2 === 1){
            document.getElementById('todo-date').innerHTML = (date < 10 ? '0' : '') + date + ' ' + monthNameEn[month].slice(0, 3) + ' ' + year;
            document.getElementById('todo-time').innerHTML = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + " " + ampm;
        }
    }

    setTimeout(startTime, 1000);
}

document.getElementById('todo-date').addEventListener('click', function() { copyClock('todo-date'); });
document.getElementById('todo-time').addEventListener('click', function() { copyClock('todo-time'); });
document.getElementById('clock-lang').addEventListener('click', function() { 
    if (langChoice % 2 === 1) {
        document.getElementById('clock-lang').innerHTML = 'ID';
    }else if (langChoice % 2 === 0) {
        document.getElementById('clock-lang').innerHTML = 'EN';
    }
    langChoice++; 
});


function copyClock (type){
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let day = today.getDay();
    let h = today.getHours();
    let m = today.getMinutes();
    let ampm = 'AM';
    let copyText;

    if(langChoice % 2 === 0){
        if(type === 'todo-date'){
            copyText = dayNameIndo[day] + ', ' + (date < 10 ? '0' : '') + date + ' ' + monthNameIndo[month] + ' ' + year;
        }else if(type === 'todo-time'){   
            copyText = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + " ";
        }
    }

    if(h > 12){
        h -= 12;
        ampm = 'PM';
    }

    if(langChoice % 2 === 1){
        if(type === 'todo-date'){
            copyText = dayNameEn[day] + ', ' + (date < 10 ? '0' : '') + date + ' ' + monthNameEn[month] + ' ' + year;
        }else if(type === 'todo-time'){   
            copyText = (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + " " + ampm;
        }
    }

    navigator.clipboard.writeText(copyText);
    document.getElementById(type).innerHTML = '<i class="fa-solid fa-copy"></i> Copied!';
}