import React from 'react';
import {Card} from 'primereact/card';

export default function Contact() {

    return (
        <div className="content">
            <div className="page-header">
                <h1>Kontaktní údaje</h1>
                <p>Nebojte se nás kontaktovat, emailem, telefonicky či osobně.</p>
            </div>

            <div className="page-content-section">
                <div className="contact-content">
                    <div className="map-section">
                        <Card className="map-card">
                            <div className="contact-details">
                                <div className="contact-detail-item">
                                    <i className="pi pi-id-card"></i>
                                    <div>
                                        <strong>IČO:</strong><br/>
                                        <a href="https://or.justice.cz/ias/ui/rejstrik-$firma?ico=23034009" target="_blank" rel="noopener noreferrer" className="contact-link">
                                            23034009
                                        </a>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <i className="pi pi-id-card"></i>
                                    <div>
                                        <strong>DIČ:</strong><br/>
                                        <a href="https://or.justice.cz/ias/ui/rejstrik-$firma?ico=23034009" target="_blank" rel="noopener noreferrer" className="contact-link">
                                            CZ23034009
                                        </a>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <i className="pi pi-envelope"></i>
                                    <div>
                                        <strong>Email:</strong><br/>
                                        <a href="mailto:info@jakucetnictvi.cz" className="contact-link">
                                            info@jaknaucto.cz
                                        </a>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <i className="pi pi-phone"></i>
                                    <div>
                                        <strong>Telefon:</strong><br/>
                                        <a href="tel:+420123456789" className="contact-link">
                                            +420 123 456 789
                                        </a>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <i className="pi pi-map-marker"></i>
                                    <div>
                                        <strong>Adresa:</strong><br/>
                                        <a href="https://www.google.com/maps/dir//t%C5%99.+Kpt.+Jaro%C5%A1e+1922%2F3,+602+00+Brno-st%C5%99ed-%C4%8Cern%C3%A1+Pole/@49.2003418,16.6081936,17z/data=!4m18!1m8!3m7!1s0x4712945bf2a662fb:0xcac6679cc4ee2021!2zdMWZLiBLcHQuIEphcm_FoWUgMTkyMi8zLCA2MDIgMDAgQnJuby1zdMWZZWQtxIxlcm7DoSBQb2xl!3b1!8m2!3d49.2003418!4d16.6107685!16s%2Fg%2F11c1zsv73_!4m8!1m0!1m5!1m1!1s0x4712945bf2a662fb:0xcac6679cc4ee2021!2m2!1d16.6107685!2d49.2003418!3e3?entry=ttu&g_ep=EgoyMDI1MDkzMC4wIKXMDSoASAFQAw%3D%3D"
                                           target="_blank" rel="noopener noreferrer" className="contact-link">
                                            tř. Kpt. Jaroše 1922/3<br/>
                                            602 00 Brno-střed-Černá Pole
                                        </a>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <i className="pi pi-credit-card"></i>
                                    <div>
                                        <strong>Číslo účtu:</strong><br/>
                                        123456789/0100<br/>
                                        <small style={{ color: 'var(--color-secondary-600)' }}>
                                            Komerční banka
                                        </small>
                                    </div>
                                </div>

                                {/*<div className="contact-detail-item">*/}
                                {/*    <i className="pi pi-clock"></i>*/}
                                {/*    <div>*/}
                                {/*        <strong>Úřední hodiny:</strong><br/>*/}
                                {/*        Po-Pá: 8:00 - 16:00<br/>*/}
                                {/*        <small style={{ color: 'var(--color-secondary-600)' }}>*/}
                                {/*            Doporučujeme předchozí domluvu*/}
                                {/*        </small>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                            </div>

                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.0112958347554!2d16.608193577524474!3d49.20034527658003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712945bf2a662fb%3A0xcac6679cc4ee2021!2zdMWZLiBLcHQuIEphcm_FoWUgMTkyMi8zLCA2MDIgMDAgQnJuby1zdMWZZWQtxIxlcm7DoSBQb2xl!5e0!3m2!1scs!2scz!4v1759427509448!5m2!1scs!2scz"
                                    width="100%"
                                    height="300"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Naše sídlo"
                                ></iframe>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}