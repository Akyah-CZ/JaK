import React from 'react';
import {Card} from 'primereact/card';
import './Contact.css'

export default function Contact() {

    const employees = [
        {
            id: 1,
            name: "Jana Pat",
            position: "Tinder girl",
            email: "jana@email.com",
            phone: "+420 123 456 789",
            description: "Specialista na účto a Holeše. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            photo: "./PAT.png"
        },
        {
            id: 2,
            name: "Klára Mat",
            position: "Mamina mimina",
            email: "klara@email.com",
            phone: "+420 987 654 321",
            description: "Expertka na mzdy pro úče. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            photo: "./MAT.png"
        }
    ];

    return (
        <div className="contact-page">

            {/* Hero Section */}
            <div className="contact-header">
                <h1>Náš tým</h1>
                <p>Seznamte se s našimi odbornicemi, které vám to rády spočítaj.</p>
            </div>

            <div className="employees-container">
                {employees.map((employee, index) => (
                    <div key={employee.id}
                         className={`employee-card-wrapper ${index % 2 === 0 ? 'left-card' : 'right-card'}`}>
                        <Card className="employee-card">
                            <div className={`photo-circle ${index % 2 === 0 ? 'photo-left' : 'photo-right'}`}>
                                <img src={employee.photo} alt={employee.name}/>
                            </div>
                            <div className="employee-content">
                                <h2 className="employee-name">{employee.name}</h2>
                                <h3 className="employee-position">{employee.position}</h3>
                                <p className="employee-description">{employee.description}</p>

                                <div className="contact-info">
                                    <div className="contact-item">
                                        <i className="pi pi-envelope"></i>
                                        <span>{employee.email}</span>
                                    </div>
                                    <div className="contact-item">
                                        <i className="pi pi-phone"></i>
                                        <span>{employee.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="contact-bottom-section">
                <div className="map-section">
                    <Card className="map-card">
                        {/*<h3>Kde nás najdete</h3>*/}
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.2097663139994!2d14.420970776019834!3d50.08804097151632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94eb5c8e5dc3%3A0x9d43ca60c8d7f25!2sWenceslas%20Square%2C%20110%2000%20New%20Town%2C%20Czechia!5e0!3m2!1sen!2scz!4v1705000000000!5m2!1sen!2scz"
                                width="100%"
                                height="300"
                                style={{border: 0}}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Naše poloha"
                            ></iframe>
                        </div>
                        <div className="address-info">
                            <div className="address-item">
                                <i className="pi pi-map-marker"></i>
                                <div>
                                    <strong>Adresa:</strong><br/>
                                    Václavské náměstí 1<br/>
                                    110 00 Praha 1
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}