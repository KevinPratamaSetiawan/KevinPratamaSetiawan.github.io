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
    // Replace "-." with the listReplaceChar in descriptionText
    descriptionText = listStyling(descriptionText);

    // Create li element
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const divTop = document.createElement('div');
    divTop.classList.add('todo-summary');

    const divBot = document.createElement('div');
    divBot.classList.add('todo-detail');
    divBot.style.display = 'none';

    const divDescription = document.createElement('div');
    divDescription.classList.add('todo-description-container');

    // Handle Checkbox Element
    const checkboxIcon = document.createElement('i');
    checkboxIcon.classList.add(completed ? 'fa-circle-check' : 'fa-circle');
    checkboxIcon.classList.add(completed ? 'fa-solid' : 'fa-regular');
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
    const pDescription = document.createElement('ul');
    pDescription.classList.add('todo-description');
    
    if(descriptionText.includes('<br>')){
        const descriptionTexts = descriptionText.split(/<br>/);
        
        descriptionTexts.forEach(part => {
            if(part !== ''){
                const li = document.createElement('li');
                li.innerHTML = part.trim() + '<br>';
                pDescription.appendChild(li);
            }
        });
    }else{
        const li = document.createElement('li'); // Wrap the description in a single <li> if no <br> is found
        li.innerHTML = descriptionText.trim();
        pDescription.appendChild(li);
    }

    const dashIcons = pDescription.querySelectorAll('.todo-list-dash');
    dashIcons.forEach((dashIcon) => { dashIcon.addEventListener('click', toggleListDash); });

    const circleIcons = pDescription.querySelectorAll('.todo-list-circle');
    circleIcons.forEach((circleIcon) => { circleIcon.addEventListener('click', toggleListCircle); });

    const checkboxIcons = pDescription.querySelectorAll('.todo-list-checkbox');
    checkboxIcons.forEach((checkboxIcon) => { checkboxIcon.addEventListener('click', toggleListCheckbox); });

    if(descriptionText === 'no description'){
        pDescription.style.color = 'var(--light-gray)'
    }else{
        const arrowSpan = document.createElement('span');
        const arrowI = document.createElement('i');
        arrowI.classList.add('fa-solid', 'fa-angle-right', 'fa-smQ');

        for (let i = 0; i < 3; i++) {
            const clonedArrowI = arrowI.cloneNode(true);
            arrowSpan.appendChild(clonedArrowI);
        }

        divDescription.prepend(arrowSpan);
    }

    const spanId = document.createElement('span');
    spanId.classList.add('todo-id');
    spanId.innerText = 'ID:' + todoId;
    spanId.addEventListener('click', copyFormattedContent);

    // Composing The li Element
    divTop.appendChild(checkboxIcon);
    divTop.appendChild(priorityBtn);
    divTop.appendChild(pTitle);
    divTop.appendChild(deleteBtn);

    divDescription.appendChild(pDescription);
    divBot.appendChild(divDescription);
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
        icon.classList.replace('fa-solid', 'fa-regular');
        title.classList.remove('completed');
        updateItem(id, false, item.priority);
        moveToList(li, false, item.priority, item.schedule);
    } else {
        icon.classList.replace('fa-circle', 'fa-circle-check');
        icon.classList.replace('fa-regular', 'fa-solid');
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

function updateItem(todoId, completed, priority, checkbox='none') {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.id === todoId);
    if (item) {
        item.completed = completed;
        item.priority = priority;
    }
    if (checkbox !== 'none'){
        checkbox = listStyling(checkbox);
        item.description = checkbox;
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
    const scheduleWidth = document.querySelector("#todo-schedule").querySelectorAll(".todo-item").length;
    const priorityWidth = document.querySelector("#todo-priority").querySelectorAll(".todo-item").length;
    const taskWidth = document.querySelector("#todo-items").querySelectorAll(".todo-item").length;
    const completeWidth = document.querySelector("#todo-finish").querySelectorAll(".todo-item").length;
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
    const scheduleUl = document.getElementById('todo-schedule').querySelectorAll(".todo-item").length;
    const priorityUl = document.querySelector("#todo-priority").querySelectorAll(".todo-item").length;
    const itemsUl = document.querySelector("#todo-items").querySelectorAll(".todo-item").length;
    const finishUl = document.querySelector("#todo-finish").querySelectorAll(".todo-item").length;

    let scheduleNum, priorityNum, itemsNum, finishNum;
    const currentHistoryFormat = localStorage.getItem('currentHistoryCountFormat');

    if(currentHistoryFormat == 1){
        scheduleNum = scheduleUl.toString();
        priorityNum = priorityUl.toString();
        itemsNum = itemsUl.toString();
        finishNum = finishUl.toString();
    }else if(currentHistoryFormat == 2){
        scheduleNum = numberToRoman(scheduleUl);
        priorityNum = numberToRoman(priorityUl);
        itemsNum = numberToRoman(itemsUl);
        finishNum = numberToRoman(finishUl);
    }else if(currentHistoryFormat == 3){
        scheduleNum = numberToKanji(scheduleUl) + '<ruby>個<rt>こ</rt></ruby>';
        priorityNum = numberToKanji(priorityUl) + '<ruby>個<rt>こ</rt></ruby>';
        itemsNum = numberToKanji(itemsUl) + '<ruby>個<rt>こ</rt></ruby>';
        finishNum = numberToKanji(finishUl) + '<ruby>個<rt>こ</rt></ruby>';
    }

    document.getElementById('schedule-display-num').innerHTML = scheduleNum;
    document.getElementById('priority-display-num').innerHTML = priorityNum;
    document.getElementById('items-display-num').innerHTML = itemsNum;
    document.getElementById('finish-display-num').innerHTML = finishNum;

    displayTodoRatios();
}

function toggleListDash(event){
    const icon = event.target;
    const divBot = icon.parentElement.parentElement.parentElement.parentElement;
    const id = divBot.querySelector('.todo-id').textContent.slice(3);
    const isChecked = icon.classList.contains('fa-plus');

    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.id === id);

    if (isChecked) {
        icon.classList.replace('fa-plus', 'fa-minus');
        const pDescription = divBot.querySelector('.todo-description').innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '').trim();
        updateItem(id, item.completed, item.priority, pDescription);
    } else {
        icon.classList.replace('fa-minus', 'fa-plus');
        const pDescription = divBot.querySelector('.todo-description').innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '').trim();
        updateItem(id, item.completed, item.priority, pDescription);
    }
}

