import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primeicons/primeicons.css'
import App from './App.jsx'
import { addLocale } from 'primereact/api';

// Czech locale for PrimeReact Calendar
addLocale('cs', {
    firstDayOfWeek: 1,
    dayNames: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
    dayNamesShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
    dayNamesMin: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
    monthNames: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
    monthNamesShort: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
    today: 'Dnes',
    clear: 'Vymazat'
});

createRoot(document.getElementById('root')).render(
    <App />
)
