
    // don't want more than one new line, tab, or space back to back, so we can use regex to simply replace all 
    // "space" characters of any length with one single space
    export const sanitizeString = (unsanitaryString) => {
        return unsanitaryString.replace(/\s+/g, ' ');
    }