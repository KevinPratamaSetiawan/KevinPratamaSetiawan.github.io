document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mode-btn');
    const body = document.body;
    const logo = document.getElementById('mode-logo');
    const elementsToToggle = document.querySelectorAll(
        'a, p, pre, code, blockquote, .cert-category, .password, .social-button, input, div, .main-content > div > h4, li, .tab-btn, .todo-item, .custom-file-upload, #slider-icon, .mp3-play-btn, .mp3-numbers'
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

        const podItems = document.querySelectorAll('.mp3-container');
        podItems.forEach(item => {
            item.classList.toggle('dark-mode', isDark);
        });

        const podPlayBtn = document.querySelectorAll('.play');
        podPlayBtn.forEach(item => {
            item.classList.toggle('dark-mode', isDark);
        });

        const mp3Numbers = document.querySelectorAll('.mp3-numbers');
        mp3Numbers.forEach(item => {
            item.classList.toggle('dark-mode', isDark);
        });
    };
    

    const savedMode = localStorage.getItem('mode');
    applyMode(savedMode === 'dark-mode');

    // Toggle mode on button click
    toggleButton.addEventListener('click', () => {
        let symbols = ['fa-sun','fa-radiation','fa-biohazard','fa-snowflake','fa-react','fa-fire-flame-curved','fa-galactic-senate','fa-jedi'];
        let random = Math.floor(Math.random() * 1000) % symbols.length;

        for(let i=0;i<symbols.length;i++){
            let elements = document.getElementsByClassName(symbols[i]);
            if (elements.length > 0) {
                elements[0].style.display = 'none';
            }
        }

        console.log(random," : ",document.getElementsByClassName(symbols[random]));
        let selectedElement = document.getElementsByClassName(symbols[random]);
        if (selectedElement.length > 0) {
            selectedElement[0].style.display = 'flex';
        }

        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('mode', isDarkMode ? 'dark-mode' : 'light-mode');
        applyMode(isDarkMode);
    });
});