const displaySave   = document.getElementById('save-display');
const displayDelete = document.getElementById('del-display');
const checkAll      = document.getElementById('saveData0');
const checkTheme    = document.getElementById('saveData1');
const checkTodo     = document.getElementById('saveData2');
const checkYard     = document.getElementById('saveData3');
const checkPremium  = document.getElementById('saveData4');
const checkAdvice   = document.getElementById('saveData5');
const checkHistory  = document.getElementById('saveData6');
const checkSetting  = document.getElementById('saveData7');
const checkAllSetTwo      = document.getElementById('saveData100');
const checkThemeSetTwo    = document.getElementById('saveData101');
const checkTodoSetTwo     = document.getElementById('saveData102');
const checkYardSetTwo     = document.getElementById('saveData103');
const checkPremiumSetTwo  = document.getElementById('saveData104');
const checkAdviceSetTwo   = document.getElementById('saveData105');
const checkHistorySetTwo  = document.getElementById('saveData106');
const checkSettingSetTwo  = document.getElementById('saveData107');
let checkCounter = [];
let localStorageData = {};

document.getElementById('put-btn').addEventListener('click', function() { openSaveTab('put-setting'); });

document.getElementById('get-btn').addEventListener('click', function() { 
    openSaveTab('get-setting'); 
    checkCounter = [];
    localStorageData = {};
    displayGetLocalStorage('all', 'setOne'); 
});

document.getElementById('del-btn').addEventListener('click', function() { 
    openSaveTab('del-setting'); 
    checkCounter = [];
    localStorageData = {};
    displayGetLocalStorage('all', 'setTwo'); 
});

document.getElementById('save-popover-btn').addEventListener('click', function() { 
    checkCounter = [];
    localStorageData = {};
    displayGetLocalStorage('all', 'setOne'); 
});

document.getElementById('save-copy').addEventListener('click', function() {
    navigator.clipboard.writeText(JSON.stringify(localStorageData, null, 2));
});

document.getElementById('del-save').addEventListener('click', function() { deleteSaveData(); });

function openSaveTab (tabId){
    if (tabId === 'get-setting'){
        document.getElementById('method-link').innerHTML = 'https://kevinpratamasetiawan.github.io/💻/getSaveData';
        document.getElementById('get-setting').style.display = 'flex';
        document.getElementById('get-btn').innerHTML = '<span style="color: #6bdd9a;">GET</span>';
        document.getElementById('put-setting').style.display = 'none';
        document.getElementById('put-btn').innerHTML = 'PUT';
        document.getElementById('del-setting').style.display = 'none';
        document.getElementById('del-btn').innerHTML = 'DEL';
    }else if (tabId === 'put-setting') {
        document.getElementById('method-link').innerHTML = 'https://kevinpratamasetiawan.github.io/💻/updateSaveData';
        document.getElementById('get-setting').style.display = 'none';
        document.getElementById('get-btn').innerHTML = 'GET';
        document.getElementById('put-setting').style.display = 'flex';
        document.getElementById('put-btn').innerHTML = '<span style="color: #74aef6;">PUT</span>';
        document.getElementById('del-setting').style.display = 'none';
        document.getElementById('del-btn').innerHTML = 'DEL';
    }else if (tabId === 'del-setting') {
        document.getElementById('method-link').innerHTML = 'https://kevinpratamasetiawan.github.io/💻/deleteSaveData';
        document.getElementById('get-setting').style.display = 'none';
        document.getElementById('get-btn').innerHTML = 'GET';
        document.getElementById('put-setting').style.display = 'none';
        document.getElementById('put-btn').innerHTML = 'PUT';
        document.getElementById('del-setting').style.display = 'flex';
        document.getElementById('del-btn').innerHTML = '<span style="color: #f79a8e;">DEL</span>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
   if (window.innerWidth < 500){
    checkTheme.innerText    = 'Theme';
    checkTodo.innerText     = 'To-do Item';
    checkYard.innerText     = 'Yard';
    checkPremium.innerText  = 'Premium';
    checkAdvice.innerText   = 'Advice';
    checkHistory.innerText  = 'Play History';
    checkSetting.innerText  = 'mp3 Setting';
    checkThemeSetTwo.innerText    = 'Theme';
    checkTodoSetTwo.innerText     = 'To-do Item';
    checkYardSetTwo.innerText     = 'Yard';
    checkPremiumSetTwo.innerText  = 'Premium';
    checkAdviceSetTwo.innerText   = 'Advice';
    checkHistorySetTwo.innerText  = 'Play History';
    checkSettingSetTwo.innerText  = 'mp3 Setting';
   }
});

