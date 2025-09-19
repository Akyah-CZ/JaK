import {useState} from 'react';
import {useTexts} from "../hooks/useTexts.jsx";

export default function Services() {
    const [selectedId, setSelectedId] = useState(null);
    const {getText, loading} = useTexts();
    if (loading) {
        return <div>Načítání textů...</div>;
    }

    const items = [
        {
            id: 'left',
            title: getText('services.accounting.title'),
            icon: getText('services.accounting.icon'),
            text: getText('services.accounting.text'),
        },
        {
            id: 'right',
            title: getText('services.wages.title'),
            icon: getText('services.wages.icon'),
            text: getText('services.wages.text'),
        }]


    const teaser = (full, len = 70) => (full.length > len ? full.slice(0, len).trim() + '…' : full);
    const selected = selectedId ? items.find(i => i.id === selectedId) : null;


    return (
        <div className="page-content">
            <h1>{getText('services.title')}</h1>

            <div className="content-section">
                <div className="grid services-grid">
                    {items.map((item) => (
                        <div key={item.id} className="col-12 md:col-6">
                            <div
                                className="panel panel-clickable"
                                role="button"
                                tabIndex={0}
                                onClick={() => setSelectedId(item.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setSelectedId(item.id);
                                    }
                                }}
                                aria-pressed={selectedId === item.id}
                                aria-label={`Zobrazit detail: ${item.title}`}
                            >
                                <div className="panel-header">
                                    <i className={`pi ${item.icon}`} aria-hidden="true"></i>
                                    <span>{item.title}</span>
                                </div>
                                <div className="panel-content">
                                    <p>{teaser(item.text)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selected && (
                    <div className="services-detail">
                        <div className="panel">
                            <div className="panel-header">
                                <i className={`pi ${selected.icon}`} aria-hidden="true"></i>
                                <span>Detail: {selected.title}</span>
                            </div>
                            <div className="panel-content">
                                <p>{selected.text}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}