import { createContext, useState } from 'react';

// Skapar ett nytt kontext för färgtema
const ThemeContext = createContext();

// Definierar en ThemeProvider-komponent som kommer att omsluta andra komponenter
function ThemeProvider({ children }) {
    
    // Använder useState-hook för att hantera temats tillstånd
    const [theme, setTheme1] = useState();

    // Funktion för att ändra temat
    const changeTheme = (newTheme) => {
        setTheme1(newTheme);
    };

    // Returnerar ThemeContext.Provider som omsluter barn-komponenter
    // och ger dem tillgång till tema-värdet och changeTheme-funktionen
    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }