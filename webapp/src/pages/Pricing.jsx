import {useMemo, useState} from "react";
import {useTexts} from "../hooks/useTexts.jsx";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

export default function Pricing() {
    const [selectedId, setSelectedId] = useState(null);
    const {getText, loading} = useTexts();
    const [form, setForm] = useState({
        companyName: "",
        identifier: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        description: "",
        fav: "",
        fap: "",
        rows: "",
        bank: "",
        pokladna: "",
        intDokl: "",
        mzdy: "",
        vat: true,
        invoices: true,
        startDate: new Date(),
    });

    const serviceTitle = useMemo(() => {
        if (!selectedId) return "";
        if (selectedId === 'left') return getText('pricing.accounting.title');
        if (selectedId === 'right') return getText('pricing.wages.title');
        return "";
    }, [selectedId, getText]);

    if (loading) {
        return <div>Načítání textů...</div>;
    }

    const items = [
        {
            id: 'left',
            title: getText('pricing.accounting.title'),
            icon: getText('pricing.accounting.icon'),
            text: getText('pricing.accounting.text'),
        },
        {
            id: 'right',
            title: getText('pricing.wages.title'),
            icon: getText('pricing.wages.icon'),
            text: getText('pricing.wages.text'),
        }]

    const teaser = (full, len = 90) => (full.length > len ? full.slice(0, len).trim() + '…' : full);

    const targetEmail = (getText('company.email') || '').includes('@') ? getText('company.email') : 'info@example.com';

    const updateField = (key, value) => setForm(prev => ({...prev, [key]: value}));

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Poptávka: ${serviceTitle || 'Služba'}`);
        const formatDate = (d) => (d instanceof Date ? d.toLocaleDateString() : "");
        const bodyLines = [
            `Služba: ${serviceTitle}`,
            `Jméno a příjmení: ${form.fullName}`,
            `Společnost: ${form.company}`,
            `E-mail: ${form.email}`,
            `Telefon: ${form.phone}`,
            `Preferované datum: ${formatDate(form.preferredDate)}`,
            `Počáteční datum spolupráce: ${formatDate(form.startDate)}`,
            `Plátce DPH: ${form.vatPayer ? 'Ano' : 'Ne'}`,
            `Souhlasím s kontaktováním: ${form.agreeContact ? 'Ano' : 'Ne'}`,
            `Zpráva:`,
            `${form.message}`
        ];
        const body = encodeURIComponent(bodyLines.join("\n"));
        const mailto = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        window.location.href = mailto;
    };

    return (
        <div className="page-content">
            <h1>{getText('pricing.title')}</h1>

            <div className="content-section">
                <div className="grid pricing-grid">
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
                                aria-label={`Zobrazit formulář: ${item.title}`}
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

                {selectedId && (
                    <div className="pricing-detail">
                        <div className="panel">
                            <div className="panel-header">
                                <i className={`pi ${items.find(i => i.id === selectedId)?.icon}`} aria-hidden="true"></i>
                                <span>Poptávkový formulář: {serviceTitle}</span>
                            </div>
                            <div className="panel-content">
                                <form onSubmit={handleSubmit} className="p-fluid" style={{display: 'grid', gap: '0.75rem'}}>
                                    <div className="field">
                                        <label htmlFor="fullName">Jméno a příjmení</label>
                                        <InputText id="fullName" value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} placeholder="Vaše jméno" required />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="company">Společnost</label>
                                        <InputText id="company" value={form.company} onChange={(e) => updateField('company', e.target.value)} placeholder="Název společnosti (nepovinné)" />
                                    </div>
                                    <div className="field" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem'}}>
                                        <span>
                                            <label htmlFor="email">E-mail</label>
                                            <InputText id="email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="vas@email.cz" required />
                                        </span>
                                        <span>
                                            <label htmlFor="phone">Telefon</label>
                                            <InputText id="phone" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="+420 123 456 789" />
                                        </span>
                                    </div>

                                    <div className="field" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem'}}>
                                        <span>
                                            <label htmlFor="preferredDate">Preferovaný termín</label>
                                            <Calendar id="preferredDate" value={form.preferredDate} onChange={(e) => updateField('preferredDate', e.value)} dateFormat="dd.mm.yy" showIcon placeholder="Vyberte datum" />
                                        </span>
                                        <span>
                                            <label htmlFor="startDate">Zahájení spolupráce</label>
                                            <Calendar id="startDate" value={form.startDate} onChange={(e) => updateField('startDate', e.value)} dateFormat="dd.mm.yy" showIcon placeholder="Vyberte datum" />
                                        </span>
                                    </div>

                                    <div className="field" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem'}}>
                                        <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                                            <Checkbox inputId="vatPayer" checked={form.vatPayer} onChange={(e) => updateField('vatPayer', e.checked)} />
                                            <span>Jsem plátce DPH</span>
                                        </label>
                                        <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                                            <Checkbox inputId="agreeContact" checked={form.agreeContact} onChange={(e) => updateField('agreeContact', e.checked)} />
                                            <span>Souhlasím s kontaktováním</span>
                                        </label>
                                    </div>

                                    <div className="field">
                                        <label htmlFor="message">Zpráva</label>
                                        <InputTextarea id="message" value={form.message} onChange={(e) => updateField('message', e.target.value)} rows={5} autoResize placeholder="Doplňující informace…" />
                                    </div>

                                    <Button type="submit" label="Odeslat e‑mailem" icon="pi pi-send" className="p-button-lg" style={{width:'100%', marginTop:'0.5rem'}} />
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}