function displayGetLocalStorage (checked, whichSet){
    if(whichSet === 'setOne'){
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
    }else if(whichSet === 'setTwo'){
        if(checked === 'all'){
            if(checkCounter.includes('all')){
                checkAllSetTwo.style.backgroundColor = 'var(--background-color)';
                checkCounter.splice(checkCounter.indexOf('all'),1);
            }else{
                checkAllSetTwo.style.backgroundColor = 'var(--brand-color)';
                checkThemeSetTwo.style.backgroundColor = 'var(--background-color)';
                checkTodoSetTwo.style.backgroundColor = 'var(--background-color)';
                checkYardSetTwo.style.backgroundColor = 'var(--background-color)';
                checkPremiumSetTwo.style.backgroundColor = 'var(--background-color)';
                checkAdviceSetTwo.style.backgroundColor = 'var(--background-color)';
                checkHistorySetTwo.style.backgroundColor = 'var(--background-color)';
                checkSettingSetTwo.style.backgroundColor = 'var(--background-color)';
                checkCounter = ['all'];
            }
        }else {
    
            if(checkCounter.includes('all')){
                checkCounter.splice(checkCounter.indexOf('all'),1);
            }
            checkAllSetTwo.style.backgroundColor = 'var(--background-color)';
    
            if(checked === 'theme'){
                if(checkCounter.includes('theme')){
                    checkThemeSetTwo.style.backgroundColor = 'var(--background-color)';
                    checkCounter.splice(checkCounter.indexOf('theme'),1);
                }else {
                    checkThemeSetTwo.style.backgroundColor = 'var(--brand-color)';
                    checkCounter.push('theme')
                }
            }else if(checked === 'todo'){
                if(checkCounter.includes('todo')){
                    checkTodoSetTwo.style.backgroundColor = 'var(--background-color)';
                    checkCounter.splice(checkCounter.indexOf('todo'),1);
                }else {
                    checkTodoSetTwo.style.backgroundColor = 'var(--brand-color)';
                    checkCounter.push('todo')        
                }
            }else if(checked === 'yard'){
                if(checkCounter.includes('yard')){
                    checkYardSetTwo.style.backgroundColor = 'var(--background-color)';
                    checkCounter.splice(checkCounter.indexOf('yard'),1);
                }else {
                    checkYardSetTwo.style.backgroundColor = 'var(--brand-color)';
                    checkCounter.push('yard')
                }
            }else if(checked === 'premium'){
                if(checkCounter.includes('premium')){
                    checkPremiumSetTwo.style.backgroundColor = 'var(--background-color)';
                    checkCounter.splice(checkCounter.indexOf('premium'),1);
                }else {
                    checkPremiumSetTwo.style.backgroundColor = 'var(--brand-color)';
                    checkCounter.push('premium')
                }
            }else if(checked === 'advice'){
                if(checkCounter.includes('advice')){
                    checkAdviceSetTwo.style.backgroundColor = 'var(--background-color)';
                    checkCounter.splice(checkCounter.indexOf('advice'),1);
                }else {
                    checkAdviceSetTwo.style.backgroundColor = 'var(--brand-color)';
                    checkCounter.push('advice')
                }
            }else if(checked === 'history'){
                if(checkCounter.includes('history')){
                    checkHistorySetTwo.style.backgroundColor = 'var(--background-color)';
                    checkCounter.splice(checkCounter.indexOf('history'),1);
                }else {
                    checkHistorySetTwo.style.backgroundColor = 'var(--brand-color)';
                    checkCounter.push('history')
                }
            }else if(checked === 'setting'){
                if(checkCounter.includes('setting')){
                    checkSettingSetTwo.style.backgroundColor = 'var(--background-color)';
                    checkCounter.splice(checkCounter.indexOf('setting'),1);
                }else {
                    checkSettingSetTwo.style.backgroundColor = 'var(--brand-color)';
                    checkCounter.push('setting')
                }
            }
        }
    }

    Object.assign(localStorageData, {
        'checkCounter': checkCounter
    });

    if(checkCounter.includes('all')){
        if(whichSet === 'setOne'){
            checkAll.style.backgroundColor = 'var(--brand-color)';
            checkTheme.style.backgroundColor = 'var(--background-color)';
            checkTodo.style.backgroundColor = 'var(--background-color)';
            checkYard.style.backgroundColor = 'var(--background-color)';
            checkPremium.style.backgroundColor = 'var(--background-color)';
            checkAdvice.style.backgroundColor = 'var(--background-color)';
            checkHistory.style.backgroundColor = 'var(--background-color)';
            checkSetting.style.backgroundColor = 'var(--background-color)';
        }else if(whichSet === 'setTwo'){
            checkAllSetTwo.style.backgroundColor = 'var(--brand-color)';
            checkThemeSetTwo.style.backgroundColor = 'var(--background-color)';
            checkTodoSetTwo.style.backgroundColor = 'var(--background-color)';
            checkYardSetTwo.style.backgroundColor = 'var(--background-color)';
            checkPremiumSetTwo.style.backgroundColor = 'var(--background-color)';
            checkAdviceSetTwo.style.backgroundColor = 'var(--background-color)';
            checkHistorySetTwo.style.backgroundColor = 'var(--background-color)';
            checkSettingSetTwo.style.backgroundColor = 'var(--background-color)';
        }

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
            "currentCoverFormat": localStorage.getItem('currentCoverFormat'),
            "currentHistoryCount": localStorage.getItem('currentHistoryCount')
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
                "currentCoverFormat": localStorage.getItem('currentCoverFormat'),
                "currentHistoryCount": localStorage.getItem('currentHistoryCount')
            });
        }else {
            delete localStorageData.currentVolume;
            delete localStorageData.currentAudioMode;
            delete localStorageData.currentAudioSpeed;
            delete localStorageData.currentFrRate;
            delete localStorageData.currentCoverRate;
            delete localStorageData.currentCoverFormat;
            delete localStorageData.currentHistoryCount;
        }
    }

    if(whichSet === 'setOne'){
        displaySave.innerHTML = `${JSON.stringify(localStorageData, null, 2)}`;
    }else if(whichSet === 'setTwo'){
        displayDelete.innerHTML = `${JSON.stringify(localStorageData, null, 2)}`;
    }
}

