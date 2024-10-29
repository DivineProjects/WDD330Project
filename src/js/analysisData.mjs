import {fetchStock} from "./externalServices.mjs";

export default class FetchData {
    constructor(symbol) {
        this.symbol = symbol;
        this.stock = {};
    }
    async init() {
        
        if (this.symbol) {
            try {
                const data = await fetchStock(this.symbol,"key-metrics");
                // this.stock = data[0];
                displayFinancialData(data);
            } catch (error) {
                document.querySelector('.financial-data').innerHTML = '<p>Error loading financial data. Please try again later.</p>';
            }
        } else {
            document.querySelector('.financial-data').innerHTML = '<p>No symbol provided.</p>';
            
        }
    }
}


function displayFinancialData(data) { 
    const financialContainer = document.querySelector('.financial-data');
    financialContainer.innerHTML = ''; // Clear any existing content

    if (data.length === 0) {
        financialContainer.innerHTML = '<p>No financial data found.</p>';
        return;
    }
    // Create a vertical display for comparative data
    const verticalContainer = document.createElement('div');
    verticalContainer.innerHTML = `<div class="search-header"></div><h1>${data[0].symbol} Financial</h1>`;
    
    const section = document.createElement('div');
    const invertedTable = createInvertedTable(data);    
    section.appendChild(invertedTable); 
    verticalContainer.appendChild(section);
    financialContainer.appendChild(verticalContainer);
}


function formatNumber(num) {
    if (isNaN(num)) return num; // Return empty string if input is not a number

    const absNum = Math.abs(num);
    let formattedNumber;

    if (absNum >= 1e9) {
        formattedNumber = (num / 1e9).toFixed(2) + 'B'; // Convert to billions
    } else if (absNum >= 1e6) {
        formattedNumber = (num / 1e6).toFixed(2) + 'M'; // Convert to millions
    } else {
        formattedNumber = num.toFixed(3) ; // Return the number as is
    }

    return formattedNumber;
}


function createInvertedTable(data) {
    const table = document.createElement('table');

    // Create header row (fields)
    const headerRow = document.createElement('tr');
    // const fields = [];
    const newData= [];
    const fields = Object.keys(data[0]).slice(4);
    // create heading in years
    const headers = [""];
    data.forEach(i => {
        headers.push(i.calendarYear);
    })
   
    // Append field names as headers
    headers.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);
    // Create rows for each field
    fields.forEach(field => {
        const row = document.createElement('tr');
        data.forEach(item => {
            const td = document.createElement('td');
            // Convert object keys to an array, slice off the first 4 keys
            const keys = Object.keys(item).slice(4);
            // taking the value of the specific field from the sliced keys
            const fieldKey = field.replace(/\s+/g, '');
            const fieldValue = formatNumber(item[fieldKey]) || ''; // Get the value, or default to an empty string
        
            td.textContent = fieldValue; // Set the text content of the td
            row.appendChild(td); // Append the td to the row
        });

        // Append the field name as the first cell in the row
        const fieldNameCell = document.createElement('td');
        fieldNameCell.textContent = field;
        row.prepend(fieldNameCell);
        table.appendChild(row);
    });

    return table;
}

 