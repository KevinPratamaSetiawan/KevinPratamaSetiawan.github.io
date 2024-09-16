const coverImage = document.getElementById('mp3-cover-img');
const coverImageMax = document.getElementById('mp3-cover-img-max');
const coverImageFull = document.getElementById('max-cover-img');
const maximizeCoverImage = document.getElementById('maximize-cover');
const coverFileName = document.getElementById('cover-file-name');
const coverCountdown = document.getElementById('cover-countdown');
let coverChangeInterval = 30000;
let countdownValue = coverChangeInterval;
let coverChangeCounter = 0;
let coverDoctype = 'all'

// Show the cover image when maximizeCoverImage is clicked
maximizeCoverImage.addEventListener('click', function() {
  coverImageFull.classList.add('show');
});

// Hide the cover image when clicking on it
coverImageFull.addEventListener('click', function() {
  coverImageFull.classList.remove('show');
  coverChangeCounter = 0;
});

// Mp3 Player Cover Changer
function changeCoverImage() {
  const totalFiles = [38, 116, 7];
  const coverFormat = ['jpeg', 'png', 'gif'];

  let selectedFormatIndex = Math.floor(Math.random() * coverFormat.length);
  
  if(coverDoctype === 'jpeg'){
    selectedFormatIndex = 0;
  }else if(coverDoctype === 'png'){
    selectedFormatIndex = 1;
  }else if(coverDoctype === 'gif'){
    selectedFormatIndex = 2;
  }

  let selectedFormat = coverFormat[selectedFormatIndex];
  let imageIndex = (Math.floor(Math.random() * totalFiles[selectedFormatIndex]) + 1).toString().padStart(3, '0');
  selectedFormatIndex++;

  coverChangeCounter++;

  coverImage.src = `../assets/images/mp3-cover/mp3-cover-${selectedFormatIndex}${imageIndex}.${selectedFormat}`;
  coverImageMax.src = `../assets/images/mp3-cover/mp3-cover-${selectedFormatIndex}${imageIndex}.${selectedFormat}`;
  coverFileName.innerHTML = `../mp3-cover-${selectedFormatIndex}${imageIndex}.${selectedFormat} 「${numberToRoman(coverChangeCounter)}」`;

  countdownValue = coverChangeInterval;
}

function changeCountdown () {
  const seconds = Math.floor(countdownValue / 1000);
  const milliseconds = countdownValue % 1000;

  coverCountdown.textContent = seconds.toString().padStart(2, '0') + ':' + milliseconds.toString().padStart(2, '0').slice(0, 2);

  countdownValue -= 10;

  if (countdownValue <= 0) {
    countdownValue = coverChangeInterval;
  }
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
  
  for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
          result += numeral;
          num -= value;
      }
  }
  
  return result;
}

setInterval(changeCoverImage, coverChangeInterval);
setInterval(changeCountdown, 10);

document.addEventListener('DOMContentLoaded', () => {
  fetch('/script/data/mp3_metadata.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const playlist1 = data['playlist1'] || [];
      const thePopOut = data['thePopOut'] || [];

      localStorage.setItem('style-tab', JSON.stringify(playlist1));
      localStorage.setItem('pop-out-tab', JSON.stringify(thePopOut));
    })
    .catch(error => {
      console.error('Error fetching the JSON file:', error);
    });
});

document.getElementById('ide-btn').addEventListener('click', function() { openMp3Tab('mp3-player'); });
document.getElementById('queue-btn').addEventListener('click', function() { openMp3Tab('queue-tab'); });
document.getElementById('history-btn').addEventListener('click', function() { openMp3Tab('history-tab'); });
document.getElementById('settings-btn').addEventListener('click', function() { openMp3Tab('settings-tab'); });

