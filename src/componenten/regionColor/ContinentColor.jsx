import './ContinentColor.css'

function ContinentColor(continent) {

    switch (continent) {
        case 'Africa':
            return 'africa-color';
        case 'South America':
            return 'south-america-color';
        case 'Asia':
            return 'asia-color';
        case 'Europe':
            return 'europe-color';
        case 'North America':
            return 'north-america-color';
        case 'Australia':
            return 'australia-color';
        default:
            return '';

    }
}

export default ContinentColor;