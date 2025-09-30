const commonFormData = [
    {
        fieldName: "companyName",
        fieldLabel: "Název společnosti",
        fieldType: "text",
        required: true,
        placeholder: "Název společnosti",
        section: "company"
    },
    {
        fieldName: "identifier",
        fieldLabel: "IČO",
        fieldType: "text",
        required: true,
        placeholder: "12345678",
        section: "company"
    },
    {
        fieldName: "contactName",
        fieldLabel: "Kontaktní osoba",
        fieldType: "text",
        required: true,
        placeholder: "Jméno a příjmení",
        section: "company"
    },
    {
        fieldName: "contactEmail",
        fieldLabel: "E‑mail",
        fieldType: "text",
        required: true,
        placeholder: "vas@email.cz",
        inputType: "email",
        section: "company"
    },
    {
        fieldName: "contactPhone",
        fieldLabel: "Telefon",
        fieldType: "text",
        required: false,
        placeholder: "(+420) 123456789",
        inputType: "tel",
        section: "company"
    },
    {
        fieldName: "startDate",
        fieldLabel: "Počáteční datum spolupráce",
        fieldType: "date",
        required: false,
        placeholder: "Vyberte datum",
        section: "company"
    },
    {
        fieldName: "description",
        fieldLabel: "Popis",
        fieldType: "area",
        required: false,
        placeholder: "Doplňující informace…",
        rows: 16,
        section: "company"
    },
]

const accountingFormConfig = [
    ...commonFormData,
    {
        fieldName: "receivedInvoices",
        fieldLabel: "Přijaté faktury",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "issuedInvoices",
        fieldLabel: "Vystavené faktury",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "bank",
        fieldLabel: "Banka",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "cash",
        fieldLabel: "Pokladna",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "internalDocs",
        fieldLabel: "Interní doklady",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "payrolls",
        fieldLabel: "Mzdy",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "rowsInDiary",
        fieldLabel: "Počet řádků v účetním deníku",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "vat",
        fieldLabel: "Plátce DPH",
        fieldType: "bool",
        required: true,
        section: "specification"
    },
    {
        fieldName: "invoices",
        fieldLabel: "Vystavování faktur",
        fieldType: "bool",
        required: true,
        section: "specification"
    }
];

const wagesFormConfig = [
        ...commonFormData,
    {
        fieldName: "numberOfPersonalNumbers",
        fieldLabel: "Počet osobních čísel",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "mainEmploymentContract",
        fieldLabel: "Hlavní pracovní poměr",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "workPerformanceContract",
        fieldLabel: "Dohoda o provedení práce",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "activityAgreement",
        fieldLabel: "Dohoda o pracovní činnosti",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
    {
        fieldName: "functionPerformanceContract",
        fieldLabel: "Smlouva o výkonu funkce",
        fieldType: "int",
        required: true,
        placeholder: "0",
        section: "documents"
    },
];

export { accountingFormConfig, wagesFormConfig };