function openMp3Tab(tabClass) {
  if(tabClass === 'mp3-player'){
    document.getElementById('ide-btn').style.display = 'none';
    document.getElementById('ide-label').style.display = 'block';
    document.getElementById('mp3-player').style.display = 'flex';
    document.getElementById('queue-btn').style.display = 'block';
    document.getElementById('queue-label').style.display = 'none';
    document.getElementById('queue-tab').style.display = 'none';
    document.getElementById('history-btn').style.display = 'block';
    document.getElementById('history-label').style.display = 'none';
    document.getElementById('history-tab').style.display = 'none';
    document.getElementById('settings-btn').style.display = 'block';
    document.getElementById('settings-label').style.display = 'none';
    document.getElementById('settings-tab').style.display = 'none';
  }else if(tabClass === 'queue-tab'){
    document.getElementById('ide-btn').style.display = 'block';
    document.getElementById('ide-label').style.display = 'none';
    document.getElementById('mp3-player').style.display = 'none';
    document.getElementById('queue-btn').style.display = 'none';
    document.getElementById('queue-label').style.display = 'block';
    document.getElementById('queue-tab').style.display = 'flex';
    document.getElementById('history-btn').style.display = 'block';
    document.getElementById('history-label').style.display = 'none';
    document.getElementById('history-tab').style.display = 'none';
    document.getElementById('settings-btn').style.display = 'block';
    document.getElementById('settings-label').style.display = 'none';
    document.getElementById('settings-tab').style.display = 'none';
  }else if(tabClass === 'history-tab'){
    document.getElementById('ide-btn').style.display = 'block';
    document.getElementById('ide-label').style.display = 'none';
    document.getElementById('mp3-player').style.display = 'none';
    document.getElementById('queue-btn').style.display = 'block';
    document.getElementById('queue-label').style.display = 'none';
    document.getElementById('queue-tab').style.display = 'none';
    document.getElementById('history-btn').style.display = 'none';
    document.getElementById('history-label').style.display = 'block';
    document.getElementById('history-tab').style.display = 'flex';
    document.getElementById('settings-btn').style.display = 'block';
    document.getElementById('settings-label').style.display = 'none';
    document.getElementById('settings-tab').style.display = 'none';
  }else if(tabClass === 'settings-tab'){
    document.getElementById('ide-btn').style.display = 'block';
    document.getElementById('ide-label').style.display = 'none';
    document.getElementById('mp3-player').style.display = 'none';
    document.getElementById('queue-btn').style.display = 'block';
    document.getElementById('queue-label').style.display = 'none';
    document.getElementById('queue-tab').style.display = 'none';
    document.getElementById('history-btn').style.display = 'block';
    document.getElementById('history-label').style.display = 'none';
    document.getElementById('history-tab').style.display = 'none';
    document.getElementById('settings-btn').style.display = 'none';
    document.getElementById('settings-label').style.display = 'block';
    document.getElementById('settings-tab').style.display = 'flex';
  }
}

let currentAudio;
let currentIndex;
let currentQueue = [];
let normalQueue;
let currentMode = 'normal';
let frRate = 15;
let currentHistoryTabType;

let playButton        = document.querySelector('.fa-circle-play');
let pauseButton       = document.querySelector('.fa-circle-pause');
let forwardButton     = document.querySelector('.fa-forward');
let rewindButton      = document.querySelector('.fa-backward');
let nextButton        = document.querySelector('.fa-forward-step');
let previousButton    = document.querySelector('.fa-backward-step');
let normalQueueButton = document.querySelector('.fa-arrow-down-a-z');
let reverseQueueButton= document.querySelector('.fa-arrow-down-z-a');
let shuffleButton     = document.querySelector('.fa-shuffle');
let repeatButton      = document.querySelector('.fa-repeat');
let volumeButton1     = document.querySelector('.fa-ear-listen');
let volumeButton2     = document.querySelector('.fa-volume-high');
let volumeButton3     = document.querySelector('.fa-volume-low');
let volumeButton4     = document.querySelector('.fa-volume-off');
let volumeButton5     = document.querySelector('.fa-volume-xmark');
let volumeSlider      = document.getElementById('mp3-volume-control')
let audioSpeedSlider  = document.getElementById('audio-speed-control')
let frRateSlider      = document.getElementById('fr-rate-control')
let coverRateSlider   = document.getElementById('cover-rate-control')
let doctypeSlider     = document.getElementById('doctype-control')

playButton.addEventListener('click', replayAudio);
pauseButton.addEventListener('click', pauseAudio);
forwardButton.addEventListener('click', forwardAudio);
rewindButton.addEventListener('click', rewindAudio);
nextButton.addEventListener('click', nextAudio);
previousButton.addEventListener('click', previousAudio);
normalQueueButton.addEventListener('click', reverseQueue);
reverseQueueButton.addEventListener('click', shuffleQueue);
shuffleButton.addEventListener('click', repeatAudio);
repeatButton.addEventListener('click', normalizeQueue);
volumeButton1.addEventListener('click', showVolumeSlider);
volumeButton2.addEventListener('click', showVolumeSlider);
volumeButton3.addEventListener('click', showVolumeSlider);
volumeButton4.addEventListener('click', showVolumeSlider);
volumeButton5.addEventListener('click', showVolumeSlider);
volumeSlider.addEventListener('input', changeAudioVolume);
audioSpeedSlider.addEventListener('input', changeAudioSpeed);
frRateSlider.addEventListener('input', changeFrRate);
coverRateSlider.addEventListener('input', changeCoverRate);
doctypeSlider.addEventListener('input', changeDoctype);

document.addEventListener('DOMContentLoaded', () => {
  // Load Saved Volume
  let volumeSlider = document.getElementById('mp3-volume-control');
  const currentVolume = localStorage.getItem('currentVolume');
  if(currentVolume){
    volumeSlider.value = currentVolume;
  }else {
    volumeSlider.value = 69;
  }
  changeAudioVolume();

  // Load Saved Mp3 Mode
  const currentAudioMode = localStorage.getItem('currentAudioMode');
  if(currentAudioMode){
    currentMode = currentAudioMode;
    if(currentAudioMode === 'normal'){
      normalizeQueue();
    }else if(currentAudioMode === 'reverse'){
      reverseQueue();
    }else if(currentAudioMode === 'shuffle'){
      shuffleQueue();
    }else if(currentAudioMode === 'repeat'){
      repeatAudio();
    }
  }else {
    currentMode = 'normal';
    normalizeQueue();
  }

  // Load Saved Audio Speed
  const currentAudioSpeed = localStorage.getItem('currentAudioSpeed');
  if (currentAudioSpeed){
    audioSpeedSlider.value = currentAudioSpeed;
  }else {
    audioSpeedSlider.value = 10;
  }
  changeAudioSpeed();

  // Load Saved Forward/Rewind Rate
  const currentFrRate = localStorage.getItem('currentFrRate');
  if (currentFrRate){
    frRateSlider.value = currentFrRate;
  }else {
    frRateSlider.value = 3;
  }
  changeFrRate();

  // Load Saved Cover Changes Rate
  const currentCoverRate = localStorage.getItem('currentCoverRate');
  if (currentCoverRate){
    coverRateSlider.value = currentCoverRate;
  }else {
    coverRateSlider.value = 3;
  }
  changeCoverRate();

  // Load Saved Cover Format
  const currentCoverFormat = localStorage.getItem('currentCoverFormat');
  if(currentCoverFormat){
    doctypeSlider.value = currentCoverFormat;
  }else {
    doctypeSlider.value = 1;
  }
  changeDoctype();

  // Load History
  displayHistory();

  // for(let i = 0;i<localStorage.length;i++){
  //   console.log(localStorage.key(i) + ' = ' + localStorage.getItem(localStorage.key(i)))
  // }
});

function saveLastPlayed(tabType, url = '', title = '', artist = '', duration = '', lastDuration = 0) {
  // Define the storage key based on the tabType
  let storageKey;
  if (tabType === 'yard-tab') {
    storageKey = 'yardTabLastPlayed';
  } else if (tabType === 'premium-tab') {
    storageKey = 'premiumTabLastPlayed';
  } else if (tabType === 'advice-tab') {
    storageKey = 'adviceTabLastPlayed';
  } else if (tabType === 'style-tab') {
    storageKey = 'styleTabLastPlayed';
  } else if (tabType === 'pop-out-tab') {
    storageKey = 'popoutTabLastPlayed';
  }

  if (!storageKey) return;

  // Check if there is already data stored
  let existingData = JSON.parse(localStorage.getItem(storageKey));

  if(lastDuration === 0){
    if(existingData){
      if(existingData.length > 1){
        let copyExistingData = [...existingData];
        existingData = [];

        for(let i=0; i<copyExistingData.length;i++){
          if(copyExistingData[i].title !== title){
            existingData.push(copyExistingData[i]);
          }
        }
      }

      if(existingData.length >= 5){
        existingData.pop();
      }

      existingData.unshift({tabType: tabType, url: url, title: title, artist: artist, duration: duration, lastDuration: lastDuration});
    }else{
      existingData = [{tabType: tabType, url: url, title: title, artist: artist, duration: duration, lastDuration: lastDuration}];
    }
  }else{
    existingData[0].lastDuration = lastDuration;
  }

  // Save the updated data back to localStorage
  localStorage.setItem(storageKey, JSON.stringify(existingData));
  displayHistory();
}

function displayHistory() {
  const tabData = {
    'yardTabLastPlayed': document.getElementById('yard-history-list'),
    'premiumTabLastPlayed': document.getElementById('premium-history-list'),
    'adviceTabLastPlayed': document.getElementById('advice-history-list'),
    'styleTabLastPlayed': document.getElementById('style-history-list'),
    'popoutTabLastPlayed': document.getElementById('popout-history-list')
  };

  // Helper function to create and append history items
  function createHistoryItem(item, listElement, index) {
    const { url, title, artist, duration, lastDuration } = item;

    const queueElement = document.createElement('li');
    queueElement.classList.add('history-item');

    queueElement.innerHTML = `
      <div>
        <p class="history-title">${title}</p>
        <span></span>
        <p>№${index.toString().padStart(3, '0')}</p>
      </div>
      <div>
        <p>${artist}</p>
        <span></span>
        <p>${formatTime(lastDuration)}/${duration}</p>
      </div>
    `;

    listElement.appendChild(queueElement);
  }

  // Iterate through each tab and display history
  Object.keys(tabData).forEach(key => {
    const data = localStorage.getItem(key);
    if(data === null) return;

    // Parse the data into an array of objects
    const historyItems = JSON.parse(data);

    if (Array.isArray(historyItems)) {
      // Clear the current history list
      const listElement = tabData[key];
      listElement.innerHTML = '';
      let index = 1;

      // Iterate through each history item and create a corresponding list item
      historyItems.forEach(item => {
        createHistoryItem(item, listElement, index);
        index++
      });
    }
  });
}

const playBtn = document.querySelectorAll('.play');

playBtn.forEach(function(button) {
  button.addEventListener('click', function() {
      currentQueue = [];
      normalQueue = [];
      let ticketNum = button.getAttribute('data-ticketNum');
      let url = button.getAttribute('data-url');
      let tabType = button.getAttribute('data-tabType');

      // Call your function with the values
      initiateQueue(ticketNum, url, tabType);
  });
});

function initiateQueue(ticketNum, url, tabType) {
  // For History Record
  if(currentAudio){
      saveLastPlayed(currentHistoryTabType,'','','','',currentAudio.currentTime);
  }
  currentHistoryTabType = tabType;

  // Main Functionality
  const savedResults = localStorage.getItem(tabType);
  if (!savedResults) return;
  const results = JSON.parse(savedResults);
  currentQueue = [...results] || [];
  normalQueue = [...results];

  currentIndex = parseInt(ticketNum, 10);

  if (currentMode === 'reverse'){
    playAudio(url);
    setTimeout(reverseQueue(), 5000);
  }

  if (currentMode === 'shuffle'){
    playAudio(url);
    setTimeout(shuffleQueue(), 5000);
  }

  if (currentMode === 'normal'){
    playAudio(url);
    setTimeout(displayQueueTab(currentQueue, parseInt(ticketNum, 10)), 5000);
  }
}

