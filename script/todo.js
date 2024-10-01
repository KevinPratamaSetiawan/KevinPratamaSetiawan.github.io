document.addEventListener('DOMContentLoaded', loadItems);
document.getElementById('add-item-btn').addEventListener('click', addItem);
const scheduleFilter = '[S]';
const weeklyScheduleFilter = '[W]';
const dailyScheduleFilter = '[D]';

function addItem() {
    const filterPattern = /\[S\]|\[W\]|\[D\]/g;
    let text = document.getElementById('new-item').value.trim();

    if (text !== '') {
        const todoId = (Math.floor(Math.random() * 10000) + 1).toString().padStart(5, '0');
        let scheduleType = '';
        let scheduleIndicator = false;

        if(text.includes(scheduleFilter) || text.includes(weeklyScheduleFilter) || text.includes(dailyScheduleFilter)){
            scheduleIndicator = true;
        }

        // Handle Schedule Filtering
        if(scheduleIndicator === true){
            if (text.includes(scheduleFilter)) {
                scheduleType = '[S]';
            }else if (text.includes(dailyScheduleFilter)) {
                scheduleType = '[D]';
            }else if (text.includes(weeklyScheduleFilter)) {
                scheduleType = '[W]';
            }else{
                scheduleType = '';
            }

            text = text.replace(filterPattern, '').replace(/\s+/g, ' ').trim();
        }
        
        // Handle Title and Description Filtering
        let [titleText, descriptionText] = text.includes('=>') ? text.split('=>').map(str => str.trim()) : [text, 'no description'];

        const li = createListItem(todoId, titleText, descriptionText, false, false, scheduleIndicator, scheduleType);

        moveToList(li, false, false, scheduleIndicator);

        saveItem(todoId, titleText, descriptionText, false, false, scheduleIndicator, scheduleType);
        document.getElementById('new-item').value = '';

        updateCounter();
        displayTodoRatios();
    }
}

function createListItem(todoId, titleText, descriptionText, completed, priority, schedule, scheduleType) {
    // Create li element
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const divTop = document.createElement('div');
    divTop.classList.add('todo-summary');

    const divBot = document.createElement('div');
    divBot.classList.add('todo-detail');
    divBot.style.display = 'none';

    // Handle Checkbox Element
    const checkboxIcon = document.createElement('i');
    checkboxIcon.classList.add('fa-regular', completed ? 'fa-circle-check' : 'fa-circle');
    checkboxIcon.addEventListener('click', toggleComplete);

    // Handle Priority Toggle Element
    const priorityBtn = document.createElement('i');
    priorityBtn.classList.add(priority ? 'fa-circle-exclamation' : 'fa-circle');
    priorityBtn.classList.add(priority ? 'fa-solid' : 'fa-regular');
    priorityBtn.classList.add('priority-indicator');
    priorityBtn.addEventListener('click', togglePriority);

    // Handle Delete Button Element
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fa-solid', 'fa-trash-can');
    deleteBtn.addEventListener('click', removeItem);

    // Handle Title and Schedule Type Text Element
    const pTitle = document.createElement('p');
    pTitle.classList.add('todo-title');
    pTitle.innerHTML = titleText;

    if(schedule){
        let todayAlert = ']';
        scheduleType = scheduleType.slice(0, -1);
        const days = [ 
                        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 
                        'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
                    ];
        
        let day = days.findIndex(day => titleText.includes(day));
        let today = new Date().getDay();

        if(day !== -1 && day%7 === today){
            todayAlert = '-T]';
        }

        const spanScheduleType = document.createElement('span');
        spanScheduleType.innerText = scheduleType + todayAlert;
        pTitle.prepend(spanScheduleType);
    }

    if (completed) {
        pTitle.classList.add('completed');
    }

    pTitle.addEventListener('click', toggleDetail);

    // Handle Description and todoId Text Element
    const pDescription = document.createElement('p');
    pDescription.classList.add('todo-description');
    pDescription.innerHTML = descriptionText;

    if(descriptionText === 'no description'){
        pDescription.style.color = 'var(--light-gray)'
    }else{
        const arrowSpan = document.createElement('span');
        const arrowI = document.createElement('i');
        arrowI.classList.add('fa-solid', 'fa-angle-right', 'fa-smQ');

        // arrowSpan.appendChild(arrowI);

        for (let i = 0; i < 3; i++) {
            const clonedArrowI = arrowI.cloneNode(true);
            arrowSpan.appendChild(clonedArrowI);
        }

        pDescription.prepend(arrowSpan);
    }

    const spanId = document.createElement('span');
    spanId.classList.add('todo-id');
    spanId.innerText = 'ID:' + todoId;

    // pDescription.appendChild(spanId);

    // Composing The li Element
    divTop.appendChild(checkboxIcon);
    divTop.appendChild(priorityBtn);
    divTop.appendChild(pTitle);
    divTop.appendChild(deleteBtn);
    
    divBot.appendChild(pDescription);
    divBot.appendChild(spanId);

    li.appendChild(divTop);
    li.appendChild(divBot);

    return li;
}

