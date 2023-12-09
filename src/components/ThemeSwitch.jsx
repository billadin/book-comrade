import React, { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useTheme from '../hooks/userTheme';

const ThemeSwitch = () => {
    const [colorTheme, setTheme] = useTheme();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
 
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };
 
    return (
        <>
            <DarkModeSwitch
                style={{ marginBottom: "2rem" }}
                checked={darkSide}
                onChange={toggleDarkMode}
                size={20}
            />
        </>
    );
}

export default ThemeSwitch;