function displayQueueTab(queueList, index) {
  const queueTab = document.getElementById('queue-tab');
  const playTitle = document.getElementById('audioTitle');
  const endDuration = document.getElementById('endDuration');
  const durationSlider = document.getElementById('mp3-duration');

  queueTab.innerHTML = '';
  
  currentAudio.onloadedmetadata = function() {
    playTitle.innerHTML = currentQueue[currentIndex].title + '<br> by. <em>' + currentQueue[currentIndex].artist + '</em>';
    endDuration.innerHTML = currentQueue[currentIndex].duration;
    durationSlider.max = parseInt(currentAudio.duration);
  };

  queueList.forEach((queue, i) => {
    const queueElement = document.createElement('li');
    queueElement.classList.add('mp3-container');

    if (i === index) {
      queueElement.classList.add('current-played-item');

      saveLastPlayed(currentHistoryTabType, queue.url, queue.title, queue.artist, queue.duration);
    }

    let formattedNumber = (i + 1).toString().padStart(3, '0');

    queueElement.innerHTML = `
        <a href="#mp3-section" data-url="${queue.url}" data-ticketNum="${i}" class='none queue-item'><i class="fa-solid fa-play"></i></a>
        <div class='mp3-title-date'>
          <h3>${queue.title}</h3>
          <p>${queue.artist}</p>
        </div>
        <div class='mp3-number-duration'>
          <p class='mp3-numbers'>#${formattedNumber}</p>
          <p>${queue.duration}</p>
        </div>
    `;

    queueTab.appendChild(queueElement);

    const playQueueLink = queueElement.querySelector('a.queue-item');
    playQueueLink.addEventListener('click', function (event) {
      event.preventDefault();  // Prevent default anchor behavior (navigation)

      let ticketNum = playQueueLink.getAttribute('data-ticketNum');
      let url = playQueueLink.getAttribute('data-url');

      currentIndex = parseInt(ticketNum, 10);

      playAudio(url);
      displayQueueTab(currentQueue, currentIndex);
    });
  });
}

function playAudio(audioLink) {
  let volumeSlider = document.getElementById('mp3-volume-control');

  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(audioLink);
  currentAudio.play();

  // Set Repeat or Not
  if (currentMode === 'repeat'){
    repeatAudio();
  }else {
    currentAudio.loop = false;
  }

  // Set Audio Speed
  if (currentAudio.playbackRate != 1){
    changeAudioSpeed();
  }

  // Check If Audio Ended
  currentAudio.addEventListener('ended', function() {
    nextAudio();
  });

  playButton.style.display = 'none';
  pauseButton.style.display = 'block';

  // Change Audio Volume
  if(currentAudio){
    currentAudio.volume = (volumeSlider.value / 100);
  }

  // Change Duration Slider Value and Get Duration Slider Value
  currentAudio.addEventListener('timeupdate', updateDurationSlider);

  const durationSlider = document.getElementById('mp3-duration');
  durationSlider.addEventListener('input', () => {
      currentAudio.currentTime = durationSlider.value;
  });
}

function pauseAudio() {
  if (currentAudio) {
    currentAudio.pause();
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
    saveLastPlayed(currentHistoryTabType,'','','','',currentAudio.currentTime);
  }
}

function replayAudio () {
  currentAudio.play();

  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
}

function forwardAudio() {
  if (currentAudio) {
    currentAudio.currentTime = Math.min(currentAudio.currentTime + frRate, currentAudio.duration);
  }
}

function rewindAudio() {
  if (currentAudio) {
    currentAudio.currentTime = Math.max(currentAudio.currentTime - frRate, 0);
  }
}

function nextAudio() {
  if (currentQueue.length > 0) {
    currentIndex = (currentIndex + 1) % currentQueue.length;
    saveLastPlayed(currentHistoryTabType,'','','','',currentAudio.currentTime);
    playAudio(currentQueue[currentIndex].url);
    displayQueueTab(currentQueue, currentIndex);
  }
}

function previousAudio() {
  if (currentQueue.length > 0) {
    currentIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
    saveLastPlayed(currentHistoryTabType,'','','','',currentAudio.currentTime);
    playAudio(currentQueue[currentIndex].url);
    displayQueueTab(currentQueue, currentIndex);
  }
}

function showVolumeSlider () {
  let volumeContainer = document.getElementById('volume-slider-container');

  if (volumeContainer.style.display === 'none'){
    volumeContainer.style.display = 'flex';
  }else {
    volumeContainer.style.display = 'none';
  }
}

