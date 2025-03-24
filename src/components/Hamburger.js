import React from 'react';

const Hamburger = ({ isOpen, toggleMenu }) => {
    return (
        <button
            className={`hamburger-button ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
            type="button"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default Hamburger; 