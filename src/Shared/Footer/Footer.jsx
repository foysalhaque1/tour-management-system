import React from 'react';
import TourLogo from '../TourLogo/TourLogo';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10">
            <aside>
                <TourLogo />
                <p className="font-bold">
                    Wanderlust Travels
                    <br />
                    Your Gateway to the World's Best Adventures
                </p>
               
            </aside>

            <nav>
                <div className="grid grid-flow-col gap-6 text-white text-opacity-90">
                    {/* Facebook */}
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="hover:text-blue-500 transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.5c0-.9.2-1.5 1.2-1.5H18V0h-3.8C10.6 0 9 1.6 9 4.6V8z" />
                        </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/foysal-haque-6a5484169?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-blue-400 transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1 4.98 2 4.98 3.5zM0 24h5V7H0v17zm7.5-17h4.7v2.4h.1c.6-1.2 2-2.4 4.1-2.4 4.4 0 5.2 2.9 5.2 6.6V24h-5V14.3c0-2.3 0-5.2-3.2-5.2-3.2 0-3.7 2.5-3.7 5.1V24H7.5V7z" />
                        </svg>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/foysalhaque1"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-gray-300 transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.5 7.9 11.1.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.3-3.9-1.3-.6-1.4-1.5-1.7-1.5-1.7-1.2-.9.1-.9.1-.9 1.3.1 2 1.4 2 1.4 1.2 2 3.2 1.4 4 .9.1-.9.5-1.4.9-1.8-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.7.9 1.2 1.9 1.2 3.2 0 4.6-2.7 5.5-5.3 5.8.5.4 1 .9 1 2v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z"/>
                        </svg>
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
