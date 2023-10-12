/* eslint-disable import/first */

    // don't want more than one new line, tab, or space back to back, so we can use regex to simply replace all 
    // "space" characters of any length with one single space
    export const sanitizeString = (unsanitaryString) => {
        return unsanitaryString.replace(/\s+/g, ' ').replaceAll("\u2014", "-").replaceAll("\u2013", "-");
    }

    // Get the base URL of the back-end server - change to quickly switche between locally run and deployed back-end
    export const getServerBaseUrl = () => {
        // return "https://typefightbackend.azurewebsites.net/";
        return "http://localhost:3000/";
    }

    // standard header for hitting the back-end server
    export const getStandardHeader = () => {
        return {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    }

    // Available Fonts
    export const allFonts = [
        'Black Ops One',
        'Calibri',
        'Coda',
        'Comic Neue',
        'Federant',
        'Gabriela',
        'Grenze Gotisch',
        'Kalam',
        'Merriweather',
        'Nova Square',
        'Reggae One',
        'Roboto',
        'Roboto Serif Variable',
        'Times New Roman',
        'Tomorrow'
    ]

    // TODO gave up on dynamically grabbing these
    import bee from './Assets/Icons/bee.svg';
    import knight from './Assets/Icons/black-chess-knight.svg';
    import brain from './Assets/Icons/brain.svg';
    import cookie from './Assets/Icons/cookie.svg';
    import crab from './Assets/Icons/crab.svg';
    import croissant from './Assets/Icons/croissant.svg';
    import dragon from './Assets/Icons/dragon.svg';
    import hamster from './Assets/Icons/hamster.svg';
    import hedgehog from './Assets/Icons/hedgehog.svg';
    import koala from './Assets/Icons/koala.svg';
    import lion from './Assets/Icons/lion-face.svg';
    import lizard from './Assets/Icons/lizard.svg';
    import zombman from './Assets/Icons/man-zombie.svg';
    import ninja from './Assets/Icons/ninja.svg';
    import octopus from './Assets/Icons/octopus.svg';
    import pirate from './Assets/Icons/pirate.svg';
    import samurai from './Assets/Icons/samurai.svg';
    import whale from './Assets/Icons/spouting-whale.svg';
    import thimble from './Assets/Icons/thimble.svg';
    import turkey from './Assets/Icons/turkey.svg';
    import unicorn from './Assets/Icons/unicorn-face.svg';
    import windmill from './Assets/Icons/windmill.svg';
    import wizard from './Assets/Icons/wizard.svg';
    import zombwoman from './Assets/Icons/woman-zombie.svg'

    // Set of all icons
    const allIcons = [
        { id: 0, src: bee, title: 'bee' },
        { id: 1, src: knight, title: 'knight' },
        { id: 2, src: brain, title: 'brain' },
        { id: 3, src: cookie, title: 'cookie' },
        { id: 4, src: crab, title: 'crab' },
        { id: 5, src: croissant, title: 'croissant' },
        { id: 6, src: dragon, title: 'dragon' },
        { id: 7, src: hamster, title: 'hamster' },
        { id: 8, src: hedgehog, title: 'hedgehog' },
        { id: 9, src: koala, title: 'koala' },
        { id: 10, src: lion, title: 'lion' },
        { id: 11, src: lizard, title: 'lizard' },
        { id: 12, src: zombman, title: 'zombman' },
        { id: 13, src: ninja, title: 'ninja' },
        { id: 14, src: octopus, title: 'octopus' },
        { id: 15, src: pirate, title: 'pirate' },
        { id: 16, src: samurai, title: 'samurai' },
        { id: 17, src: whale, title: 'whale' },
        { id: 18, src: thimble, title: 'thimble' },
        { id: 19, src: turkey, title: 'turkey' },
        { id: 20, src: unicorn, title: 'unicorn' },
        { id: 21, src: windmill, title: 'windmill' },
        { id: 22, src: wizard, title: 'wizard' },
        { id: 23, src: zombwoman, title: 'zombwoman' },
    ];
    export default allIcons;
