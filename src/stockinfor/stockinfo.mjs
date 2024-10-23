// stockInfo.js

// Replace with your actual API key and endpoint
const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const stockSymbol = 'AAPL'; // Replace with the stock ticker symbol you want to fetch

// Fetch stock price summary
async function fetchStockPriceSummary() {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`);
    const data = await response.json();
    return data['Global Quote'];
}

// Fetch financial statement (Example: Quarterly)
async function fetchFinancialStatement() {
    const response = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${stockSymbol}&apikey=${API_KEY}`);
    const data = await response.json();
    return data['quarterlyReports'] ? data['quarterlyReports'][0] : {};
}

// Fetch balance sheet
async function fetchBalanceSheet() {
    const response = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${stockSymbol}&apikey=${API_KEY}`);
    const data = await response.json();
    return data['quarterlyReports'] ? data['quarterlyReports'][0] : {};
}

// Populate the data into the HTML elements
async function populateStockInfo() {
    const priceSummary = await fetchStockPriceSummary();
    const financialStatement = await fetchFinancialStatement();
    const balanceSheet = await fetchBalanceSheet();

    // Populate Stock Price Summary
    document.getElementById('stock-price').innerHTML = `
        <h3>Stock Price Summary</h3>
        <p>Symbol: ${priceSummary['01. symbol']}</p>
        <p>Open: $${parseFloat(priceSummary['02. open']).toFixed(2)}</p>
        <p>High: $${parseFloat(priceSummary['03. high']).toFixed(2)}</p>
        <p>Low: $${parseFloat(priceSummary['04. low']).toFixed(2)}</p>
        <p>Price: $${parseFloat(priceSummary['05. price']).toFixed(2)}</p>
        <p>Volume: ${priceSummary['06. volume']}</p>
    `;

    // Populate Financial Statement
    document.getElementById('financial-statement').innerHTML = `
        <h3>Financial Statement</h3>
        <p>Revenue: $${parseFloat(financialStatement['totalRevenue']).toFixed(2)}</p>
        <p>Net Income: $${parseFloat(financialStatement['netIncome']).toFixed(2)}</p>
        <p>Operating Income: $${parseFloat(financialStatement['operatingIncome']).toFixed(2)}</p>
    `;

    // Populate Balance Sheet
    document.getElementById('balance-sheet').innerHTML = `
        <h3>Balance Sheet</h3>
        <p>Total Assets: $${parseFloat(balanceSheet['totalAssets']).toFixed(2)}</p>
        <p>Total Liabilities: $${parseFloat(balanceSheet['totalLiabilities']).toFixed(2)}</p>
        <p>Shareholder Equity: $${parseFloat(balanceSheet['shareholderEquity']).toFixed(2)}</p>
    `;
}

// Call the function to populate stock info
populateStockInfo().catch(error => console.error('Error fetching stock data:', error));
