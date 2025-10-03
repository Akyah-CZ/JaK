import React, {useState} from 'react';

export default function Services() {
    const [selectedId, setSelectedId] = useState(null);

    const items = [
        {
            id: 'left',
            title: 'Vedení účetnictví',
            icon: 'pi-calculator',
            keyPoints: [
                'Podvojné účetnictví a daňová evidence',
                'Sestavení účetní závěrky',
                'Přiznání k dani z příjmů a DPH',
                'Komunikace s finančním úřadem',
                'Účetní poradenství'
            ],
            details: {
                description: 'Poskytujeme kompletní účetní služby přizpůsobené velikosti a potřebám vašeho podnikání. Naši odborníci zajistí správné vedení účetnictví v souladu s platnými zákony a předpisy. Specializujeme se jak na podvojné účetnictví pro firmy, tak na daňovou evidenci pro OSVČ.',
                additionalServices: [
                    'Zpracování a kontrola účetních dokladů',
                    'Inventarizace majetku a závazků',
                    'Analýza hospodářských výsledků',
                    'Příprava podkladů pro audit',
                    'Poradenství při změnách právní formy'
                ]
            }
        },
        {
            id: 'right',
            title: 'Mzdové účetnictví',
            icon: 'pi-users',
            keyPoints: [
                'Výpočet mezd a zákonných odvodů',
                'Zpracování pracovních smluv',
                'Hlášení pojišťovnám a úřadům',
                'Roční zúčtování daně',
                'Personální poradenství'
            ],
            details: {
                description: 'Specializujeme se na komplexní mzdovou agendu a personalistiku. Zajistíme správné výpočty mezd, dodržení všech zákonných povinností a terminů pro hlášení. Naše služby pokrývají vše od běžného zpracování mezd až po složité personální situace.',
                additionalServices: [
                    'Evidence docházky a práce přesčas',
                    'Výpočet nemocenských a ošetřovného',
                    'Zpracování cestovních náhrad',
                    'Evidování benefitů a odměn',
                    'Příprava podkladů pro kontroly'
                ]
            }
        }
    ];

    const selected = selectedId ? items.find(i => i.id === selectedId) : null;

    return (
        <div className="contact-page">
            <div className="page-header">
                <h1>Služby</h1>
                <p>Nabízíme komplexní účetní a mzdové služby přizpůsobené potřebám vašeho podnikání.</p>
            </div>

            <div className="page-content-section">
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
                                    <ul className="service-items panel-service-items">
                                        {item.keyPoints.map((point, index) => (
                                            <li key={index} className="service-item">
                                                <i className="pi pi-check-circle service-icon" aria-hidden="true"></i>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
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
                                <span>{selected.title} - Detailní informace</span>
                            </div>
                            <div className="panel-content">
                                <div className="service-description">
                                    <p>{selected.details.description}</p>
                                </div>

                                {selected.details.additionalServices && (
                                    <div className="service-list">
                                        <h4>Další služby v rámci {selected.title.toLowerCase()}:</h4>
                                        <ul className="service-items">
                                            {selected.details.additionalServices.map((service, index) => (
                                                <li key={index} className="service-item">
                                                    <i className="pi pi-angle-right service-icon" aria-hidden="true"></i>
                                                    <span>{service}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}