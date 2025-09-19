import { useState, useEffect } from 'react';
import textsData from '../properties/texts.json';

export const useTexts = () => {
    const [texts, setTexts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTexts = async () => {
            try {
                setTexts(textsData);
            } catch (error) {
                console.error('Chyba při načítání textů:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTexts();
    }, []);

    const getText = (key) => {
        const keys = key.split('.');
        let value = texts;

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Vrátí původní klíč, pokud text nenajde
            }
        }

        return value || key;
    };

    return { getText, loading, texts };
};