import {useEffect, useMemo, useState} from "react";
import {useTexts} from "../hooks/useTexts.jsx";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {accountingFormConfig, wagesFormConfig} from "../models/FormData.jsx";

export default function Pricing() {
    const [selectedId, setSelectedId] = useState(null);
    const {getText, loading} = useTexts();
    const [form, setForm] = useState(null);
    const [currentConfig, setCurrentConfig] = useState(null);

    const serviceTitle = useMemo(() => {
        if (!selectedId) return "";
        if (selectedId === 'left') return getText('pricing.accounting.title');
        if (selectedId === 'right') return getText('pricing.wages.title');
        return "";
    }, [selectedId, getText]);

    // Build empty form values from config
    const buildDefaults = (config) => {
        const values = {};
        config.forEach(f => {
            switch (f.fieldType) {
                case 'bool':
                    values[f.fieldName] = false;
                    break;
                case 'date':
                    values[f.fieldName] = null;
                    break;
                default:
                    values[f.fieldName] = '';
            }
        });
        return values;
    };

    // When selected changes, set current config and defaults
    useEffect(() => {
        if (!selectedId) return;
        const cfg = selectedId === 'left' ? accountingFormConfig : wagesFormConfig;
        setCurrentConfig(cfg);
        setForm(prev => {
            // reset to defaults when switching kind
            const defaults = buildDefaults(cfg);
            return {...defaults, ...(prev || {})};
        });
    }, [selectedId]);

    if (loading) {
        return <div>Načítání textů...</div>;
    }

    const items = [
        {
            id: 'left',
            title: getText('pricing.accounting.title'),
            icon: getText('pricing.accounting.icon'),
            text: getText('pricing.accounting.text'),
            form: accountingFormConfig
        },
        {
            id: 'right',
            title: getText('pricing.wages.title'),
            icon: getText('pricing.wages.icon'),
            text: getText('pricing.wages.text'),
            form: wagesFormConfig
        }]

    const teaser = (full, len = 90) => (full.length > len ? full.slice(0, len).trim() + '…' : full);

    const targetEmail = (getText('company.email') || '').includes('@') ? getText('company.email') : 'info@example.com';

    const updateField = (key, value) => setForm(prev => ({...prev, [key]: value}));

    const fieldRenderer = (field) => {
        const commonProps = {
            id: field.fieldName,
            value: form?.[field.fieldName],
            placeholder: field.placeholder,
            required: !!field.required
        };
        const label = <label htmlFor={field.fieldName} className="form-label">{field.fieldLabel}</label>;
        switch (field.fieldType) {
            case 'area':
                return (
                    <div className="col-12" key={field.fieldName}>
                        {label}
                        <InputTextarea id={field.fieldName}
                                       value={form?.[field.fieldName] || ''}
                                       onChange={(e) => updateField(field.fieldName, e.target.value)}
                                       rows={field.rows || 5}
                                       autoResize
                                       style={{ width: '100%' }}
                                       placeholder={field.placeholder || ''}/>
                    </div>
                );
            case 'date':
                return (
                    <div className="col-12 col-md-6" key={field.fieldName}>
                        {label}
                        <Calendar id={field.fieldName}
                                  value={form?.[field.fieldName] || null}
                                  onChange={(e) => updateField(field.fieldName, e.value)}
                                  dateFormat="dd.mm.yy" showIcon locale="cs"
                                  style={{ width: '100%' }}
                                  placeholder={field.placeholder || ''}/>
                    </div>
                );
            case 'bool':
                return (
                    <div className="col-12 col-md-6" key={field.fieldName}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Checkbox inputId={field.fieldName}
                                      checked={!!form?.[field.fieldName]}
                                      onChange={(e) => updateField(field.fieldName, e.checked)}/>
                            <span>{field.fieldLabel}</span>
                        </label>
                    </div>
                );
            case 'int':
                return (
                    <div className="col-6 col-md-3" key={field.fieldName}>
                        {label}
                        <InputText id={field.fieldName}
                                   type="number" inputMode="numeric"
                                   value={form?.[field.fieldName]}
                                   onChange={(e) => updateField(field.fieldName, e.target.value)}
                                   style={{ width: '100%' }}
                                   placeholder={field.placeholder || '0'}/>
                    </div>
                );
            default:
                return (
                    <div className="col-12 col-md-6" key={field.fieldName}>
                        {label}
                        <InputText id={field.fieldName}
                                   type={field.inputType || 'text'}
                                   value={form?.[field.fieldName]}
                                   onChange={(e) => updateField(field.fieldName, e.target.value)}
                                   style={{ width: '100%' }}
                                   placeholder={field.placeholder || ''} required={!!field.required}/>
                    </div>
                );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Poptávka: ${serviceTitle || 'Služba'}`);
        const formatDate = (d) => (d instanceof Date ? d.toLocaleDateString() : (d ? String(d) : ""));
        const formatValue = (f) => {
            const v = form?.[f.fieldName];
            switch (f.fieldType) {
                case 'bool': return v ? 'Ano' : 'Ne';
                case 'date': return formatDate(v);
                default: return v ?? '';
            }
        };
        const sectionsOrder = ['company', 'documents', 'specification'];
        const bodyLines = [`Služba: ${serviceTitle}`];
        sectionsOrder.forEach(sec => {
            currentConfig
                .filter(f => f.section === sec)
                .forEach(f => bodyLines.push(`${f.fieldLabel}: ${formatValue(f)}`));
        });
        const body = encodeURIComponent(bodyLines.join("\n"));
        const mailto = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        window.location.href = mailto;
    };

    const handleSelect = (itemId) => {
        setSelectedId(itemId);
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
                                onClick={() => handleSelect(item.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleSelect(item.id);
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

                {selectedId && currentConfig && form && (
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
                                            <div className="col-6 col-md-6">
                                                <div className="row g-3">
                                                    {currentConfig.filter(f => f.section === 'company' && f.fieldName !== 'description').map(fieldRenderer)}
                                                </div>
                                            </div>
                                            <div className="col-6 col-md-6">
                                                <div className="row g-3">
                                                    {currentConfig.filter(f => f.section === 'company' && f.fieldName === 'description').map(fieldRenderer)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Měsíční objemy dokladů */}
                                    {currentConfig.some(f => f.section === 'documents') && (
                                        <div className="form-section" style={{marginTop: '1rem'}}>
                                            <h3 style={{margin: '0 0 0.5rem'}}>Měsíční objemy dokladů</h3>
                                            <div className="row g-3">
                                                {currentConfig.filter(f => f.section === 'documents').map(fieldRenderer)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Specifikace poptávky */}
                                    {currentConfig.some(f => f.section === 'specification') && (
                                        <div className="form-section" style={{marginTop: '1rem'}}>
                                            <h3 style={{margin: '0 0 0.5rem'}}>Specifikace poptávky</h3>
                                            <div className="row g-3">
                                                {currentConfig.filter(f => f.section === 'specification').map(fieldRenderer)}
                                            </div>
                                        </div>
                                    )}

                                    <Button type="submit" label="Odeslat" xicon="pi pi-send" style={{marginTop: '1rem', maxWidth: '10rem'}}/>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}