function toggleListCircle(event){
    const icon = event.target;
    const divBot = icon.parentElement.parentElement.parentElement.parentElement;
    console.log(divBot)
    const id = divBot.querySelector('.todo-id').textContent.slice(3);
    const isChecked = icon.classList.contains('fa-circle-dot');

    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.id === id);

    if (isChecked) {
        icon.classList.replace('fa-circle-dot', 'fa-circle');
        icon.classList.replace('fa-solid', 'fa-regular');
        const pDescription = divBot.querySelector('.todo-description').innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '').trim();
        updateItem(id, item.completed, item.priority, pDescription);
    } else {
        icon.classList.replace('fa-circle', 'fa-circle-dot');
        icon.classList.replace('fa-regular', 'fa-solid');
        const pDescription = divBot.querySelector('.todo-description').innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '').trim();
        updateItem(id, item.completed, item.priority, pDescription);
    }
}

function toggleListCheckbox(event){
    const icon = event.target;
    const divBot = icon.parentElement.parentElement.parentElement.parentElement;
    const id = divBot.querySelector('.todo-id').textContent.slice(3);
    const isChecked = icon.classList.contains('fa-square-check');

    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.id === id);

    if (isChecked) {
        icon.classList.replace('fa-square-check', 'fa-square');
        icon.classList.replace('fa-solid', 'fa-regular');
        const pDescription = divBot.querySelector('.todo-description').innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '').trim();
        updateItem(id, item.completed, item.priority, pDescription);
    } else {
        icon.classList.replace('fa-square', 'fa-square-check');
        icon.classList.replace('fa-regular', 'fa-solid');
        const pDescription = divBot.querySelector('.todo-description').innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '').trim();
        updateItem(id, item.completed, item.priority, pDescription);
    }
}