document.getElementById('input-box').addEventListener('input', (event) => {
    const inputValue = event.target.value;

    const jsonObject = JSON.parse(inputValue);

    const formattedJson = JSON.stringify(jsonObject, null, 2);

    document.getElementById('input-display-box').innerHTML = formattedJson;
});

document.getElementById('apply-save').addEventListener('click', function() {
    const saveData = JSON.parse(document.getElementById('input-display-box').innerHTML);

    if(saveData.checkCounter.includes('all') || saveData.checkCounter.includes('theme')){        
        localStorage.setItem('currentMode', saveData.currentMode);
        localStorage.setItem('currentHeaderFont', saveData.currentHeaderFont);
        localStorage.setItem('currentTextFont', saveData.currentTextFont);
        localStorage.setItem('currentLightTheme', saveData.currentLightTheme);
        localStorage.setItem('currentLightBgColor', saveData.currentLightBgColor);
        localStorage.setItem('currentLightBgColorHsl', saveData.currentLightBgColorHsl);
        localStorage.setItem('currentLightTextColor', saveData.currentLightTextColor);
        localStorage.setItem('currentLightAccentColor', saveData.currentLightAccentColor);
        localStorage.setItem('currentDarkTheme', saveData.currentDarkTheme);
        localStorage.setItem('currentDarkBgColor', saveData.currentDarkBgColor);
        localStorage.setItem('currentDarkBgColorHsl', saveData.currentDarkBgColorHsl);
        localStorage.setItem('currentDarkTextColor', saveData.currentDarkTextColor);
        localStorage.setItem('currentDarkAccentColor', saveData.currentDarkAccentColor);
    }

    if(saveData.checkCounter.includes('all') || saveData.checkCounter.includes('todo')){        
        localStorage.setItem('todoItems', JSON.stringify(saveData.todoItems));
    }

    if(saveData.checkCounter.includes('all') || saveData.checkCounter.includes('yard')){
        localStorage.setItem('yard-tab', JSON.stringify(saveData['yard-tab']));
    }

    if(saveData.checkCounter.includes('all') || saveData.checkCounter.includes('premium')){        
        localStorage.setItem('premium-tab', JSON.stringify(saveData['premium-tab']));
    }

    if(saveData.checkCounter.includes('all') || saveData.checkCounter.includes('advice')){        
        localStorage.setItem('advice-tab', JSON.stringify(saveData['advice-tab']));
    }

    if(saveData.checkCounter.includes('all') || saveData.checkCounter.includes('history')){        
        localStorage.setItem('yardTabLastPlayed', JSON.stringify(saveData.yardTabLastPlayed));
        localStorage.setItem('premiumTabLastPlayed', JSON.stringify(saveData.premiumTabLastPlayed));
        localStorage.setItem('adviceTabLastPlayed', JSON.stringify(saveData.adviceTabLastPlayed));
        localStorage.setItem('styleTabLastPlayed', JSON.stringify(saveData.styleTabLastPlayed));
        localStorage.setItem('popoutTabLastPlayed', JSON.stringify(saveData.popoutTabLastPlayed));
    }

    if(saveData.checkCounter.includes('all') || saveData.checkCounter.includes('setting')){        
        localStorage.setItem('currentVolume', saveData.currentVolume);
        localStorage.setItem('currentAudioMode', saveData.currentAudioMode);
        localStorage.setItem('currentAudioSpeed', saveData.currentAudioSpeed);
        localStorage.setItem('currentFrRate', saveData.currentFrRate);
        localStorage.setItem('currentCoverRate', saveData.currentCoverRate);
        localStorage.setItem('currentCoverFormat', saveData.currentCoverFormat);
        localStorage.setItem('currentHistoryCount', saveData.currentHistoryCount);
    }

    location.reload();
});

