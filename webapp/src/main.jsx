import { createRoot } from 'react-dom/client'
import './index.css'
import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
