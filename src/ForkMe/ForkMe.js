import React from 'react';
import './ForkMe.css';
import forkmelogo from './forkme_right_red_aa0000.png';

function ForkMe() {
    return  <a href="https://github.com/eydunn/spring-actuator-loggers" target="_blank" rel="noopener noreferrer" className="ForkMe">
                <img src={forkmelogo} alt="Fork me on GitHub" />
            </a>;
}

export default ForkMe;