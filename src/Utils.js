
    // don't want more than one new line, tab, or space back to back, so we can use regex to simply replace all 
    // "space" characters of any length with one single space
    export const sanitizeString = (unsanitaryString) => {
        return unsanitaryString.replace(/\s+/g, ' ').replaceAll("\u2014", "-").replaceAll("\u2013", "-");
    }

    // Get the base URL of the back-end server - change to quickly switche between locally run and deployed back-end
    export const getServerBaseUrl = () => {
        return "https://typefightbackend.azurewebsites.net/";
        // return "http://localhost:3000/";
    }

    // standard header for hitting the back-end server
    export const getStandardHeader = () => {
        return {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    }