function copyFormattedContent(event){
    const icon = event.target;
    const divBot = icon.parentElement.parentElement;
    const id = divBot.querySelector('.todo-id').textContent.slice(3);

    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.id === id);

    let copyText = item.scheduleType + item.title;

    if(item.description !== 'no description'){
        copyText = item.scheduleType + item.title + ' => ' + item.description;
    }

    navigator.clipboard.writeText(copyText);
    const originalContent = divBot.querySelector('.todo-id').textContent;
    divBot.querySelector('.todo-id').innerHTML = '<i class="fa-solid fa-copy"></i> Copied!';
    
    setTimeout(function() {
        divBot.querySelector('.todo-id').innerHTML = originalContent;
    }, 1000);
}

const listReplaceChar = ['<i class="fa-solid fa-minus todo-list-dash todo-list-indent-one"></i>', '<i class="fa-solid fa-minus todo-list-dash todo-list-indent-two"></i>', '<i class="fa-solid fa-minus todo-list-dash todo-list-indent-three"></i>'];
const checkedListReplaceChar = ['<i class="fa-solid fa-plus todo-list-dash todo-list-indent-one"></i>', '<i class="fa-solid fa-plus todo-list-dash todo-list-indent-two"></i>', '<i class="fa-solid fa-plus todo-list-dash todo-list-indent-three"></i>'];
const dotReplaceChar = ['<i class="fa-regular fa-circle todo-list-circle todo-list-indent-one"></i>', '<i class="fa-regular fa-circle todo-list-circle todo-list-indent-two"></i>', '<i class="fa-regular fa-circle todo-list-circle todo-list-indent-three"></i>'];
const checkedDotReplaceChar = ['<i class="fa-solid fa-circle-dot todo-list-circle todo-list-indent-one"></i>', '<i class="fa-solid fa-circle-dot todo-list-circle todo-list-indent-two"></i>', '<i class="fa-solid fa-circle-dot todo-list-circle todo-list-indent-three"></i>'];
const chekcboxReplaceChar = ['<i class="fa-regular fa-square todo-list-checkbox todo-list-indent-one"></i>', '<i class="fa-regular fa-square todo-list-checkbox todo-list-indent-two"></i>', '<i class="fa-regular fa-square todo-list-checkbox todo-list-indent-three"></i>'];
const checkedChekcboxReplaceChar = ['<i class="fa-solid fa-square-check todo-list-checkbox todo-list-indent-one"></i>', '<i class="fa-solid fa-square-check todo-list-checkbox todo-list-indent-two"></i>', '<i class="fa-solid fa-square-check todo-list-checkbox todo-list-indent-three"></i>'];
const breakReplaceChar = '.<br>';
const colonReplaceChar = ':<br>';

function convertBreak(text) {
    if(text.includes('<br>')){
        text = text.replace(new RegExp(`\\s*${colonReplaceChar}\\s*`, 'g'), ":.");
        text = text.replace(new RegExp(`\\s*${breakReplaceChar}\\s*`, 'g'), "..");
    }else {
        text = text.replace(/\:\./g, colonReplaceChar);
        text = text.replace(/\.\./g, breakReplaceChar);
    }

    return text;
}