function moveToList(li, completed, priority, schedule) {
    const ulSchedule = document.getElementById('todo-schedule');
    const ulItems = document.getElementById('todo-items');
    const ulFinish = document.getElementById('todo-finish');
    const ulPriority = document.getElementById('todo-priority');

    if (completed) {
        ulFinish.appendChild(li);
    } else if (schedule) {
        ulSchedule.appendChild(li);
    } else if (priority) {
        ulPriority.appendChild(li);
    } else {
        ulItems.appendChild(li);
    }

    updateCounter();
    displayTodoRatios();
}

function toggleComplete(event) {
    const icon = event.target;
    const li = icon.parentElement.parentElement;
    const id = li.querySelector('.todo-id').textContent.slice(3);
    const title = li.querySelector('.todo-title');
    const isChecked = icon.classList.contains('fa-circle-check');

    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.id === id);

    if (isChecked) {
        icon.classList.replace('fa-circle-check', 'fa-circle');
        title.classList.remove('completed');
        updateItem(id, false, item.priority);
        moveToList(li, false, item.priority, item.schedule);
    } else {
        icon.classList.replace('fa-circle', 'fa-circle-check');
        title.classList.add('completed');
        updateItem(id, true, item.priority);
        moveToList(li, true, item.priority, item.schedule);
    }

    updateCounter();
    displayTodoRatios();
}

function togglePriority(event) {
    const icon = event.target;
    const li = icon.parentElement.parentElement;
    const id = li.querySelector('.todo-id').textContent.slice(3);
    const isPriority = icon.classList.contains('fa-circle-exclamation');

    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.id === id);

    if (isPriority) {
        icon.classList.replace('fa-circle-exclamation', 'fa-circle');
        icon.classList.replace('fa-solid', 'fa-regular');
        updateItem(id, item.completed, false);
        moveToList(li, item.completed, false, item.schedule);
    } else {
        icon.classList.replace('fa-circle', 'fa-circle-exclamation');
        icon.classList.replace('fa-regular', 'fa-solid');
        updateItem(id, item.completed, true);
        moveToList(li, item.completed, true, item.schedule);
    }

    updateCounter();
    displayTodoRatios();
}

function removeItem(event) {
    const li = event.target.parentElement.parentElement;
    const id = li.querySelector('.todo-id').textContent.slice(3);
    li.remove();
    deleteItem(id);

    updateCounter();
    displayTodoRatios();
}

function toggleDetail(event){
    const li = event.target.parentElement.parentElement;
    const summary = li.querySelector('.todo-title');
    const detail = li.querySelector('.todo-detail');

    const allTodoItems = document.querySelectorAll('.todo-item');

    allTodoItems.forEach(item => {
        const itemDetail = item.querySelector('.todo-detail');
        const itemSummary = item.querySelector('.todo-title');

        if (item !== li && itemDetail.style.display === 'flex') {
            itemDetail.style.display = 'none';
            itemSummary.classList.remove('open');
        }
    });

    if(detail.style.display === 'none' || detail.style.display === ''){
        detail.style.display = 'flex';
        summary.classList.add('open');
    }else{
        detail.style.display = 'none';
        summary.classList.remove('open');
    }
}

// Local Storage Handler
function loadItems() {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];

    items.sort((a, b) => a.completed - b.completed);

    items.forEach(item => {
        const li = createListItem(item.id, item.title, item.description, item.completed, item.priority, item.schedule, item.scheduleType);
        moveToList(li, item.completed, item.priority, item.schedule);
    });

    updateCounter();
}

function saveItem(todoId, titleText, descriptionText, completed, priority, schedule, scheduleType) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items.push({ 
        id: todoId,
        title: titleText, 
        description: descriptionText, 
        completed: completed, 
        priority: priority,
        schedule: schedule,
        scheduleType: scheduleType
    });
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function updateItem(todoId, completed, priority) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.id === todoId);
    if (item) {
        item.completed = completed;
        item.priority = priority;
    }
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function deleteItem(todoId) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items = items.filter(item => item.id !== todoId);
    localStorage.setItem('todoItems', JSON.stringify(items));
}

// List Visual Handler
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
        const correspondingList = todoLists[index];

        function checkTodoItems() {
            const todoItems = correspondingList.querySelectorAll('.todo-item');
            
            if (todoItems.length > 0) {
                toggle.setAttribute('open', 'true');
            } else {
                toggle.removeAttribute('open');
            }
        }

        if(index < 3){
            checkTodoItems();
        }
    });
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

    displayTodoRatios();
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

document.querySelectorAll('.ratio-item').forEach(item => {
    // item.addEventListener('mouseenter', () => {
    //     item.style.width = '97%'; // Apply hover width
    // });

    item.addEventListener('mouseleave', () => {
        displayTodoRatios();
    });
});


// window.numberToRoman = numberToRoman;
window.updateCounter = updateCounter;