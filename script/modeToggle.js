document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mode-btn');
    const toggleButtonLogo = document.getElementById('mode-icon');
    const logo = document.getElementById('mode-logo');

    const applyMode = () => {
        const savedMode = localStorage.getItem('currentMode');

        if (savedMode){
            if (savedMode === 'light') {
                if(toggleButtonLogo){
                    toggleButtonLogo.classList.add('fa-sun')
                    toggleButtonLogo.classList.remove('fa-cloud-moon')
                }
                logo.src = '/black-logo.png';
                document.documentElement.style.setProperty('--background-color', '#fdfdfd');
                document.documentElement.style.setProperty('--background-color-rgb', '253,253,253');
                document.documentElement.style.setProperty('--text-color', '#23272d');
                document.documentElement.style.setProperty('--copy-color', '#23272d');
                document.documentElement.style.setProperty('--projectbox', '#c3e1c9');
                document.documentElement.style.setProperty('--projectbox-text', '#1e2126');
            }else if (savedMode === 'dark') {
                if(toggleButtonLogo){
                    toggleButtonLogo.classList.add('fa-moon')
                    toggleButtonLogo.classList.remove('fa-sun')
                }
                logo.src = '/white-logo.png';
                document.documentElement.style.setProperty('--background-color', '#23272d');
                document.documentElement.style.setProperty('--background-color-rgb', '35,39,45');
                document.documentElement.style.setProperty('--text-color', '#fdfdfd');
                document.documentElement.style.setProperty('--copy-color', '#fdfdfd');
                document.documentElement.style.setProperty('--projectbox', '#1e2126');
                document.documentElement.style.setProperty('--projectbox-text', '#c3e1c9');
            }

        }else {
            localStorage.setItem('currentMode', 'light');
        }
    };

    applyMode();

    toggleButton.addEventListener('click', () => {
        let savedMode = localStorage.getItem('currentMode');

        if (!savedMode){
            savedMode = 'light';
        }

        if (savedMode === 'light') {
            savedMode = 'dark';
        }else if (savedMode === 'dark') {
            savedMode = 'light';
        }
    
        if (savedMode === 'light') {
            if(toggleButtonLogo){
                toggleButtonLogo.classList.add('fa-sun')
                toggleButtonLogo.classList.remove('fa-moon')
            }
            logo.src = '/black-logo.png';
            document.documentElement.style.setProperty('--background-color', '#fdfdfd');
            document.documentElement.style.setProperty('--background-color-rgb', '253,253,253');
            document.documentElement.style.setProperty('--text-color', '#23272d');
            document.documentElement.style.setProperty('--copy-color', '#23272d');
            document.documentElement.style.setProperty('--projectbox', '#c3e1c9');
            document.documentElement.style.setProperty('--projectbox-text', '#1e2126');
        }else if (savedMode === 'dark') {
            if(toggleButtonLogo){
                toggleButtonLogo.classList.add('fa-moon')
                toggleButtonLogo.classList.remove('fa-sun')
            }
            logo.src = '/white-logo.png';
            document.documentElement.style.setProperty('--background-color', '#23272d');
            document.documentElement.style.setProperty('--background-color-rgb', '35,39,45');
            document.documentElement.style.setProperty('--text-color', '#fdfdfd');
            document.documentElement.style.setProperty('--copy-color', '#fdfdfd');
            document.documentElement.style.setProperty('--projectbox', '#1e2126');
            document.documentElement.style.setProperty('--projectbox-text', '#c3e1c9');
        }

        localStorage.setItem('currentMode', savedMode);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const accentButton = document.getElementById('accent-btn');

    const applyMode = () => {
        const savedBrandColor = localStorage.getItem('brand-color');
        if (savedBrandColor) {
            document.documentElement.style.setProperty('--brand-color', savedBrandColor);
        }
    };

    applyMode();

    accentButton.addEventListener('click', () => {
        //Brand Color Changer
        const colors = [
            '#60c17d', '#c16560', '#336699', '#e7ab2a',
            '#f25f4c', '#2cb67d', '#A8D672', '#339988',
            '#ddd05b', '#FF4500', '#00CED1', '#FFD700',
            '#FF69B4', '#7FFF00', '#C96868', '#FADFA1',
            '#7EACB5', '#697565'
        ];
    
        const randomIndex = Math.floor(Math.random() * colors.length);
    
        const newColor = colors[randomIndex];
    
        document.documentElement.style.setProperty('--brand-color', newColor);

        localStorage.setItem('brand-color', newColor);
    });
});