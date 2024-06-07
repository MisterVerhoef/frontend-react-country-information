import './App.css';
import axios from "axios";
import {useState} from "react";
import worldmap from "./assets/world_map.png";

//api key  1069|fxruKNZL75NCNywx27zhItek4yJiwH9lpaKXjLTi

function App() {
    const apiKeyRestfulCountries = '1069|fxruKNZL75NCNywx27zhItek4yJiwH9lpaKXjLTi';
    const apiUrl = "https://restfulcountries.com/api/v1/countries";
    const [countries, setCountries] = useState([]);
    const [error, toggleError] = useState(false);

    async function fetchData() {
        toggleError(false);

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiKeyRestfulCountries}`
                }
            });
            console.log('API-response headers:', response.headers);
            console.log('API-response data:', response.data);
            if (Array.isArray(response.data.data)) {
                setCountries(response.data.data);
            } else {
                throw new Error('API response is not an array');
            }
        } catch (error) {
            console.error('Er is een fout opgetreden bij het ophalen van de gegevens:', error.message);
            toggleError(true);
        }
    }

    return (
        <>
            <header>
                <img src={worldmap} alt="worldmap"/>
                <h1>World Regions</h1>
            </header>
            <main>
                <button type="button" onClick={fetchData}>Show me some countries</button>

                <ul>
                    {countries.map((country) => (
                        <li key={country.name}>
                            {country.name}
                            <img src={country.href.flag} alt={country.name}/>
                            <p>Has a population of {country.population} people</p>
                        </li>
                    ))}
                </ul>

                {error && <p>Something went wrong</p>}
            </main>
        </>
    );
}

export default App;