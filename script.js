const exchangeUrl = 'http://api.exchangeratesapi.io/v1/latest?access_key=162f8dc17300b6aac01871d6d1387fb6&symbols=USD,EUR,RUB';

const fromCurrencyName = document.querySelector('#from_currency');
const toCurrencyName = document.querySelector('#to_currency');
const fromCurrencyInput = document.querySelector('#from_amount');
const toCurrencyInput = document.querySelector('#to_amount');
const changeCurrencyBtn = document.querySelector('#change');
const rating = document.querySelector('#rate');


const getRate = (fromCurrency, toCurrency) => {
  return fetch(exchangeUrl)
    .then(res => res.json())
    .then(answer => {
      const rates = answer.rates;

      if (fromCurrency === toCurrency) return 1;
      if (fromCurrency === 'EUR') return rates[toCurrency];
      if (toCurrency === 'EUR') return 1 / rates[fromCurrency];
      return 1 / rates[fromCurrency] * rates[toCurrency];
    })
    .catch(error => console.log(error));
};

const getValuesFromUserAndConvert = () => {
  const fromCurrency = fromCurrencyName.value;
  const toCurrency = toCurrencyName.value;
  const fromAmount = fromCurrencyInput.value;

  getRate(fromCurrency, toCurrency)
    .then(rate => {
      toCurrencyInput.value = (fromAmount * rate).toFixed(2);
      rating.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    });
};

fromCurrencyName.addEventListener('change', getValuesFromUserAndConvert);
toCurrencyName.addEventListener('change', getValuesFromUserAndConvert);
fromCurrencyInput.addEventListener('input', getValuesFromUserAndConvert);
toCurrencyInput.addEventListener('input', getValuesFromUserAndConvert);

changeCurrencyBtn.addEventListener('click', () => {
  const fromCurrency = fromCurrencyName.value;
  fromCurrencyName.value = toCurrencyName.value;
  toCurrencyName.value = fromCurrency;

  getValuesFromUserAndConvert();
});


getValuesFromUserAndConvert();
