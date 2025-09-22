import {useMemo, useState} from "react";
import {useTexts} from "../hooks/useTexts.jsx";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import accountingFormData from "../models/FormData.jsx";

export default function Pricing() {
    const [selectedId, setSelectedId] = useState(null);
    const {getText, loading} = useTexts();
    const [form, setForm] = useState(accountingFormData);

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

            // sekce Informace o spolecnosti
            `Název společnosti: ${form.companyName}`,
            `IČO: ${form.identifier}`,
            `Kontaktní osoba: ${form.contactName}`,
            `E-mail: ${form.contactEmail}`,
            `Telefon: ${form.contactPhone}`,
            `Počáteční datum spolupráce: ${formatDate(form.startDate)}`,

            // sekce pocet dokladu (mesicni)
            `Přijaté faktury: ${form.receivedInvoices}`,
            `Vystavené faktury: ${form.issuedInvoices}`,
            `Banka: ${form.bank}`,
            `Pokladna: ${form.cash}`,
            `Interní doklady: ${form.internalDocs}`,
            `Mzdy: ${form.payrolls}`,
            `Počet řádků v účetním deníku: ${form.rowsInDiary}`,

            // sekce specifikace poptavky
            `Plátce DPH: ${form.vat ? 'Ano' : 'Ne'}`,
            `Vystavování faktur: ${form.invoices ? 'Ano' : 'Ne'}`,
            `Popis:`,
            `${form.description}`
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
                                <i className={`pi ${items.find(i => i.id === selectedId)?.icon}`}
                                   aria-hidden="true"></i>
                                <span>Poptávkový formulář: {serviceTitle}</span>
                            </div>
                            <div className="panel-content">
                                <form onSubmit={handleSubmit} className="p-fluid">
                                    {/* Informace o společnosti */}
                                    <div className="form-section">
                                        <h3 style={{margin: '0 0 0.5rem'}}>Informace o společnosti</h3>
                                        <div className="row g-3 align-items-start">
                                            <div className="col-6">

                                                <div className="row g-3">
                                                    <div className="col-8">
                                                        <label htmlFor="companyName" className="form-label">Název
                                                            společnosti</label>
                                                        <InputText id="companyName" value={form.companyName}
                                                                   onChange={(e) => updateField('companyName', e.target.value)}
                                                                   placeholder="Název společnosti" required/>
                                                    </div>
                                                    <div className="col-4">
                                                        <label htmlFor="identifier" className="form-label">IČO</label>
                                                        <InputText id="identifier" value={form.identifier}
                                                                   onChange={(e) => updateField('identifier', e.target.value)}
                                                                   placeholder="12345678" required/>
                                                    </div>
                                                </div>

                                                <div className="row g-3 mt-0">
                                                    <div className="col-12">
                                                        <label htmlFor="contactName" className="form-label">Kontaktní
                                                            osoba</label>
                                                        <InputText id="contactName" value={form.contactName}
                                                                   onChange={(e) => updateField('contactName', e.target.value)}
                                                                   placeholder="Jméno a příjmení" required/>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mt-0">
                                                    <div className="col-6">
                                                        <label htmlFor="contactEmail"
                                                               className="form-label">E‑mail</label>
                                                        <InputText id="contactEmail" type="email"
                                                                   value={form.contactEmail}
                                                                   onChange={(e) => updateField('contactEmail', e.target.value)}
                                                                   placeholder="vas@email.cz" required/>
                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="contactPhone"
                                                               className="form-label">Telefon</label>
                                                        <InputText id="contactPhone" value={form.contactPhone}
                                                                   onChange={(e) => updateField('contactPhone', e.target.value)}
                                                                   placeholder="+420 123 456 789"/>
                                                    </div>
                                                </div>
                                                <div className="col-6 mt-3">
                                                    <label htmlFor="startDate" className="form-label">Počáteční datum
                                                        spolupráce</label>
                                                    <Calendar id="startDate" value={form.startDate}
                                                              onChange={(e) => updateField('startDate', e.value)}
                                                              dateFormat="dd.mm.yy" showIcon
                                                              placeholder="Vyberte datum"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="description" className="form-label">Popis</label>
                                                <InputTextarea id="description" value={form.description}
                                                               onChange={(e) => updateField('description', e.target.value)}
                                                               rows={11} autoResize
                                                               placeholder="Doplňující informace…"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-4">
                                        <div className="col-12 col-md-6">
                                            {/* Měsíční objemy dokladů */}
                                            <div className="form-section h-100">
                                                <h3 style={{margin: '0 0 0.5rem'}}>Měsíční objemy dokladů</h3>
                                                <div className="row g-3">
                                                    <div className="col-3">
                                                        <label htmlFor="receivedInvoices" className="form-label">Přijaté faktury</label>
                                                        <InputText id="receivedInvoices" type="number" inputMode="numeric"
                                                                   value={form.receivedInvoices}
                                                                   onChange={(e) => updateField('receivedInvoices', e.target.value)}
                                                                   placeholder="0"/>
                                                    </div>
                                                    <div className="col-3">
                                                        <label htmlFor="issuedInvoices" className="form-label">Vystavené faktury</label>
                                                        <InputText id="issuedInvoices" type="number" inputMode="numeric"
                                                                   value={form.issuedInvoices}
                                                                   onChange={(e) => updateField('issuedInvoices', e.target.value)}
                                                                   placeholder="0"/>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mt-0">
                                                    <div className="col-3">
                                                        <label htmlFor="bank" className="form-label">Banka</label>
                                                        <InputText id="bank" type="number" inputMode="numeric"
                                                                   value={form.bank}
                                                                   onChange={(e) => updateField('bank', e.target.value)}
                                                                   placeholder="0"/>
                                                    </div>
                                                    <div className="col-3">
                                                    <label htmlFor="cash" className="form-label">Pokladna</label>
                                                        <InputText id="cash" type="number" inputMode="numeric"
                                                                   value={form.cash}
                                                                   onChange={(e) => updateField('cash', e.target.value)}
                                                                   placeholder="0"/>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mt-0">
                                                    <div className="col-3">
                                                    <label htmlFor="internalDocs" className="form-label">Interní doklady</label>
                                                        <InputText id="internalDocs" type="number" inputMode="numeric"
                                                                   value={form.internalDocs}
                                                                   onChange={(e) => updateField('internalDocs', e.target.value)}
                                                                   placeholder="0"/>
                                                    </div>
                                                    <div className="col-3">
                                                    <label htmlFor="payrolls" className="form-label">Mzdy</label>
                                                        <InputText id="payrolls" type="number" inputMode="numeric"
                                                                   value={form.payrolls}
                                                                   onChange={(e) => updateField('payrolls', e.target.value)}
                                                                   placeholder="0"/>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mt-0">
                                                    <div className="col-3">
                                                    <label htmlFor="rowsInDiary" className="form-label">Počet řádků v účetním deníku</label>
                                                        <InputText id="rowsInDiary" type="number" inputMode="numeric"
                                                                   value={form.rowsInDiary}
                                                                   onChange={(e) => updateField('rowsInDiary', e.target.value)}
                                                                   placeholder="0"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            {/* Specifikace poptávky */}
                                            <div className="form-section h-100">
                                                <h3 style={{margin: '0 0 0.5rem'}}>Specifikace poptávky</h3>
                                                <div className="row g-3">
                                                    <div className="col-12 col-md-6">
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <Checkbox inputId="vat" checked={form.vat}
                                                                      onChange={(e) => updateField('vat', e.checked)}/>
                                                            <span>Plátce DPH</span>
                                                        </label>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <Checkbox inputId="invoices" checked={form.invoices}
                                                                      onChange={(e) => updateField('invoices', e.checked)}/>
                                                            <span>Vystavování faktur</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" label="Odeslat" icon="pi pi-send" style={{marginTop: '0.5rem', maxWidth: '10rem'}}/>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}