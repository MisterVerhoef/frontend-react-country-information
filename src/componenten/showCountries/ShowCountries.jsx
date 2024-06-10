import ContinentColor from "../regionColor/ContinentColor.jsx";
import './ShowCountries.css'

// eslint-disable-next-line react/prop-types
function ShowCountries({countries, error}) {

 return (
     <>
    <ul>
        {/* eslint-disable-next-line react/prop-types */}
        {countries.map((country) => (
            <li key={country.name}>
                <img src={country.href.flag} alt={country.name}/>
                <span className={ContinentColor(country.continent)}>{country.name}</span>
                <p>Has a population of {country.population} people</p>
            </li>
        ))}
    </ul>
     {error && <p>Something went wrong</p>}
         </>
 );
}

export default ShowCountries;