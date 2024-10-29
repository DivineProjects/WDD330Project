
// import dotenv from 'dotenv';
// dotenv.config();

// export const fetchData = async () => {
//     const apiKey = process.env.API_KEY;

//     const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
//     const data = await response.json();

//     return data;
// };

export async function fetchStock(symbol, queryType) {
    // const apiKey = process.env.API_KEY;
    const apiKey = import.meta.env.VITE_API_KEY; // Accessing the API key
    let https;
    if (queryType == "search") {
        https = `https://financialmodelingprep.com/api/v3/search?query=${symbol}&apikey=${apiKey}`;
    } else {
        https = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`;
    }

    if (!apiKey) {
        throw new Error('API_KEY is not defined in the environment variables.');
    }

    try {
        const response = await fetch(https);

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Assuming the API returns an object with a "products" key
    } catch (error) {
        console.error('Failed to fetch Stock data:');
        // throw error; // Rethrow the error for further handling
    }
};


export class FetchData {
    constructor(symbol) {
        this.symbol = symbol;
        this.fetchCompanyProfile();
    }

    async fetchCompanyProfile() {
        if (this.symbol) {
            try {
                const data = await fetchStock(this.symbol);
                this.displayCompanyProfile(data);
            } catch (error) {
                console.error('Error fetching company data:', error);
                document.querySelector('.company-profile').innerHTML = '<p>Error loading company profile. Please try again later.</p>';
            }
        } else {
            document.querySelector('.company-profile').innerHTML = '<p>No symbol provided.</p>';
        }
    }
}

export default class ExternalServices {
    constructor(symbol) {
    //   this.category = category;
    //   this.path = `../json/${this.category}.json`;
    }
    async getData(category) {
      const data = await convertToJson(response);
      if (symbol) {
        const apiKey = 'GwNt7m8crW2zslDR2dfLoppujRi22PWa'; // Replace with your actual API key
        fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayCompanyProfile(data);
            })
            .catch(error => {
                console.error('Error fetching company data:', error);
                document.querySelector('.company-profile').innerHTML = '<p>Error loading company profile. Please try again later.</p>';
            });
    } else {
        document.querySelector('.company-profile').innerHTML = '<p>No symbol provided.</p>';
    }
      return data.Result;
    }
  
    async findProductById(id) {
      const response = await fetch(baseURL + `product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    }
  
    async checkout(payload) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
      return await fetch(baseURL + "checkout/", options).then(convertToJson);
    }
  }