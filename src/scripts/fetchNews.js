export function fetchNews() {
  document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.querySelector('.js-section-news-body');

    if (!newsContainer) {
      console.error('News container not found');
      return;
    }

    const apiKey = '74a66d60205846b6a448dfb81ba5d0a0';
    const apiURL = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${apiKey}`;
  
    fetch(apiURL)
      .then(response => response.json())
        .then((newsData) => {
          if (newsData.status == 'ok') {
            displayNews(newsData.articles);
          } else {
            newsContainer.innerHTML = `<p>No news articles found.</p>`;
          }
        }).catch((error) => {
          newsContainer.innerHTML = "<p>Error fetching the news.</p>";
          console.error("Error fetching news:", error);
        });
  
    function displayNews(newsData) {
      newsData.slice(0, 10).forEach((news) => {
        const newsElement = document.createElement('div');
        newsElement.classList.add(".news");
  
        const title = news.title ? news.title : "No title available";
        const description = news.description ? news.description : "No description available.";
        const url = news.url ? news.url : "#";
        const imageUrl = news.urlToImage;
  
        newsElement.innerHTML = `
          <div class="news-card">
            <div class="news-card-head">
              <div class="news-image-container">
                <img src="${imageUrl}">
              </div>
            </div>

            <div class="news-card-body">
              <h3>${title}</h3>
              <p>${description}</p>
              <a href="${url}" target="_blank">Read more</a>
            </div>
          </div>
        `;
        newsContainer.appendChild(newsElement);
      });
    }
  });
}