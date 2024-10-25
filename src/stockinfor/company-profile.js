const data = [
    {
      "symbol": "AAPL",
      "price": 230.57,
      "beta": 1.239,
      "volAvg": 50834700,
      "mktCap": 3505609337000,
      "lastDiv": 1,
      "range": "164.08-237.49",
      "changes": -0.19,
      "companyName": "Apple Inc.",
      "currency": "USD",
      "cik": "0000320193",
      "isin": "US0378331005",
      "cusip": "037833100",
      "exchange": "NASDAQ Global Select",
      "exchangeShortName": "NASDAQ",
      "industry": "Consumer Electronics",
      "website": "https://www.apple.com",
      "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
      "ceo": "Mr. Timothy D. Cook",
      "sector": "Technology",
      "country": "US",
      "fullTimeEmployees": "161000",
      "phone": "408 996 1010",
      "address": "One Apple Park Way",
      "city": "Cupertino",
      "state": "CA",
      "zip": "95014",
      "dcfDiff": 82.95145,
      "dcf": 147.518546718839,
      "image": "https://images.financialmodelingprep.com/symbol/AAPL.png",
      "ipoDate": "1980-12-12",
      "defaultImage": false,
      "isEtf": false,
      "isActivelyTrading": true,
      "isAdr": false,
      "isFund": false
    }
  ];
  
  function displayCompanyInfo(company) {
      const companyInfoDiv = document.getElementById('company-info');
  
      const companyHTML = `
          <div class="company-header">
              <img src="${company.image}" alt="${company.companyName}">
              <div>
                  <h2>${company.companyName} (${company.symbol})</h2>
                  <p>Price: ${company.price} ${company.currency}</p>
                  <p>Market Cap: $${(company.mktCap / 1e9).toFixed(2)} Billion</p>
                  <p>CEO: ${company.ceo}</p>
                  <p>Sector: ${company.sector}</p>
                  <p>Industry: ${company.industry}</p>
                  <p>Website: <a href="${company.website}" target="_blank">${company.website}</a></p>
              </div>
          </div>
          <div class="company-details">
              <h2>Details</h2>
              <p><strong>Description:</strong> ${company.description}</p>
              <p><strong>Address:</strong> ${company.address}, ${company.city}, ${company.state} ${company.zip}</p>
              <p><strong>Phone:</strong> ${company.phone}</p>
              <p><strong>Average Volume:</strong> ${company.volAvg}</p>
              <p><strong>Beta:</strong> ${company.beta}</p>
              <p><strong>Last Dividend:</strong> ${company.lastDiv}</p>
              <p><strong>Price Range:</strong> ${company.range}</p>
              <p><strong>DCFDiff:</strong> ${company.dcfDiff}</p>
              <p><strong>DCF:</strong> ${company.dcf}</p>
          </div>
      `;
  
      companyInfoDiv.innerHTML = companyHTML;
  }
  
  // Display the first (and only) company info
  displayCompanyInfo(data[0]);
  