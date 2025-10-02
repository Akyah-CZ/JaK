import {useEffect, useMemo, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {accountingFormConfig, wagesFormConfig} from "../models/FormData.jsx";

export default function Pricing() {
    const [selectedId, setSelectedId] = useState(null);
    const [form, setForm] = useState(null);
    const [currentConfig, setCurrentConfig] = useState(null);
    const [errors, setErrors] = useState({});

    const serviceTitle = useMemo(() => {
        if (!selectedId) return "";
        if (selectedId === 'left') return 'Vedení účta';
        if (selectedId === 'right') return 'Vedení mezd';
        return "";
    }, [selectedId]);

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

    // Validace formuláře
    const validateForm = () => {
        const newErrors = {};

        currentConfig.forEach(field => {
            if (field.required) {
                const value = form?.[field.fieldName];

                if (field.fieldType === 'bool' && !value) {
                    newErrors[field.fieldName] = `${field.fieldLabel} musí být zaškrtnuto`;
                } else if (field.fieldType === 'date' && !value) {
                    newErrors[field.fieldName] = `${field.fieldLabel} je povinné pole`;
                } else if (!value || (typeof value === 'string' && value.trim() === '')) {
                    newErrors[field.fieldName] = `${field.fieldLabel} je povinné pole`;
                }
            }
        });

        return newErrors;
    };

    // When selected changes, set current config and defaults
    useEffect(() => {
        if (!selectedId) return;
        const cfg = selectedId === 'left' ? accountingFormConfig : wagesFormConfig;
        setCurrentConfig(cfg);
        setForm(prev => {
            // reset to defaults when switching kind
            const defaults = buildDefaults(cfg);
            setErrors({});
            return {...defaults, ...(prev || {})};
        });
    }, [selectedId]);

    const items = [
        {
            id: 'left',
            title: 'Vedení účta',
            icon: 'pi-print',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula neque id convallis pharetra. Pellentesque in sem metus. Integer molestie lectus ac urna tempor, in vulputate sapien maximus. Morbi porta lacus id consectetur congue. Vivamus vitae ultrices purus. Phasellus quis lorem et justo tempor viverra. Sed bibendum sem a sapien luctus lacinia. Donec in nulla et lorem fermentum tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
            form: accountingFormConfig
        },
        {
            id: 'right',
            title: 'Vedení mezd',
            icon: 'pi-wallet',
            text: 'Aliquam erat volutpat. Suspendisse in purus id velit venenatis mattis a sit amet justo. Phasellus accumsan eros sit amet dignissim dapibus. Integer vitae diam ut arcu fermentum ullamcorper. Sed commodo varius sapien, id interdum justo efficitur id. Cras eu urna molestie, tristique lacus non, tincidunt lacus. Donec a arcu at risus ultricies lacinia. Suspendisse vitae tortor et lorem facilisis cursus. In hac habitasse platea dictumst. Nam a erat nec augue dapibus efficitur in sit amet elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            form: wagesFormConfig
        }]

    const teaser = (full, len = 90) => (full.length > len ? full.slice(0, len).trim() + '…' : full);

    const targetEmail = 'info@jakucetnictvi.cz';

    const updateField = (key, value) => {
        setForm(prev => ({...prev, [key]: value}));
        // Vymaž chybu při změně hodnoty
        if (errors[key]) {
            setErrors(prev => ({...prev, [key]: null}));
        }
    };

    const fieldRenderer = (field) => {
        const hasError = errors[field.fieldName];
        const label = (
            <label htmlFor={field.fieldName} className="form-label">
                {field.fieldLabel}
                {field.required && <span style={{color: 'red'}}> *</span>}
            </label>
        );

        const errorMessage = hasError && (
            <small style={{color: 'red', marginTop: '0.25rem', display: 'block'}}>
                {hasError}
            </small>
        );

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
                                       style={{
                                           width: '100%',
                                           borderColor: hasError ? 'red' : undefined
                                       }}
                                       placeholder={field.placeholder || ''}
                                       className={hasError ? 'p-invalid' : ''}/>
                        {errorMessage}
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
                                  style={{
                                      width: '100%',
                                      borderColor: hasError ? 'red' : undefined
                                  }}
                                  placeholder={field.placeholder || ''}
                                  className={hasError ? 'p-invalid' : ''}/>
                        {errorMessage}
                    </div>
                );
            case 'bool':
                return (
                    <div className="col-12 col-md-6" key={field.fieldName}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: hasError ? 'red' : undefined
                        }}>
                            <Checkbox inputId={field.fieldName}
                                      checked={!!form?.[field.fieldName]}
                                      onChange={(e) => updateField(field.fieldName, e.checked)}
                                      className={hasError ? 'p-invalid' : ''}/>
                            <span>
                                {field.fieldLabel}
                                {field.required && <span style={{color: 'red'}}> *</span>}
                            </span>
                        </label>
                        {errorMessage}
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
                                   style={{
                                       width: '100%',
                                       borderColor: hasError ? 'red' : undefined
                                   }}
                                   placeholder={field.placeholder || '0'}
                                   className={hasError ? 'p-invalid' : ''}/>
                        {errorMessage}
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
                                   style={{
                                       width: '100%',
                                       borderColor: hasError ? 'red' : undefined
                                   }}
                                   placeholder={field.placeholder || ''}
                                   className={hasError ? 'p-invalid' : ''}/>
                        {errorMessage}
                    </div>
                );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validace formuláře
        const formErrors = validateForm();
        setErrors(formErrors);

        // Pokud jsou chyby, nezasílej formulář
        if (Object.keys(formErrors).length > 0) {
            return;
        }

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
        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    };

    const handleSelect = (itemId) => {
        setSelectedId(itemId);
    };

    return (
        <div className="content">
            <div className="page-header">
                <h1>Ceník</h1>
                <p>Vyberte si službu a vyplňte poptávkový formulář pro získání cenové nabídky na míru.</p>
            </div>

            <div className="page-content-section">
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