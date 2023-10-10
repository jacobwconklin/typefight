# typefight

This is a web-application for typing games created by Jacob Conklin on 08/08/2023.


## Deployment

Deployed on Azure, redeploy by zipping up build folder then copying it (via drag and drop from file explorer) 
onto this page SPECIFICALLY Into the folder -> site -> wwwroot:
https://typefight.scm.azurewebsites.net/DebugConsole
Deployed app is available at:
https://typefight.azurewebsites.net/

## Design

Designed largely with custom CSS, and using the Ant Design component library for React available at: https://ant.design/

Typefaces are installed with Fontsource found here: https://fontsource.org/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Future Plans:

1) Adopt Web-socket method of statusing back-end rather than short polling endpoints (will also allow easy way to deal with
deleting user information when they leave the site)