import React, { useEffect } from 'react';
import '../CSS/Header.css';
import CsvReader from "../../Components/CsvReader";

const Header = () => {
    useEffect(() => {
        const parallaxHeight = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sampleSection = document.querySelector('.sample-section');
        const sampleHeaderSection = document.querySelector('.sample-header-section');
        const sampleHeader = document.querySelector('.sample-header');

        if (sampleSection && sampleHeaderSection && sampleHeader) {
            const sampleSectionTop = sampleSection.offsetTop;
            const headerHeight = sampleHeaderSection.offsetHeight;
            sampleSection.style.marginTop = `${headerHeight}px`;
            sampleHeader.style.height = `${headerHeight - scrollTop}px`;
        }
        };

        parallaxHeight();

        const handleScroll = () => parallaxHeight();
        const handleResize = () => parallaxHeight();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className="sample-header">
                <div className="sample-header-section">
                    <h1>Scroll down to see not the best, but the most well put together app</h1>
                    <h2>EmployeePairs </h2>
                </div>
            </div>
            <div className="sample-section-wrap">
                <div className="sample-section">
                    <CsvReader />
                </div>
            </div>
            </div>
    );
};

export default Header;
