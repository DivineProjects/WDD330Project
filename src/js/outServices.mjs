
export async function fetchStock(symbol, queryType) {
    const apiKey = import.meta.env.VITE_API_KEY; // Accessing the API key
    let https;
    if (queryType === "search") {
        https = `https://financialmodelingprep.com/api/v3/search?query=${symbol}&apikey=${apiKey}`;
    } else if (queryType == "key-metrics") {
        https = `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?apikey=${apiKey}`;
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
        // console.error('Failed to fetch Stock data:');
        throw error; // Rethrow the error for further handling
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
