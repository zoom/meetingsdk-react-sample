# Zoom Meeting SDK Sample React

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

---

**NOTE:** This Sample App has been updated to use [SDK App](https://marketplace.zoom.us/docs/guides/build/sdk-app) type credentials instead of [JWT App](https://marketplace.zoom.us/docs/guides/build/jwt-app) type credentials.

---

This repo is a [React](https://reactjs.org/) app generated via [Create React App](https://github.com/facebook/create-react-app) that uses the [Zoom Meeting SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/web) to start and join Zoom meetings and webinars.

![Zoom Meeting SDK Client View](https://marketplace.zoom.us/docs/static/msdk-web-client-view-6276487add553e9849f39a7cec9ac7c7.gif)

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

   **NEW:** To use the [Component View](https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view), replace `App.js` with `App-New.js`. (The `leaveUrl` is not needed). Also, uncomment the Component View CSS tags and comment out the Client View CSS in `public/index.html`.

   | Variable                   | Description |
   | -----------------------|-------------|
   | signatureEndpoint          | Required, the endpoint url that returns a signature. [Get a signature endpoint here.](https://github.com/zoom/meetingsdk-sample-signature-node.js) |
   | sdkKey                   | Required, your Zoom SDK App Key. [You can get yours here](https://marketplace.zoom.us/develop/create). |
   | meetingNumber                   | Required, the Zoom Meeting or webinar number. |
   | role                   | Required, `0` to specify participant, `1` to specify host. |
   | leaveUrl                   | Required, the url the user is taken to once the meeting is over. |
   | userName                   | Required, a name for the user joining / starting the meeting / webinar. |
   | userEmail                   | Required for Webinar, optional for Meeting, required for meeting and webinar if [registration is required]([registration](https://support.zoom.us/hc/en-us/articles/360054446052-Managing-meeting-and-webinar-registration)). The email of the user starting or joining the meeting / webinar. |
   | passWord                   | Optional, meeting password. Leave as empty string if the meeting does not require a password. |
   | registrantToken            | Required if your [meeting](https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered) or [webinar](https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars) requires [registration](https://support.zoom.us/hc/en-us/articles/360054446052-Managing-meeting-and-webinar-registration). |

   Example:

   ```js
   signatureEndpoint = 'http://localhost:4000'
   sdkKey = 'abc123'
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

1. Navigate to http://localhost:3000 and click "Join Meeting".

   ### Client View

   ![Zoom Meeting SDK Client View](https://marketplace.zoom.us/docs/static/msdk-web-client-view-6276487add553e9849f39a7cec9ac7c7.gif)

   ### Component View

   ![Zoom Meeting SDK Component View](https://marketplace.zoom.us/docs/static/msdk-web-component-view-220cc5d1221312f8363cdb58405c0c23.gif)

   Learn more about [Gallery View requirements](https://marketplace.zoom.us/docs/sdk/overview/improve-performance) and [see more product screenshots](https://marketplace.zoom.us/docs/sdk/overview/improve-performance#sharedarraybuffer-ui-differences).

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
