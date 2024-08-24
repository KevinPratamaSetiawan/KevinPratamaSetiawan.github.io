document.addEventListener('DOMContentLoaded', loadItems);
document.getElementById('add-item-btn').addEventListener('click', addItem);

function addItem() {
    const itemText = document.getElementById('new-item').value.trim();
    if (itemText !== '') {
        const ul = document.getElementById('todo-items');
        const li = createListItem(itemText, false);
        
        ul.prepend(li);

        // Save item to local storage
        saveItem(itemText, false);

        // Clear the input field
        document.getElementById('new-item').value = '';
    }
}

function createListItem(text, completed) {
    const li = document.createElement('li');

    // Create a span for the checkbox icon
    const checkboxIcon = document.createElement('i');
    checkboxIcon.classList.add('fa-regular', completed ? 'fa-circle-check' : 'fa-circle');
    checkboxIcon.addEventListener('click', toggleComplete);

    // Create a span for the item text
    const span = document.createElement('span');
    span.textContent = text;
    if (completed) {
        span.classList.add('completed');
    }

    // Create a delete button with trash icon
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fa-solid', 'fa-trash-can');
    deleteBtn.addEventListener('click', removeItem);

    // Append checkbox icon, span, and delete button to the li element
    li.appendChild(checkboxIcon);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

function removeItem(event) {
    const li = event.target.parentElement;
    const itemText = li.querySelector('span').textContent;
    li.remove();

    // Remove item from local storage
    deleteItem(itemText);
}

function toggleComplete(event) {
    const icon = event.target;
    const li = icon.parentElement;
    const ul = document.getElementById('todo-items');
    const span = icon.nextElementSibling;
    const isChecked = icon.classList.contains('fa-circle');

    if (isChecked) {
        icon.classList.replace('fa-circle', 'fa-circle-check');
        span.classList.add('completed');
        ul.appendChild(li); // Move to the bottom
    } else {
        icon.classList.replace('fa-circle-check', 'fa-circle');
        span.classList.remove('completed');
        ul.prepend(li); // Move to the top
    }

    // Update item completion status in local storage
    updateItem(span.textContent, isChecked);
}

function saveItem(text, completed) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items.push({ text: text, completed: completed });
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function deleteItem(text) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items = items.filter(item => item.text !== text);
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function updateItem(text, completed) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const item = items.find(item => item.text === text);
    if (item) {
        item.completed = completed;
    }
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function loadItems() {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    const ul = document.getElementById('todo-items');

    // Sort items so that completed ones are at the bottom
    items.sort((a, b) => a.completed - b.completed);

    items.forEach(item => {
        const li = createListItem(item.text, item.completed);
        ul.appendChild(li);
    });
}
