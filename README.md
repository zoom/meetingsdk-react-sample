# Zoom Meeting SDK Sample React

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

This repo is a [React](https://reactjs.org/) app generated via [Create React App](https://github.com/facebook/create-react-app) that uses the [Zoom Meeting SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/web) to start and join Zoom meetings and webinars.

## Installation

To get started, clone the repo:

`$ git clone https://github.com/zoom/meetingsdk-sample-react.git`

## Setup

1. Once cloned, navigate to the `meetingsdk-sample-react` directory:

   `$ cd meetingsdk-sample-react`

1. Then install the dependencies:

   `$ npm install`

1. Open the `meetingsdk-sample-react` directory in your code editor.

1. Open the `src/App.js` file, and enter values for the variables:

   **NEW:** To use the [Component View](https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view), replace `App.js` with `App-New.js`. (The `leaveUrl` is not needed).

   | Variable                   | Description |
   | -----------------------|-------------|
   | signatureEndpoint          | Required, the endpoint url that returns a signature. [Get a signature endpoint here.](https://github.com/zoom/meetingsdk-sample-signature-node.js) |
   | apiKey                   | Required, your Zoom JWT App API Key. [You can get yours here](https://marketplace.zoom.us/develop/create). |
   | meetingNumber                   | The Zoom Meeting / webinar number. |
   | role                   | Required, 0 to join the meeting / webinar, 1 to start the meeting. |
   | leaveUrl                   | Required, the url the user is taken to once the meeting is over. |
   | userName                   | Required, a name for the user joining / starting the meeting / webinar. |
   | userEmail                   | Required for Webinar, optional for Meeting, required for meeting and webinar if [registration is required]([registration](https://support.zoom.us/hc/en-us/articles/360054446052-Managing-meeting-and-webinar-registration)). The email of the user starting or joining the meeting / webinar. |
   | passWord                   | Optional, meeting password. Leave as empty string if the meeting does not require a password. |
   | registrantToken            | Required if your [meeting](https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered) or [webinar](https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars) requires [registration](https://support.zoom.us/hc/en-us/articles/360054446052-Managing-meeting-and-webinar-registration). |

   Example:

   ```js
   signatureEndpoint = 'http://localhost:4000'
   apiKey = 'xu3asdfaJPaA_RJW2-9l5_HAaLA'
   meetingNumber = '123456789'
   role = 0
   leaveUrl = 'http://localhost:3000'
   userName = 'React'
   userEmail = ''
   passWord = ''
   registrantToken = ''
   ```

1. Save `App.js`.

1. Run the app:

   `$ npm start`

## Usage

1. Navigate to http://localhost:3000.

   ![Zoom React Meeting SDK](https://camo.githubusercontent.com/666b926e651de6aafd5e9f492d97a558100c6698acf734e434ab763d8e89bc2b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f757365722d636f6e74656e742e73746f706c696768742e696f2f31393830382f31363037393837343636383234)

1. Click "Join Meeting" to join the meeting number specified in `src/app.js`.

   ![Zoom React Meeting SDK](https://camo.githubusercontent.com/516d9d0d9824e57b1e190cb85f19dc7658440ff63127c4776a7b3bd96181dbdd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f757365722d636f6e74656e742e73746f706c696768742e696f2f31393830382f31363037393837343739393637)

## Deployment

The React Sample App can be easily deployed to [GitHub Pages](#github-pages), or [another static web hosting service](#other-static-web-hosting), like an AWS S3 bucket.

### GitHub Pages

1. Create a repo on [GitHub](https://github.com).

1. Add the remote to your project:

   `$ git remote add origin GITHUB_URL/GITHUB_USERNAME/GITHUB_REPO_NAME.git`

1. Open the `package.json` file and on line 5 replace the homepage value `""` with your GitHub repo name with a slash in front like this: `"/GITHUB_REPO_NAME"`.

1. Build your project:

   `$ npm run build`

1. Rename the `build` folder to `docs`

1. Git add, commit, and push your project:

   `$ git add -A`

   `$ git commit -m "deploying to github"`

   `$ git push origin master`

1. On GitHub, in your repo, navigate to the "settings" page, scroll down to the "GitHub Pages" section, and choose the "master branch/docs folder" for the source.

1. Now your project will be deployed to https://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME.

### Other Static Web Hosting

1. Build your project:

   `$ npm run build`

1. Deploy the complied `/build` directory to a static web hosting service, like an AWS S3 bucket.

### Advanced Deployment

For more advanced instructions on deployment, [see the React Deployment docs](https://create-react-app.dev/docs/deployment/).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.
