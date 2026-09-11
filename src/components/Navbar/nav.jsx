import { useState } from 'react'
import './nav.css'

function Nav({ triggerIntro }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScrollToSection = (selector) => {
        const element = document.querySelector(selector);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
        <div className="nav">
            <div className="navBrand" onClick={() => handleScrollToSection('.hero')}>
                <span className="navPrompt" aria-label="Brand logo">
                    <img className="navLogoImg" src="/logo.png" alt="Logo" />
                </span>
                <span className="navLogoTxt">hii_i_am_netra</span>
            </div>

            <div className="navMenu">
                <span className="navLink" onClick={() => handleScrollToSection('.hero')}>Home</span>
                <span className="navLink" onClick={() => handleScrollToSection('.about-container, .about')}>About</span>
                <span className="navLink" onClick={() => handleScrollToSection('.expSection, .exp')}>Experience</span>
                <span className="navLink" onClick={() => handleScrollToSection('.projectsContainer, .projects')}>Projects</span>
                <span className="navLink navReplayBtn" onClick={triggerIntro}>Replay Intro</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div className="navStatus">
                    <span className="navStatusDot" />
                    <span>SECURE</span>
                </div>
                <button
                    className="navContactBtn"
                    onClick={() => handleScrollToSection('.contContainer')}
                >
                    Contact
                </button>
            </div>

            {/* Hamburger button */}
            <button className="navHamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                <span style={{ opacity: menuOpen ? 0 : 1 }} />
                <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
        </div>

        {/* Mobile overlay menu */}
        <div className={`navMobileOverlay ${menuOpen ? 'open' : ''}`}>
            <span className="navLink" onClick={() => handleScrollToSection('.hero')}>[ Home ]</span>
            <span className="navLink" onClick={() => handleScrollToSection('.about-container, .about')}>[ About ]</span>
            <span className="navLink" onClick={() => handleScrollToSection('.expSection, .exp')}>[ Experience ]</span>
            <span className="navLink" onClick={() => handleScrollToSection('.projectsContainer')}>[ Projects ]</span>
            <span className="navLink" onClick={() => handleScrollToSection('.skillsDashboard')}>[ Skills ]</span>
            <span className="navLink navReplayBtn" onClick={() => { triggerIntro(); setMenuOpen(false); }}>[ Replay Intro ]</span>
            <button className="navContactBtn" onClick={() => handleScrollToSection('.contContainer')}>Contact</button>
        </div>
        </>
    );
}

export default Nav;
