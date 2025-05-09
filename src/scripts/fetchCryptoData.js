import { formatTime } from "./utils/getTime.js";

export async function fetchCryptoData() {
  const cryptocurrencyCardsContainer = document.querySelector('.js-cryptocurrency-cards');
  if(!cryptocurrencyCardsContainer) {
    return;
  }

  cryptocurrencyCardsContainer.innerHTML = '';
  let cryptocurrencyCardsHTML = '';

  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const cryptocurrencyData= await response.json();

    cryptocurrencyData.slice(0, 8).forEach((coin) => {
      const formattedCoinPrice = coin.current_price.toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'USD',
        }
      );

      const formattedCoinName = `${coin.name.substring(0, 8)}`;

      const twentyFourHourPriceChange = coin.price_change_percentage_24h?.toFixed(2);
      const priceChangeColor = twentyFourHourPriceChange >= 0 ? '--color-positive' : '--color-negative';
      const priceChangeSign = twentyFourHourPriceChange >= 0 ? '+' : '';

      cryptocurrencyCardsHTML += `
        <div class="cryptocurrency-card">
          <div class="cryptocurrency-card-head">
            <div class="cryptocurrency-icon"><img src="${coin.image}" alt="cryptocurrency icon"></div>
            <div class="cryptocurrency-name">${formattedCoinName}</div>
            <div class="cryptocurrency-abbreviation">${coin.symbol.toUpperCase()}</div>
          </div>
          <div class="cryptocurrency-card-body">
            <div class="cryptocurrency-price">${formattedCoinPrice}</div>
            <div class="cryptocurrency-price-change-rate" style="color: var(${priceChangeColor})">
              ${priceChangeSign}${twentyFourHourPriceChange}%
            </div>
          </div>
        </div>
      `;
    });

    const now = new Date();
    const timeString = formatTime(now);

    document.querySelector('.js-last-update-time')
      .innerHTML = `
        <svg class="last-update-time-icon js-last-update-time-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Last updated at: ${timeString}
      `;

  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('.js-last-update-time-icon')) {
      fetchCryptoData();
    }
  });

  cryptocurrencyCardsContainer.innerHTML = cryptocurrencyCardsHTML;
}