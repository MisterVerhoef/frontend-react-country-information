import './App.css';
import axios from "axios";
import {useState} from "react";
import worldmap from "./assets/world_map.png";
import ContinentColor from "./componenten/regionColor/ContinentColor.jsx";
import ShowCountries from "./componenten/showCountries/ShowCountries.jsx";
import SearchFunction from "./componenten/searchCountry/SearchFunction.jsx";

//api key  1069|fxruKNZL75NCNywx27zhItek4yJiwH9lpaKXjLTi

function App() {
    const apiKeyRestfulCountries = '1069|fxruKNZL75NCNywx27zhItek4yJiwH9lpaKXjLTi';
    const apiUrl = "https://restfulcountries.com/api/v1/countries?population_from=2&population_to=5000000000000";
    const apiSearchUrl = "https://restfulcountries.com/api/v1/countries/";

    const [searchTerm, setSearchTerm] = useState('');
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

    async function fetchSearchData() {
        toggleError(false);

        try {
            const searchResponse = await axios.get(`${apiSearchUrl}${searchTerm}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiKeyRestfulCountries}`
                }
            });
            console.log('API-response headers:', searchResponse.headers);
            console.log('API-response data:', searchResponse.data);
            if (Array.isArray(searchResponse.data)) {
                setCountries(searchResponse.data);
            } else if (typeof searchResponse.data.data === 'object') {
                setCountries([searchResponse.data.data]);
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

                <div className="search-bar">
                    <button type="button" onClick={fetchSearchData}>Search</button>
                    <input
                        id="search"
                        type="search"
                        placeholder="Search for a specific country"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    </div>
                    {/*<button type="button" onClick={fetchSearchData}>Search</button>*/}
                    <div>
                        <button type="button" onClick={fetchData}>Show me all the countries</button>
                    </div>
            </header>
            <main>

                <SearchFunction countries={countries} error={error}/>

                <ShowCountries countries={countries} error={error}/>

                {/*<ul>*/}
                {/*    {countries.map((country) => (*/}
                {/*        <li key={country.name}>*/}
                {/*            <img src={country.href.flag} alt={country.name}/>*/}
                {/*            <span className={ContinentColor(country.continent)}>{country.name}</span>*/}
                {/*            <p>Has a population of {country.population} people</p>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}

                {/*{error && <p>Something went wrong</p>}*/}

            </main>
        </>
);
}

export default App;