import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
    // Use Vite's BASE_URL as the basename for GitHub Pages deployment (e.g., '/JaK/')
    const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    return (
        <Router basename={basename}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Services/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/pricing" element={<Pricing/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
