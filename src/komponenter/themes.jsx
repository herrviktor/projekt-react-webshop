import { createContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme1, setTheme1] = useState();
    const [theme2, setTheme2] = useState();

    const changeTheme = (newTheme1, newTheme2) => {
        setTheme1(newTheme1);
        setTheme2(newTheme2);
    };

    return (
        <ThemeContext.Provider value={{ theme1, theme2, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }