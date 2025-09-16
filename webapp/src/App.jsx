import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Services from './pages/Services';
import Prices from './pages/Prices';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Services/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/prices" element={<Prices/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