function changeAudioVolume () {
  let volumeSlider = document.getElementById('mp3-volume-control');

  if(currentAudio){
    currentAudio.volume = (volumeSlider.value / 100);
  }

  document.getElementById('plus-volume').innerHTML = '+ ' + volumeSlider.value + '%';
  document.getElementById('minus-volume').innerHTML = '- ' + (100 - volumeSlider.value) + '%';

  if (volumeSlider.value >= 75) {
    volumeButton1.style.display = 'block';
    volumeButton2.style.display = 'none';
    volumeButton3.style.display = 'none';
    volumeButton4.style.display = 'none';
    volumeButton5.style.display = 'none';
  }else if (volumeSlider.value >= 50) {
    volumeButton1.style.display = 'none';
    volumeButton2.style.display = 'block';
    volumeButton3.style.display = 'none';
    volumeButton4.style.display = 'none';
    volumeButton5.style.display = 'none';
  }else if (volumeSlider.value >= 25) {
    volumeButton1.style.display = 'none';
    volumeButton2.style.display = 'none';
    volumeButton3.style.display = 'block';
    volumeButton4.style.display = 'none';
    volumeButton5.style.display = 'none';
  }else if (volumeSlider.value > 0) {
    volumeButton1.style.display = 'none';
    volumeButton2.style.display = 'none';
    volumeButton3.style.display = 'none';
    volumeButton4.style.display = 'block';
    volumeButton5.style.display = 'none';
  }else {
    volumeButton1.style.display = 'none';
    volumeButton2.style.display = 'none';
    volumeButton3.style.display = 'none';
    volumeButton4.style.display = 'none';
    volumeButton5.style.display = 'block';
  }

  localStorage.setItem('currentVolume', volumeSlider.value);
}

