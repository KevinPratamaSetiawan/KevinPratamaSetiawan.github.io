document.getElementById('tab-1-btn').addEventListener('click', openYard);
document.getElementById('tab-2-btn').addEventListener('click', openPremium, fetchPodcastEpisodes);
document.getElementById('tab-3-btn').addEventListener('click', openAdvice);

document.getElementById('play-timer-btn').style.display = 'none';

function openYard() {
    document.getElementById('tab-1-btn').style.display = 'none';
    document.getElementById('tab-1-tag').style.display = 'inline';
    document.getElementById('yard-tab').style.display = 'inline';
    document.getElementById('tab-2-btn').style.display = 'inline';
    document.getElementById('tab-2-tag').style.display = 'none';
    document.getElementById('premium-tab').style.display = 'none';
    document.getElementById('tab-3-btn').style.display = 'inline';
    document.getElementById('tab-3-tag').style.display = 'none';
    document.getElementById('advice-tab').style.display = 'none';
}

function openPremium() {
    document.getElementById('tab-1-btn').style.display = 'inline';
    document.getElementById('tab-1-tag').style.display = 'none';
    document.getElementById('yard-tab').style.display = 'none';
    document.getElementById('tab-2-btn').style.display = 'none';
    document.getElementById('tab-2-tag').style.display = 'inline';
    document.getElementById('premium-tab').style.display = 'inline';
    document.getElementById('tab-3-btn').style.display = 'inline';
    document.getElementById('tab-3-tag').style.display = 'none';
    document.getElementById('advice-tab').style.display = 'none';
}

function openAdvice() {
    document.getElementById('tab-1-btn').style.display = 'inline';
    document.getElementById('tab-1-tag').style.display = 'none';
    document.getElementById('yard-tab').style.display = 'none';
    document.getElementById('tab-2-btn').style.display = 'inline';
    document.getElementById('tab-2-tag').style.display = 'none';
    document.getElementById('premium-tab').style.display = 'none';
    document.getElementById('tab-3-btn').style.display = 'none';
    document.getElementById('tab-3-tag').style.display = 'inline';
    document.getElementById('advice-tab').style.display = 'inline';
}

document.addEventListener('DOMContentLoaded', () => {
    const feedUrl = 'https://feeds.redcircle.com/6d74984c-7d4b-450a-b3f2-0c33ac972eac';
    fetch(feedUrl)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then(data => {
        const items = data.querySelectorAll('item');
        const container = document.getElementById('premium-tab');
        items.forEach(item => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const enclosure = item.querySelector('enclosure').getAttribute('url');
          const description = item.querySelector('description').textContent;
  
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <a href="${link}">${title}</a><br>
            ${description}<br>
            <audio controls>
              <source src="${enclosure}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          `;
          container.appendChild(listItem);
        });
      })
    .catch(error => console.error('Error fetching the RSS feed:', error));
});

async function fetchPodcastEpisodes() {
    const url = 'https://mogulmoves.rodeo/rss/yard';
    
    try {
        const response = await fetch(url);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlData, 'application/xml');
        const items = xml.querySelectorAll('item');

        const episodeList = document.createElement('ul');
        items.forEach((item) => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;

            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = link;
            anchor.textContent = title;

            listItem.appendChild(anchor);
            episodeList.appendChild(listItem);
        });

        document.body.appendChild(episodeList);
    } catch (error) {
        console.error('Error fetching the RSS feed:', error);
    }
}

  