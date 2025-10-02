import React from 'react';
import {Card} from "primereact/card";

export default function About() {

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
        <div className="content">
            <div className="page-header">
                <h1>Náš tým</h1>
                <p>Seznamte se s našimi odbornicemi, které vám to rády spočítaj.</p>
            </div>

            <div className="page-content-section">
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

                                    {/*<div className="contact-info">*/}
                                    {/*    <div className="contact-item">*/}
                                    {/*        <i className="pi pi-envelope"></i>*/}
                                    {/*        <span>{employee.email}</span>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="contact-item">*/}
                                    {/*        <i className="pi pi-phone"></i>*/}
                                    {/*        <span>{employee.phone}</span>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        );
}