function deleteSaveData (){
    if(checkCounter.includes('all')){
            // Delete Theme Section
            localStorage.removeItem('currentMode');
            localStorage.removeItem('currentHeaderFont');
            localStorage.removeItem('currentTextFont');
            localStorage.removeItem('currentLightTheme');
            localStorage.removeItem('currentLightBgColor');
            localStorage.removeItem('currentLightBgColorHsl');
            localStorage.removeItem('currentLightTextColor');
            localStorage.removeItem('currentLightAccentColor');
            localStorage.removeItem('currentDarkTheme');
            localStorage.removeItem('currentDarkBgColor');
            localStorage.removeItem('currentDarkBgColorHsl');
            localStorage.removeItem('currentDarkTextColor');
            localStorage.removeItem('currentDarkAccentColor');

            // Delete Todo Section
            localStorage.removeItem('todoItems');

            // Delete The Yard Section
            localStorage.removeItem('yard-tab');

            // Delete The Yard Premium Section
            localStorage.removeItem('premium-tab');

            // Delete The Yard Advice Show Section
            localStorage.removeItem('advice-tab');

            // Delete Mp3 History Section
            localStorage.removeItem('yardTabLastPlayed');
            localStorage.removeItem('premiumTabLastPlayed');
            localStorage.removeItem('adviceTabLastPlayed');
            localStorage.removeItem('styleTabLastPlayed');
            localStorage.removeItem('popoutTabLastPlayed');

            // Delete Mp3 Settings Section
            localStorage.removeItem('currentVolume');
            localStorage.removeItem('currentAudioMode');
            localStorage.removeItem('currentAudioSpeed');
            localStorage.removeItem('currentFrRate');
            localStorage.removeItem('currentCoverRate');
            localStorage.removeItem('currentCoverFormat');
            localStorage.removeItem('currentHistoryCount');
    }else {
        if(checkCounter.includes('theme')){
            // Delete Theme Section
            localStorage.removeItem('currentMode');
            localStorage.removeItem('currentHeaderFont');
            localStorage.removeItem('currentTextFont');
            localStorage.removeItem('currentLightTheme');
            localStorage.removeItem('currentLightBgColor');
            localStorage.removeItem('currentLightBgColorHsl');
            localStorage.removeItem('currentLightTextColor');
            localStorage.removeItem('currentLightAccentColor');
            localStorage.removeItem('currentDarkTheme');
            localStorage.removeItem('currentDarkBgColor');
            localStorage.removeItem('currentDarkBgColorHsl');
            localStorage.removeItem('currentDarkTextColor');
            localStorage.removeItem('currentDarkAccentColor');
        }

        if(checkCounter.includes('todo')){
            // Delete Todo Section
            localStorage.removeItem('todoItems');
        }

        if(checkCounter.includes('yard')){
            // Delete The Yard Section
            localStorage.removeItem('yard-tab');
        }

        if(checkCounter.includes('premium')){
            // Delete The Yard Premium Section
            localStorage.removeItem('premium-tab');
        }

        if(checkCounter.includes('advice')){
            // Delete The Yard Advice Show Section
            localStorage.removeItem('advice-tab');
        }

        if(checkCounter.includes('history')){
            // Delete Mp3 History Section
            localStorage.removeItem('yardTabLastPlayed');
            localStorage.removeItem('premiumTabLastPlayed');
            localStorage.removeItem('adviceTabLastPlayed');
            localStorage.removeItem('styleTabLastPlayed');
            localStorage.removeItem('popoutTabLastPlayed');
        }

        if(checkCounter.includes('setting')){
            // Delete Mp3 Settings Section
            localStorage.removeItem('currentVolume');
            localStorage.removeItem('currentAudioMode');
            localStorage.removeItem('currentAudioSpeed');
            localStorage.removeItem('currentFrRate');
            localStorage.removeItem('currentCoverRate');
            localStorage.removeItem('currentCoverFormat');
            localStorage.removeItem('currentHistoryCount');
        }
    }
    location.reload();
}

window.displayGetLocalStorage = displayGetLocalStorage;