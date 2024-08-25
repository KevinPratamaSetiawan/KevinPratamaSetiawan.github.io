document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mode-btn');
    const body = document.body;
    const logo = document.getElementById('mode-logo');
    const elementsToToggle = document.querySelectorAll(
        'a, p, pre, code, blockquote, .cert-category, .password, .social-button, input, div, .main-content > div > h4, li, .tab-btn, .todo-item, .custom-file-upload'
    );

    // Check and apply saved mode
    const applyMode = (isDark) => {
        body.classList.toggle('dark-mode', isDark);
        logo.src = isDark ? '/white-logo.png' : '/black-logo.png';
    
        elementsToToggle.forEach(element => {
            element.classList.toggle('dark-mode', isDark);
        });
    
        // Update dark mode for dynamically created todo items
        const todoItems = document.querySelectorAll('.todo-item');
        todoItems.forEach(item => {
            item.classList.toggle('dark-mode', isDark);
        });
    };
    

    const savedMode = localStorage.getItem('mode');
    applyMode(savedMode === 'dark-mode');

    // Toggle mode on button click
    toggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('mode', isDarkMode ? 'dark-mode' : 'light-mode');
        applyMode(isDarkMode);
    });
});