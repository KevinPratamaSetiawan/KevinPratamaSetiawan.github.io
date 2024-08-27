document.getElementById('tab-1-btn').addEventListener('click', function() { openTab('tab-1'); });
document.getElementById('tab-2-btn').addEventListener('click', function() { openTab('tab-2'); });
document.getElementById('tab-3-btn').addEventListener('click', function() { openTab('tab-3'); });
document.getElementById('tab-4-btn').addEventListener('click', function() { openTab('tab-4'); });
document.getElementById('tab-5-btn').addEventListener('click', function() { openTab('tab-5'); });
document.getElementById('tab-6-btn').addEventListener('click', function() { openTab('tab-6'); });

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

// Function to parse XML and extract title, duration, and URL
function parseXML(xmlContent) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
  const items = xmlDoc.getElementsByTagName("item");
  const parsedItems = [];

  for (let i = 0; i < items.length; i++) {
      const title = items[i].getElementsByTagName("title")[0].textContent;
      const duration = items[i].getElementsByTagName("duration")[0].textContent;
      const url = items[i].getElementsByTagName("url")[0].textContent;
      const formattedDuration = formatDuration(parseInt(duration));
      parsedItems.push({ title, duration: formattedDuration, url });
  }

  return parsedItems;
}

// Function to handle file upload and update the respective tab
function handleFileUpload(tabId, fileInputId) {
  const fileInput = document.getElementById(fileInputId);
  fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
          const xmlContent = e.target.result;
          const items = parseXML(xmlContent);
          const tab = document.getElementById(tabId);

          // Clear existing list items
          tab.innerHTML = '';

          items.forEach(item => {
              const li = document.createElement('li');
              li.textContent = `${item.title} (${item.duration})`;
              li.addEventListener('click', function () {
                  playMP3(item.url);
              });
              tab.appendChild(li);
          });
          tab.style.display = "block";
      };

      reader.readAsText(file);
  });
}

// Function to play the MP3 file
// function playMP3(url) {
//   const audioPlayer = document.getElementById('audioPlayer');
//   audioPlayer.src = url;
//   audioPlayer.play();
// }

yardFileInput.addEventListener('change', (event) => handleFileSelect(event, 'yard-tab'));
premiumFileInput.addEventListener('change', (event) => handleFileSelect(event, 'premium-tab'));
adviceFileInput.addEventListener('change', (event) => handleFileSelect(event, 'advice-tab'));