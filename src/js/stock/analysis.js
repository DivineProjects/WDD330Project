import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Get the stock symbol from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');

// if (symbol) {
//     const apiKey = 'GwNt7m8crW2zslDR2dfLoppujRi22PWa'; // Replace with your actual API key

//     // Fetch regular financial data
//     fetch(`https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?apikey=${apiKey}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             displayFinancialData(data);
            
//         })
//         .catch(error => {
//             console.error('Error fetching financial data:', error);
//             document.querySelector('.financial-data').innerHTML = '<p>Error loading financial data. Please try again later.</p>';
//         });
// } else {
//     document.querySelector('.financial-data').innerHTML = '<p>No symbol provided.</p>';
// }

// function displayFinancialData(data) {
//     const financialContainer = document.querySelector('.financial-data');
//     financialContainer.innerHTML = ''; // Clear any existing content

//     if (data.length === 0) {
//         financialContainer.innerHTML = '<p>No financial data found.</p>';
//         return;
//     }

//     // Create a vertical display for comparative data
//     const verticalContainer = document.createElement('div');
//     verticalContainer.innerHTML = `<h2>Financial Data for ${data[0].symbol}</h2>`;

//     const section = document.createElement('div');
// const invertedTable = createInvertedTable(data);
// section.appendChild(invertedTable); 
//         verticalContainer.appendChild(section);
    

//     financialContainer.appendChild(verticalContainer);
// }

// function createInvertedTable(data) {
//     const table = document.createElement('table');

//     // Create header row (fields)
//     const headerRow = document.createElement('tr');
//     // const fields = [];
//     const newData= [];
//     const fields = Object.keys(data[0]);
//     const headers = [""];
//     data.forEach(i => {
//         headers.push(i.calendarYear);
//     })
   
//     // Append field names as headers
//     headers.forEach(field => {
//         const th = document.createElement('th');
//         th.textContent = field;
//         headerRow.appendChild(th);
//     });

//     table.appendChild(headerRow);
//     // console.log(fields);
//     // Create rows for each field
//     fields.forEach(field => {
//         const row = document.createElement('tr');
        
//         data.forEach(item => {
//             const td = document.createElement('td');
//             td.textContent = item[field.replace(/\s+/g, '')] || ''; // Remove spaces to match keys
//             row.appendChild(td);
//         });

//         // Prepend the field name as the first cell in the row
//         const fieldNameCell = document.createElement('td');
//         fieldNameCell.textContent = field;
//         row.prepend(fieldNameCell);

//         table.appendChild(row);
//     });

//     return table;
// }

  
  
  


//////////////////////////////////////////////
if (symbol) {
    const apiKey = 'GwNt7m8crW2zslDR2dfLoppujRi22PWa'; // Replace with your actual API key

    // Fetch regular financial data
    fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayFinancialData(data);
            // Now fetch TTM data
            return fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${symbol}?apikey=${apiKey}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(ttmData => {
            displayTTMData(ttmData);
        })
        .catch(error => {
            console.error('Error fetching financial data:', error);
            document.querySelector('.financial-data').innerHTML = '<p>Error loading financial data. Please try again later.</p>';
        });
} else {
    document.querySelector('.financial-data').innerHTML = '<p>No symbol provided.</p>';
}

function displayFinancialData(data) {
    const financialContainer = document.querySelector('.financial-data');
    financialContainer.innerHTML = ''; // Clear any existing content

    if (data.length === 0) {
        financialContainer.innerHTML = '<p>No financial data found.</p>';
        return;
    }

    const financials = data[0]; // Assuming the first entry contains the relevant data
    console.log(financials);
    financialContainer.innerHTML = `
        <h2>Financial Data for ${financials.symbol}</h2>
        <p><strong>Date:</strong> ${financials.date}</p>
        <p><strong>Revenue Per Share:</strong> $${financials.revenuePerShare}</p>
        <p><strong>Net Income Per Share:</strong> $${financials.netIncomePerShare}</p>
        <p><strong>Operating Cash Flow Per Share:</strong> $${financials.operatingCashFlowPerShare}</p>
        <p><strong>Free Cash Flow Per Share:</strong> $${financials.freeCashFlowPerShare}</p>
        <p><strong>Market Cap:</strong> $${(financials.marketCap / 1e9).toFixed(2)} Billion</p>
        <p><strong>P/E Ratio:</strong> ${financials.peRatio}</p>
        <p><strong>Dividend Yield:</strong> ${financials.dividendYield * 100}%</p>
        <p><strong>Return on Equity (ROE):</strong> ${financials.roe}</p>
        <p><strong>Debt to Equity:</strong> ${financials.debtToEquity}</p>
        <!-- Add more financial metrics as needed -->
    `;
}

function displayTTMData(data) {
    const ttmContainer = document.createElement('div');
    ttmContainer.className = 'ttm-data';
    ttmContainer.innerHTML = '<h2>TTM Financial Data</h2>';

    if (data.length === 0) {
        ttmContainer.innerHTML += '<p>No TTM data found.</p>';
        return;
    }

    const ttm = data[0]; // Assuming the first entry contains the relevant data

    ttmContainer.innerHTML +=  `
        <table>
            <tr>
                <th>Metric</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Revenue Per Share</td>
                <td>${ttm.revenuePerShareTTM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Net Income Per Share</td>
                <td>${ttm.netIncomePerShareTTM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Operating Cash Flow Per Share</td>
                <td>${ttm.operatingCashFlowPerShareTTM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Free Cash Flow Per Share</td>
                <td>${ttm.freeCashFlowPerShareTTM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Cash Per Share</td>
                <td>${ttm.cashPerShareTTM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Book Value Per Share</td>
                <td>${ttm.bookValuePerShareTTM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Market Cap</td>
                <td>${(ttm.marketCapTTM / 1e9).toFixed(2)} Billion</td>
            </tr>
            <tr>
                <td>P/E Ratio</td>
                <td>${ttm.peRatioTTM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Dividend Yield</td>
                <td>${(ttm.dividendYieldTTM * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>ROE</td>
                <td>${(ttm.roeTTM * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>Dividend Per Share</td>
                <td>${ttm.dividendPerShareTTM.toFixed(2)}</td>
            </tr>
            <!-- Add more metrics as needed -->
        </table>
    `;


    document.querySelector('.financial-data').appendChild(ttmContainer);
}
