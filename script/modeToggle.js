document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mode-btn');
    const body = document.body;
    const logo = document.getElementById('mode-logo');
    
    // Select all elements that need dark mode styling
    const certCategories = document.querySelectorAll('.cert-category');
    const links = document.querySelectorAll('a');
    const paragraphs = document.querySelectorAll('p');
    const preBlocks = document.querySelectorAll('pre');
    const codes = document.querySelectorAll('code');
    const blockquotes = document.querySelectorAll('blockquote');
    const passwordInputs = document.querySelectorAll('.password'); // Select all password inputs
    const socialButtons = document.querySelectorAll('.social-button'); // Select all social buttons
    const inputs = document.querySelectorAll('input'); // Select all input elements
    const divs = document.querySelectorAll('div'); // Select all div elements
    const h4s = document.querySelectorAll('.main-content > div > h4'); // Select h4 elements within .main-content > div
    const listItems = document.querySelectorAll('ul li'); // Select li elements inside ul

    // Check for saved mode in local storage on page load
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark-mode') {
        body.classList.add('dark-mode');
        logo.src = '/white-logo.png'; // Change to white logo in dark mode

        // Apply dark mode class to all relevant elements
        links.forEach(link => link.classList.add('dark-mode'));
        paragraphs.forEach(p => p.classList.add('dark-mode'));
        preBlocks.forEach(pre => pre.classList.add('dark-mode'));
        codes.forEach(code => code.classList.add('dark-mode'));
        blockquotes.forEach(blockquote => blockquote.classList.add('dark-mode'));
        certCategories.forEach(certCategory => certCategory.classList.add('dark-mode'));
        passwordInputs.forEach(input => input.classList.add('dark-mode')); // Add dark mode class to password inputs
        socialButtons.forEach(button => button.classList.add('dark-mode')); // Add dark mode class to social buttons
        inputs.forEach(input => input.classList.add('dark-mode')); // Add dark mode class to all input elements
        divs.forEach(div => div.classList.add('dark-mode')); // Add dark mode class to all div elements
        h4s.forEach(h4 => h4.classList.add('dark-mode')); // Add dark mode class to h4 elements within .main-content > div
        listItems.forEach(li => li.classList.add('dark-mode')); // Add dark mode class to li elements inside ul
    } else {
        logo.src = '/black-logo.png'; // Default to black logo in light mode
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save the current mode to local storage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('mode', 'dark-mode');
            logo.src = '/white-logo.png'; // Change to white logo in dark mode
            
            // Apply dark mode class to all relevant elements
            links.forEach(link => link.classList.add('dark-mode'));
            paragraphs.forEach(p => p.classList.add('dark-mode'));
            preBlocks.forEach(pre => pre.classList.add('dark-mode'));
            codes.forEach(code => code.classList.add('dark-mode'));
            blockquotes.forEach(blockquote => blockquote.classList.add('dark-mode'));
            certCategories.forEach(certCategory => certCategory.classList.add('dark-mode'));
            passwordInputs.forEach(input => input.classList.add('dark-mode')); // Add dark mode class to password inputs
            socialButtons.forEach(button => button.classList.add('dark-mode')); // Add dark mode class to social buttons
            inputs.forEach(input => input.classList.add('dark-mode')); // Add dark mode class to all input elements
            divs.forEach(div => div.classList.add('dark-mode')); // Add dark mode class to all div elements
            h4s.forEach(h4 => h4.classList.add('dark-mode')); // Add dark mode class to h4 elements within .main-content > div
            listItems.forEach(li => li.classList.add('dark-mode')); // Add dark mode class to li elements inside ul
        } else {
            localStorage.removeItem('mode');
            logo.src = '/black-logo.png'; // Change to black logo in light mode
            
            // Remove dark mode class from all relevant elements
            links.forEach(link => link.classList.remove('dark-mode'));
            paragraphs.forEach(p => p.classList.remove('dark-mode'));
            preBlocks.forEach(pre => pre.classList.remove('dark-mode'));
            codes.forEach(code => code.classList.remove('dark-mode'));
            blockquotes.forEach(blockquote => blockquote.classList.remove('dark-mode'));
            certCategories.forEach(certCategory => certCategory.classList.remove('dark-mode'));
            passwordInputs.forEach(input => input.classList.remove('dark-mode')); // Remove dark mode class from password inputs
            socialButtons.forEach(button => button.classList.remove('dark-mode')); // Remove dark mode class from social buttons
            inputs.forEach(input => input.classList.remove('dark-mode')); // Remove dark mode class from all input elements
            divs.forEach(div => div.classList.remove('dark-mode')); // Remove dark mode class from all div elements
            h4s.forEach(h4 => h4.classList.remove('dark-mode')); // Remove dark mode class from h4 elements within .main-content > div
            listItems.forEach(li => li.classList.remove('dark-mode')); // Remove dark mode class from li elements inside ul
        }
    });
});