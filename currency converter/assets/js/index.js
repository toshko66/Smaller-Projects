const data = new Map([
    ['EUR', new Map([
    ['USD', 1.0644],
    ['BGN', 1.9558],
    ['GBP', 0.8847],
    ['JPY', 144.62]
    ])],
    ['BGN', new Map([
    ['EUR', 0.5112],
    ['USD', 0.5442],
    ['GBP', 0.4522],
    ['JPY', 73.938]
    ])],
    ['USD', new Map([
    ['BGN', 1.8372],
    ['EUR', 0.9393],
    ['GBP', 0.8309],
    ['JPY', 135.83]
    ])],
    ['GBP', new Map([
    ['USD', 1.2035],
    ['BGN', 2.2111],
    ['EUR', 1.1305],
    ['JPY', 163.47]
    ])],
    ['JPY', new Map([
    ['GBP', 0.0061175],
    ['USD', 0.0073607],
    ['BGN', 0.013526],
    ['EUR', 0.0069156]
    ])]
]);

const amountInput = document.getElementById('amount');
const fromSelect = document.querySelector('.currency-1');
const toSelect = document.querySelector('.currency-2');
const convertBtn = document.querySelector('input[type="button"]');
const resultElement = document.getElementById('output-cur');

// event listener to the button
convertBtn.addEventListener('click', function() {
const amount = parseFloat(amountInput.value);
const fromCurrency = fromSelect.value;
const toCurrency = toSelect.value;

if (isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
}

const rate = data.get(fromCurrency).get(toCurrency);
const result = amount * rate;

resultElement.value = result.toFixed(2);
});

//probvah 16666614092871024987124 nachina map si e map mislq che e nai podhodqshto
//funcionalnost 2

const currencyThree = document.getElementById("currency-3");
const rateInfo = document.getElementById("rate-info");
//event listener
currencyThree.addEventListener("change", showRateInfo);
//tva go vidqh v internet i q dobavih zashtoto kogato ne displayva selectnatata stoinoist koqto e po default i iskam da vidq neq purvo trqbva da izbera purva druga valuta i togava defaultnata
document.addEventListener("DOMContentLoaded", function() {
    showRateInfo();
});


function showRateInfo() {
const currencyValue = currencyThree.value;
//malka validaciika koqto vrushta prazen string ako nqkak si izberat neshto koeto ne trqbva
if (!currencyValue) {
rateInfo.innerHTML = "";
return;
}

const rates = data.get(currencyValue);
//puk dokato razbera kak se addva style na templatnati elementi :')

let rateString = '<ul style="list-style: none; padding: 0;font-family: Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif;">';
//ciklq mapa za da moga da vzema stoinostite(dokato go napravq izgledah youtube 3 puti)
for (let [currency, rate] of rates) {
rateString += `<li>1 ${currencyValue} = ${rate.toFixed(4)} ${currency}</li>`;
}

rateString += "</ul>";

rateInfo.innerHTML = rateString;
}