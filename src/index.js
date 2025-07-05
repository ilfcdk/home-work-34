import './styles.css';
import Logo from './images/logo.png';

const img = document.createElement('img');
img.src = Logo;
document.body.appendChild(img);

const heading = document.createElement('h1');
heading.textContent = 'Webpack в дії!';
document.body.appendChild(heading);
