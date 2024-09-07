// Mp3 Player Cover Changer
const coverImage = document.getElementById('mp3-cover-img');

function changeCoverImage() {
  const totalImages = 43;
  const gifIndex = [38, 39, 40, 41, 42, 43];
  let imageIndex = Math.floor(Math.random() * totalImages) + 1;
  let currentImageIndex = imageIndex;
  let selectedFormat = 'jpeg';

  if (currentImageIndex === imageIndex) {
    if(imageIndex === 43){
        imageIndex -= 8;
    }else{
        imageIndex++;
    }
  }

  if (gifIndex.includes(imageIndex)){
    selectedFormat = 'gif';
  }else {
    selectedFormat = 'jpeg';
  }

  coverImage.src = `../assets/images/mp3-cover/mp3-cover-${imageIndex}.${selectedFormat}`;
}

setInterval(changeCoverImage, 30000);

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

let currentAudio;
let currentIndex;
let currentQueue = [];
let normalQueue;
let currentMode = 'normal';

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

const playBtn = document.querySelectorAll('.play');

playBtn.forEach(function(button) {
  button.addEventListener('click', function() {
      currentQueue = []; // Reset queue on new play
      normalQueue = []; // Reset queue on new play
      let ticketNum = button.getAttribute('data-ticketNum');
      let url = button.getAttribute('data-url');
      let tabType = button.getAttribute('data-tabType');

      // Call your function with the values
      initiateQueue(ticketNum, url, tabType);
  });
});

function initiateQueue(ticketNum, url, tabType) {
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
    
    if (document.body.classList.contains('dark-mode')) {
      queueElement.classList.add('dark-mode');
    }

    if (i === index) {
      queueElement.classList.add('current-played-item');
    }

    let formattedNumber = (i + 1).toString().padStart(3, '0');

    queueElement.innerHTML = `
        <a href="" data-url="${queue.url}" data-ticketNum="${i}" class='none queue-item'><i class="fa-solid fa-play"></i></a>
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

  if (currentMode === 'repeat'){
    repeatAudio();
  }

  currentAudio.addEventListener('ended', function() {
    nextAudio(); // Play the next audio in the queue
  });

  playButton.style.display = 'none';
  pauseButton.style.display = 'block';

  if(currentAudio){
    currentAudio.volume = (volumeSlider.value / 100);
  }

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
  }
}

function replayAudio () {
  currentAudio.play();

  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
}

function forwardAudio() {
  if (currentAudio) {
    currentAudio.currentTime = Math.min(currentAudio.currentTime + 15, currentAudio.duration);
  }
}

function rewindAudio() {
  if (currentAudio) {
    currentAudio.currentTime = Math.max(currentAudio.currentTime - 15, 0);
  }
}

function nextAudio() {
  if (currentQueue.length > 0) {
    currentIndex = (currentIndex + 1) % currentQueue.length;
    playAudio(currentQueue[currentIndex].url);
    displayQueueTab(currentQueue, currentIndex);
  }
}

function previousAudio() {
  if (currentQueue.length > 0) {
    currentIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
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

  normalQueueButton.style.display   = 'block';
  reverseQueueButton.style.display  = 'none';
  shuffleButton.style.display       = 'none';
  repeatButton.style.display        = 'none';

  if (currentQueue.length > 0) {
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

  normalQueueButton.style.display   = 'none';
  reverseQueueButton.style.display  = 'none';
  shuffleButton.style.display       = 'none';
  repeatButton.style.display        = 'block';

  if (currentAudio){
    currentAudio.loop = true;
    displayQueueTab(currentQueue, currentIndex);
  }
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