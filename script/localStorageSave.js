const displaySave   = document.getElementById('save-display');
const checkAll      = document.getElementById('saveData0');
const checkTheme    = document.getElementById('saveData1');
const checkTodo     = document.getElementById('saveData2');
const checkYard     = document.getElementById('saveData3');
const checkPremium  = document.getElementById('saveData4');
const checkAdvice   = document.getElementById('saveData5');
const checkHistory  = document.getElementById('saveData6');
const checkSetting  = document.getElementById('saveData7');
let checkCounter = [];
let localStorageData = {};

document.getElementById('save-popover-btn').addEventListener('click', displayGetLocalStorage('all'));
document.getElementById('save-copy').addEventListener('click', function() {
    navigator.clipboard.writeText(JSON.stringify(localStorageData, null, 2));
});

document.addEventListener('DOMContentLoaded', () => {
   if (window.innerWidth < 500){
    checkTheme.innerText    = 'Theme';
    checkTodo.innerText     = 'To-do Item';
    checkYard.innerText     = 'Yard';
    checkPremium.innerText  = 'Premium';
    checkAdvice.innerText   = 'Advice';
    checkHistory.innerText  = 'Play History';
    checkSetting.innerText  = 'mp3 Setting';
   }
});

function displayGetLocalStorage (checked){
    if(checked === 'all'){
        if(checkCounter.includes('all')){
            checkAll.style.backgroundColor = 'var(--background-color)';
            checkCounter.splice(checkCounter.indexOf('all'),1);
        }else{
            checkAll.style.backgroundColor = 'var(--brand-color)';
            checkTheme.style.backgroundColor = 'var(--background-color)';
            checkTodo.style.backgroundColor = 'var(--background-color)';
            checkYard.style.backgroundColor = 'var(--background-color)';
            checkPremium.style.backgroundColor = 'var(--background-color)';
            checkAdvice.style.backgroundColor = 'var(--background-color)';
            checkHistory.style.backgroundColor = 'var(--background-color)';
            checkSetting.style.backgroundColor = 'var(--background-color)';
            checkCounter = ['all'];
        }
    }else {

        if(checkCounter.includes('all')){
            checkCounter.splice(checkCounter.indexOf('all'),1);
        }
        checkAll.style.backgroundColor = 'var(--background-color)';

        if(checked === 'theme'){
            if(checkCounter.includes('theme')){
                checkTheme.style.backgroundColor = 'var(--background-color)';
                checkCounter.splice(checkCounter.indexOf('theme'),1);
            }else {
                checkTheme.style.backgroundColor = 'var(--brand-color)';
                checkCounter.push('theme')
            }
        }else if(checked === 'todo'){
            if(checkCounter.includes('todo')){
                checkTodo.style.backgroundColor = 'var(--background-color)';
                checkCounter.splice(checkCounter.indexOf('todo'),1);
            }else {
                checkTodo.style.backgroundColor = 'var(--brand-color)';
                checkCounter.push('todo')        
            }
        }else if(checked === 'yard'){
            if(checkCounter.includes('yard')){
                checkYard.style.backgroundColor = 'var(--background-color)';
                checkCounter.splice(checkCounter.indexOf('yard'),1);
            }else {
                checkYard.style.backgroundColor = 'var(--brand-color)';
                checkCounter.push('yard')
            }
        }else if(checked === 'premium'){
            if(checkCounter.includes('premium')){
                checkPremium.style.backgroundColor = 'var(--background-color)';
                checkCounter.splice(checkCounter.indexOf('premium'),1);
            }else {
                checkPremium.style.backgroundColor = 'var(--brand-color)';
                checkCounter.push('premium')
            }
        }else if(checked === 'advice'){
            if(checkCounter.includes('advice')){
                checkAdvice.style.backgroundColor = 'var(--background-color)';
                checkCounter.splice(checkCounter.indexOf('advice'),1);
            }else {
                checkAdvice.style.backgroundColor = 'var(--brand-color)';
                checkCounter.push('advice')
            }
        }else if(checked === 'history'){
            if(checkCounter.includes('history')){
                checkHistory.style.backgroundColor = 'var(--background-color)';
                checkCounter.splice(checkCounter.indexOf('history'),1);
            }else {
                checkHistory.style.backgroundColor = 'var(--brand-color)';
                checkCounter.push('history')
            }
        }else if(checked === 'setting'){
            if(checkCounter.includes('setting')){
                checkSetting.style.backgroundColor = 'var(--background-color)';
                checkCounter.splice(checkCounter.indexOf('setting'),1);
            }else {
                checkSetting.style.backgroundColor = 'var(--brand-color)';
                checkCounter.push('setting')
            }
        }
    }

    if(checkCounter.includes('all')){
        checkAll.style.backgroundColor = 'var(--brand-color)';
        checkTheme.style.backgroundColor = 'var(--background-color)';
        checkTodo.style.backgroundColor = 'var(--background-color)';
        checkYard.style.backgroundColor = 'var(--background-color)';
        checkPremium.style.backgroundColor = 'var(--background-color)';
        checkAdvice.style.backgroundColor = 'var(--background-color)';
        checkHistory.style.backgroundColor = 'var(--background-color)';
        checkSetting.style.backgroundColor = 'var(--background-color)';

        Object.assign(localStorageData, {
            // Save Theme Section
            "currentMode": localStorage.getItem('currentMode'),
            "currentHeaderFont": localStorage.getItem('currentHeaderFont'),
            "currentTextFont": localStorage.getItem('currentTextFont'),
            "currentLightTheme": localStorage.getItem('currentLightTheme'),
            "currentLightBgColor": localStorage.getItem('currentLightBgColor'),
            "currentLightBgColorHsl": localStorage.getItem('currentLightBgColorHsl'),
            "currentLightTextColor": localStorage.getItem('currentLightTextColor'),
            "currentLightAccentColor": localStorage.getItem('currentLightAccentColor'),
            "currentDarkTheme": localStorage.getItem('currentDarkTheme'),
            "currentDarkBgColor": localStorage.getItem('currentDarkBgColor'),
            "currentDarkBgColorHsl": localStorage.getItem('currentDarkBgColorHsl'),
            "currentDarkTextColor": localStorage.getItem('currentDarkTextColor'),
            "currentDarkAccentColor": localStorage.getItem('currentDarkAccentColor'),

            // Save Todo Section
            'todoItems': JSON.parse(localStorage.getItem('todoItems')),

            // Save The Yard Section
            'yard-tab': JSON.parse(localStorage.getItem('yard-tab')),

            // Save The Yard Premium Section
            'premium-tab': JSON.parse(localStorage.getItem('premium-tab')),

            // Save The Yard Advice Show Section
            'advice-tab': JSON.parse(localStorage.getItem('advice-tab')),

            // Save Mp3 History Section
            'yardTabLastPlayed': JSON.parse(localStorage.getItem('yardTabLastPlayed')),
            'premiumTabLastPlayed': JSON.parse(localStorage.getItem('premiumTabLastPlayed')),
            'adviceTabLastPlayed': JSON.parse(localStorage.getItem('adviceTabLastPlayed')),
            'styleTabLastPlayed': JSON.parse(localStorage.getItem('styleTabLastPlayed')),
            'popoutTabLastPlayed': JSON.parse(localStorage.getItem('popoutTabLastPlayed')),

            // Save Mp3 Settings Section
            "currentVolume": localStorage.getItem('currentVolume'),
            "currentAudioMode": localStorage.getItem('currentAudioMode'),
            "currentAudioSpeed": localStorage.getItem('currentAudioSpeed'),
            "currentFrRate": localStorage.getItem('currentFrRate'),
            "currentCoverRate": localStorage.getItem('currentCoverRate'),
            "currentCoverFormat": localStorage.getItem('currentCoverFormat')
        });
    }else {
        if(checkCounter.includes('theme')){
            Object.assign(localStorageData, {
                // Save Theme Section
                "currentMode": localStorage.getItem('currentMode'),
                "currentHeaderFont": localStorage.getItem('currentHeaderFont'),
                "currentTextFont": localStorage.getItem('currentTextFont'),
                "currentLightTheme": localStorage.getItem('currentLightTheme'),
                "currentLightBgColor": localStorage.getItem('currentLightBgColor'),
                "currentLightBgColorHsl": localStorage.getItem('currentLightBgColorHsl'),
                "currentLightTextColor": localStorage.getItem('currentLightTextColor'),
                "currentLightAccentColor": localStorage.getItem('currentLightAccentColor'),
                "currentDarkTheme": localStorage.getItem('currentDarkTheme'),
                "currentDarkBgColor": localStorage.getItem('currentDarkBgColor'),
                "currentDarkBgColorHsl": localStorage.getItem('currentDarkBgColorHsl'),
                "currentDarkTextColor": localStorage.getItem('currentDarkTextColor'),
                "currentDarkAccentColor": localStorage.getItem('currentDarkAccentColor')
            });
        }else {
            delete localStorageData.currentMode;
            delete localStorageData.currentHeaderFont;
            delete localStorageData.currentTextFont;
            delete localStorageData.currentLightTheme;
            delete localStorageData.currentLightBgColor;
            delete localStorageData.currentLightBgColorHsl;
            delete localStorageData.currentLightTextColor;
            delete localStorageData.currentLightAccentColor;
            delete localStorageData.currentDarkTheme;
            delete localStorageData.currentDarkBgColor;
            delete localStorageData.currentDarkBgColorHsl;
            delete localStorageData.currentDarkTextColor;
            delete localStorageData.currentDarkAccentColor;
        }

        if(checkCounter.includes('todo')){
            Object.assign(localStorageData, {
                // Save Todo Section
                'todoItems': JSON.parse(localStorage.getItem('todoItems'))
            });
        }else {
            delete localStorageData.todoItems;
        }

        if(checkCounter.includes('yard')){
            Object.assign(localStorageData, {
                // Save The Yard Section
                'yard-tab': JSON.parse(localStorage.getItem('yard-tab'))
            });
        }else {
            delete localStorageData['yard-tab'];
        }

        if(checkCounter.includes('premium')){
            Object.assign(localStorageData, {
                // Save The Yard Premium Section
                'premium-tab': JSON.parse(localStorage.getItem('premium-tab'))
            });
        }else {
            delete localStorageData['premium-tab'];
        }

        if(checkCounter.includes('advice')){
            Object.assign(localStorageData, {
                // Save The Yard Advice Show Section
                'advice-tab': JSON.parse(localStorage.getItem('advice-tab'))
            });
        }else {
            delete localStorageData['advice-tab'];
        }

        if(checkCounter.includes('history')){
            Object.assign(localStorageData, {
                // Save Mp3 History Section
                'yardTabLastPlayed': JSON.parse(localStorage.getItem('yardTabLastPlayed')),
                'premiumTabLastPlayed': JSON.parse(localStorage.getItem('premiumTabLastPlayed')),
                'adviceTabLastPlayed': JSON.parse(localStorage.getItem('adviceTabLastPlayed')),
                'styleTabLastPlayed': JSON.parse(localStorage.getItem('styleTabLastPlayed')),
                'popoutTabLastPlayed': JSON.parse(localStorage.getItem('popoutTabLastPlayed'))
            });
        }else {
            delete localStorageData.yardTabLastPlayed;
            delete localStorageData.premiumTabLastPlayed;
            delete localStorageData.adviceTabLastPlayed;
            delete localStorageData.styleTabLastPlayed;
            delete localStorageData.popoutTabLastPlayed;
        }

        if(checkCounter.includes('setting')){
            Object.assign(localStorageData, {
                // Save Mp3 Settings Section
                "currentVolume": localStorage.getItem('currentVolume'),
                "currentAudioMode": localStorage.getItem('currentAudioMode'),
                "currentAudioSpeed": localStorage.getItem('currentAudioSpeed'),
                "currentFrRate": localStorage.getItem('currentFrRate'),
                "currentCoverRate": localStorage.getItem('currentCoverRate'),
                "currentCoverFormat": localStorage.getItem('currentCoverFormat')
            });
        }else {
            delete localStorageData.currentVolume;
            delete localStorageData.currentAudioMode;
            delete localStorageData.currentAudioSpeed;
            delete localStorageData.currentFrRate;
            delete localStorageData.currentCoverRate;
            delete localStorageData.currentCoverFormat;
        }
    }

    displaySave.innerHTML = `${JSON.stringify(localStorageData, null, 2)}`;
}

window.displayGetLocalStorage = displayGetLocalStorage;