function listStyling(text){
    if(text.includes('</i>')){
        text = text.replace(new RegExp(`\\s*${listReplaceChar[2]}\\s*`, 'g'), "-...");
        text = text.replace(new RegExp(`\\s*${checkedListReplaceChar[2]}\\s*`, 'g'), "+...");
        text = text.replace(new RegExp(`\\s*${dotReplaceChar[2]}\\s*`, 'g'), "*...");
        text = text.replace(new RegExp(`\\s*${checkedDotReplaceChar[2]}\\s*`, 'g'), "@...");
        text = text.replace(new RegExp(`\\s*${chekcboxReplaceChar[2]}\\s*`, 'g'), "=...");
        text = text.replace(new RegExp(`\\s*${checkedChekcboxReplaceChar[2]}\\s*`, 'g'), "%...");

        text = text.replace(new RegExp(`\\s*${listReplaceChar[1]}\\s*`, 'g'), "-..");
        text = text.replace(new RegExp(`\\s*${checkedListReplaceChar[1]}\\s*`, 'g'), "+..");
        text = text.replace(new RegExp(`\\s*${dotReplaceChar[1]}\\s*`, 'g'), "*..");
        text = text.replace(new RegExp(`\\s*${checkedDotReplaceChar[1]}\\s*`, 'g'), "@..");
        text = text.replace(new RegExp(`\\s*${chekcboxReplaceChar[1]}\\s*`, 'g'), "=..");
        text = text.replace(new RegExp(`\\s*${checkedChekcboxReplaceChar[1]}\\s*`, 'g'), "%..");

        text = text.replace(new RegExp(`\\s*${listReplaceChar[0]}\\s*`, 'g'), "-.");
        text = text.replace(new RegExp(`\\s*${checkedListReplaceChar[0]}\\s*`, 'g'), "+.");
        text = text.replace(new RegExp(`\\s*${dotReplaceChar[0]}\\s*`, 'g'), "*.");
        text = text.replace(new RegExp(`\\s*${checkedDotReplaceChar[0]}\\s*`, 'g'), "@.");
        text = text.replace(new RegExp(`\\s*${chekcboxReplaceChar[0]}\\s*`, 'g'), "=.");
        text = text.replace(new RegExp(`\\s*${checkedChekcboxReplaceChar[0]}\\s*`, 'g'), "%.");
    }else {
        text = text.replace(/\s*-\.\.\.\s*/g, listReplaceChar[2]);
        text = text.replace(/\s*\+\.\.\.\s*/g, checkedListReplaceChar[2]);
        text = text.replace(/\s*\*\.\.\.\s*/g, dotReplaceChar[2]);
        text = text.replace(/\s*\@\.\.\.\s*/g, checkedDotReplaceChar[2]);
        text = text.replace(/\s*=\.\.\.\s*/g, chekcboxReplaceChar[2]);
        text = text.replace(/\s*%\.\.\.\s*/g, checkedChekcboxReplaceChar[2]);

        text = text.replace(/\s*-\.\.\s*/g, listReplaceChar[1]);
        text = text.replace(/\s*\+\.\.\s*/g, checkedListReplaceChar[1]);
        text = text.replace(/\s*\*\.\.\s*/g, dotReplaceChar[1]);
        text = text.replace(/\s*\@\.\.\s*/g, checkedDotReplaceChar[1]);
        text = text.replace(/\s*=\.\.\s*/g, chekcboxReplaceChar[1]);
        text = text.replace(/\s*%\.\.\s*/g, checkedChekcboxReplaceChar[1]);

        text = text.replace(/\s*-\.\s*/g, listReplaceChar[0]);
        text = text.replace(/\s*\+\.\s*/g, checkedListReplaceChar[0]);
        text = text.replace(/\s*\*\.\s*/g, dotReplaceChar[0]);
        text = text.replace(/\s*\@\.\s*/g, checkedDotReplaceChar[0]);
        text = text.replace(/\s*=\.\s*/g, chekcboxReplaceChar[0]);
        text = text.replace(/\s*%\.\s*/g, checkedChekcboxReplaceChar[0]);
    }

    return convertBreak(text);
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
    item.addEventListener('mouseleave', () => {
        displayTodoRatios();
    });
});


// window.numberToRoman = numberToRoman;
window.updateCounter = updateCounter;