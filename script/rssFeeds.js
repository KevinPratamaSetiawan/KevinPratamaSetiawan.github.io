document.getElementById('tab-1-btn').addEventListener('click', function() { openTab('tab-1'); });
document.getElementById('tab-2-btn').addEventListener('click', function() { openTab('tab-2'); });
document.getElementById('tab-3-btn').addEventListener('click', function() { openTab('tab-3'); });
document.getElementById('tab-4-btn').addEventListener('click', function() { openTab('tab-4'); });
document.getElementById('tab-5-btn').addEventListener('click', function() { openTab('tab-5'); });
document.getElementById('tab-6-btn').addEventListener('click', function() { openTab('tab-6'); });
document.getElementById('ide-btn').addEventListener('click', function() { openMp3Tab('mp3-player'); });
document.getElementById('queue-btn').addEventListener('click', function() { openMp3Tab('queue-tab'); });

// Change Tab Function
function openTab(tabClass) {
    // Hide all tabs and tags
    let allTabs = document.getElementsByClassName('close-tab');
    for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].style.display = 'none';
    }

    // Show all buttons
    let allButtons = document.querySelectorAll('[id^="tab-"][id$="-btn"]');
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].style.display = 'inline';
    }

    // Show the selected tab and its tag
    let activeTab = document.getElementsByClassName(tabClass);
    for (let i = 0; i < activeTab.length; i++) {
        activeTab[i].style.display = 'inline';
    }

    // Hide the selected tab button
    document.getElementById(tabClass + '-btn').style.display = 'none';
}

function openMp3Tab(tabClass) {
  if(tabClass === 'mp3-player'){
    document.getElementById('mp3-player').style.display = 'flex';
    document.getElementById('queue-tab').style.display = 'none';
  }else if(tabClass === 'queue-tab'){
    document.getElementById('mp3-player').style.display = 'none';
    document.getElementById('queue-tab').style.display = 'block';
  }
}

// Copy RSS Tab Function
document.getElementById('copy-1-btn').addEventListener('click', function() { copyLink('https://feeds.redcircle.com/6d74984c-7d4b-450a-b3f2-0c33ac972eac', '1'); });
document.getElementById('copy-2-btn').addEventListener('click', function() { copyLink('https://mogulmoves.rodeo/rss/yard', '2'); });
document.getElementById('copy-3-btn').addEventListener('click', function() { copyLink('https://mogulmoves.rodeo/rss/yardadvice', '3'); });

function copyLink(link, id) {
  const textToCopy = link;
  navigator.clipboard.writeText(textToCopy)

  document.getElementById('copy-'+ id +'-btn').style.display = 'none';
  document.getElementById('copy-'+ id +'-bounce').style.display = 'inline';

  setTimeout(() => {
    document.getElementById('copy-'+ id +'-btn').style.display = 'inline';
    document.getElementById('copy-'+ id +'-bounce').style.display = 'none';
  }, 1000);
}

// Function to format duration to "minutes:seconds"
function formatDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function formatPubDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

function calculateDurationFromLength(item) {
  const enclosure = item.getElementsByTagName('enclosure')[0];
  const lengthBytes = enclosure?.getAttribute('length') || 0;

  // Assume a bitrate of 128 kbps
  const bitrate = 192000; // bits per second
  const lengthBits = lengthBytes * 8; // Convert bytes to bits
  const durationSeconds = lengthBits / bitrate;

  return Math.round(durationSeconds); // Round to nearest second
}

document.getElementById('fileInputYard').addEventListener('change', (event) => handleFileInput(event, 'yard-tab'));
document.getElementById('fileInputPremium').addEventListener('change', (event) => handleFileInput(event, 'premium-tab'));
document.getElementById('fileInputAdvice').addEventListener('change', (event) => handleFileInput(event, 'advice-tab'));

document.addEventListener('DOMContentLoaded', () => {
  loadResults('yard-tab');
  loadResults('premium-tab');
  loadResults('advice-tab');
});


function loadResults(tabId) {
  const savedResults = localStorage.getItem(tabId);
  if (!savedResults) return;

  const results = JSON.parse(savedResults);
  displayResults(results, tabId);

  // console.log(results);
}

function handleFileInput(event, tabId) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
      const xmlString = e.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      const items = xmlDoc.getElementsByTagName('item');
      const results = [];

      Array.from(items).forEach(item => {
          const title = item.getElementsByTagName('title')[0]?.textContent || 'No title';
          const pubDateRaw = item.getElementsByTagName('pubDate')[0]?.textContent || 'No pubDate';
          const pubDateFormatted = formatPubDate(pubDateRaw);
          const durationSeconds = item.getElementsByTagName('itunes:duration')[0]?.textContent || calculateDurationFromLength(item);
          const duration = formatDuration(durationSeconds);
          const url = item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || 'No URL';
          const artist = 'The Yard, Ludwig, Slime, Aiden, Nick';

          results.push({ title, pubDateFormatted, durationSeconds, duration, url, artist });
      });

      localStorage.setItem(tabId, JSON.stringify(results));

      // Handle results (e.g., display in the tab)
      displayResults(results, tabId);
  };

  reader.readAsText(file);
}

function displayResults(results, tabId) {
  const tabContent = document.getElementById(tabId);
  if (!tabContent) return;

  let i = 1;

  results.forEach(result => {
      const resultElement = document.createElement('li');
      resultElement.classList.add('mp3-container');
      
      if (document.body.classList.contains('dark-mode')) {
        resultElement.classList.add('dark-mode');
      }

      let formattedNumber = i.toString().padStart(3, '0');

      resultElement.innerHTML = `
          <a href="" data-url="${result.url}" data-ticketNum="${i-1}" data-tabType="${tabId}" class='none play'><i class="fa-solid fa-play"></i></a>
          <div class='mp3-title-date'>
            <h3>${result.title}</h3>
            <p>${result.pubDateFormatted}</p>
          </div>
          <div class='mp3-number-duration'>
            <p class='mp3-numbers'>#${formattedNumber}</p>
            <p>${result.duration}</p>
          </div>
      `;

      tabContent.appendChild(resultElement);

      // Add event listener for the <a> tag
      const playLink = resultElement.querySelector('a.play');
      playLink.addEventListener('click', function (event) {
        event.preventDefault();  // Prevent default anchor behavior (navigation)

        const ticketNum = playLink.getAttribute('data-ticketNum');
        const url = playLink.getAttribute('data-url');
        const tabType = playLink.getAttribute('data-tabType');

        // Call the function with the values extracted from the <a> tag
        initiateQueue(ticketNum, url, tabType);
      });

      i++;
  });
}

function clearTabStorage(tabId) {
  const tabContent = document.getElementById(tabId);
  if (!tabContent) return;

  // Get all <li> items in the tab
  const allItems = Array.from(tabContent.getElementsByTagName('li'));

  // Filter to retain items with the "io-item" class
  const ioItems = allItems.filter(item => item.classList.contains('io-item'));

  // Clear the tab content
  tabContent.innerHTML = '';

  // Append the retained "io-item" items back to the tab
  ioItems.forEach(item => tabContent.appendChild(item));

  // Clear the data from localStorage for the specified tab
  localStorage.removeItem(tabId);
}

document.getElementById('fileClearYard').addEventListener('click', () => {
  clearTabStorage('yard-tab');
});

document.getElementById('fileClearPremium').addEventListener('click', () => {
  clearTabStorage('premium-tab');
});

document.getElementById('fileClearAdvice').addEventListener('click', () => {
  clearTabStorage('advice-tab');
});