function updateDurationSlider () {
  if(currentAudio){
    const durationSlider = document.getElementById('mp3-duration');
    const startDuration = document.getElementById('startDuration');

    durationSlider.value = currentAudio.currentTime;
    startDuration.innerHTML = formatTime(currentAudio.currentTime);
  }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function normalizeQueue () {
  currentMode = 'normal';
  localStorage.setItem('currentAudioMode', currentMode);

  normalQueueButton.style.display   = 'block';
  reverseQueueButton.style.display  = 'none';
  shuffleButton.style.display       = 'none';
  repeatButton.style.display        = 'none';

  if (currentQueue.length > 0) {
    currentAudio.loop = false;
    let trackAudioTitle = currentQueue[currentIndex].title;
    currentQueue = [];
    currentQueue = [...normalQueue];

    for (let i=0; i<currentQueue.length; i++){
      if (trackAudioTitle === currentQueue[i].title){
        currentIndex = i;
      }
    }

    displayQueueTab(currentQueue, currentIndex);
  }
}

function reverseQueue () {
  currentMode = 'reverse';
  localStorage.setItem('currentAudioMode', currentMode);

  normalQueueButton.style.display   = 'none';
  reverseQueueButton.style.display  = 'block';
  shuffleButton.style.display       = 'none';
  repeatButton.style.display        = 'none';

  if (currentQueue.length > 0){
    let trackAudioTitle = currentQueue[currentIndex].title;
    
    currentQueue = currentQueue.reverse();
    
    for (let i=0; i<currentQueue.length; i++){
      if (trackAudioTitle === currentQueue[i].title){
        currentIndex = i;
      }
    }

    displayQueueTab(currentQueue, currentIndex);
  }
}

function shuffleArray(array) {
  // Ensure the current audio is at index 0
  if (currentIndex > 0) {
      [array[0], array[currentIndex]] = [array[currentIndex], array[0]];
  }

  // Shuffle the rest of the array, starting from index 1
  for (let i = array.length - 1; i > 1; i--) {
      const j = Math.floor(Math.random() * (i - 1)) + 1; // Shuffle from index 1 onwards
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function shuffleQueue () {
  currentMode = 'shuffle';
  localStorage.setItem('currentAudioMode', currentMode);

  normalQueueButton.style.display   = 'none';
  reverseQueueButton.style.display  = 'none';
  shuffleButton.style.display       = 'block';
  repeatButton.style.display        = 'none';

  if (currentQueue.length > 0){
    shuffleArray(currentQueue);
    currentIndex = 0;

    displayQueueTab(currentQueue, currentIndex);
  }
}

function repeatAudio () {
  currentMode = 'repeat';
  localStorage.setItem('currentAudioMode', currentMode);

  normalQueueButton.style.display   = 'none';
  reverseQueueButton.style.display  = 'none';
  shuffleButton.style.display       = 'none';
  repeatButton.style.display        = 'block';

  if (currentAudio){
    currentAudio.loop = true;
    displayQueueTab(currentQueue, currentIndex);
  }
}

function changeAudioSpeed () {
  if (currentAudio) {
    currentAudio.playbackRate = (audioSpeedSlider.value/10);
  }

  document.getElementById('audio-speed-value-display').innerHTML = 'x' + audioSpeedSlider.value/10;
  localStorage.setItem('currentAudioSpeed', audioSpeedSlider.value);

  if (audioSpeedSlider.value < 8){
    document.getElementById('fa-gauge-low').style.display = 'block';
    document.getElementById('fa-gauge-mid').style.display = 'none';
    document.getElementById('fa-gauge-high').style.display = 'none';
  }else if (audioSpeedSlider.value < 15){
    document.getElementById('fa-gauge-low').style.display = 'none';
    document.getElementById('fa-gauge-mid').style.display = 'block';
    document.getElementById('fa-gauge-high').style.display = 'none';
  }else if (audioSpeedSlider.value < 20){
    document.getElementById('fa-gauge-low').style.display = 'none';
    document.getElementById('fa-gauge-mid').style.display = 'none';
    document.getElementById('fa-gauge-high').style.display = 'block';
  }
}

function changeFrRate () {
  document.getElementById('fr-rate-value-display').innerHTML = (frRateSlider.value*5) + 's';
  localStorage.setItem('currentFrRate', frRateSlider.value);

  frRate = frRateSlider.value * 5;
}

function changeCoverRate () {
  document.getElementById('cover-rate-value-display').innerHTML = (coverRateSlider.value*10) + 's';
  localStorage.setItem('currentCoverRate', coverRateSlider.value);

  coverChangeInterval = coverRateSlider.value*10000;
}

function changeDoctype () {
  if (doctypeSlider.value == 1){
    coverDoctype = 'all';
    document.getElementById('doctype-value-display').innerHTML = 'All';
  }else if (doctypeSlider.value == 2){
    coverDoctype = 'jpeg';
    document.getElementById('doctype-value-display').innerHTML = '.jpeg';
  }else if (doctypeSlider.value == 3){
    coverDoctype = 'png';
    document.getElementById('doctype-value-display').innerHTML = 'Manga Cover';
  }else if (doctypeSlider.value == 4){
    coverDoctype = 'gif';
    document.getElementById('doctype-value-display').innerHTML = '.gif';
  }
  localStorage.setItem('currentCoverFormat', doctypeSlider.value);
}

window.initiateQueue = initiateQueue;
window.displayQueueTab = displayQueueTab;
window.playAudio = playAudio;
window.pauseAudio = pauseAudio;
window.replayAudio = replayAudio;
window.forwardAudio = forwardAudio;
window.rewindAudio = rewindAudio;
window.nextAudio = nextAudio;
window.previousAudio = previousAudio;
window.showVolumeSlider = showVolumeSlider;
window.changeAudioVolume = changeAudioVolume;
window.updateDurationSlider = updateDurationSlider;
window.saveLastPlayed = saveLastPlayed;

// KEEP! : Function to extract the audio duration
// document.addEventListener('DOMContentLoaded', function() {
//   const audioElements = document.querySelectorAll('#audio-files span');

//   audioElements.forEach(function(element) {
//     const audioPath = element.getAttribute('data-path');
//     extractDuration(audioPath);
//   });
// });

// function extractDuration(audioName) {
//   let audio = new Audio(audioName);
//   audio.onloadedmetadata = function() {
//     console.log(audioName + " : " + audio.duration);
//   };
// }