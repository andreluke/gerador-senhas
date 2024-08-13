import React, { createContext, useState, useContext } from 'react';

const themes = {
    light: {
        containerBackground: "#F3F3FF",
        background: '#fff',
        color: '#000',
        headerBackground: '#392de9',
        itemBackground: '#0e0e0e',
        itemBackgroundContainer: "#FFF",
        itemTextColor: '#FFF',
        itemTextColorOpposite: "#000",
        buttonColor: '#FFF',
        backgroundModal: "rgba(24, 24, 24, 0.6)",
        routesBackground: "#FFF",
        sliderColor: "#392de9"
    },
    dark: {
        containerBackground: "#121212",
        background: '#020001',
        color: '#fff',
        headerBackground: '#4940d6',
        itemBackground: '#f1f1f1',
        itemTextColor: '#000',
        itemTextColorOpposite: "#FFF",
        buttonColor: '#000',
        itemBackgroundContainer: "#000",
        backgroundModal: "rgba(24, 24, 24, 0.6)",
        routesBackground: "#000",
        sliderColor: "#7345d6"
    },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}