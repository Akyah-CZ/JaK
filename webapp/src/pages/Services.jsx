import React, {useState} from 'react';

export default function Services() {
    const [selectedId, setSelectedId] = useState(null);

    const items = [
        {
            id: 'left',
            title: 'Vedení účta',
            icon: 'pi-print',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula neque id convallis pharetra. Pellentesque in sem metus. Integer molestie lectus ac urna tempor, in vulputate sapien maximus. Morbi porta lacus id consectetur congue. Vivamus vitae ultrices purus. Phasellus quis lorem et justo tempor viverra. Sed bibendum sem a sapien luctus lacinia. Donec in nulla et lorem fermentum tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
        },
        {
            id: 'right',
            title: 'Vedení mezd',
            icon: 'pi-wallet',
            text: 'Aliquam erat volutpat. Suspendisse in purus id velit venenatis mattis a sit amet justo. Phasellus accumsan eros sit amet dignissim dapibus. Integer vitae diam ut arcu fermentum ullamcorper. Sed commodo varius sapien, id interdum justo efficitur id. Cras eu urna molestie, tristique lacus non, tincidunt lacus. Donec a arcu at risus ultricies lacinia. Suspendisse vitae tortor et lorem facilisis cursus. In hac habitasse platea dictumst. Nam a erat nec augue dapibus efficitur in sit amet elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        }]


    const teaser = (full, len = 90) => (full.length > len ? full.slice(0, len).trim() + '…' : full);
    const selected = selectedId ? items.find(i => i.id === selectedId) : null;

    return (
        <div className="content">
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