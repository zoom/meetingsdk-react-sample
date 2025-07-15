# Zoom Meeting SDK React sample

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/).


This repo is a [React](https://reactjs.org/) app generated via [Vite](https://vitejs.dev/) that uses the [Zoom Meeting SDK](https://developers.zoom.us/docs/meeting-sdk/web/) to start and join Zoom meetings and webinars.

![Zoom Meeting SDK Client View](/public/images/meetingsdk-web-client-view.gif)

## Installation

To get started, clone the repo:

`$ git clone https://github.com/zoom/meetingsdk-react-sample.git`

## Setup

1. Once cloned, navigate to the `meetingsdk-react-sample` directory:

   `$ cd meetingsdk-react-sample`

1. Then install the dependencies:

   `$ npm install`

1. Open the `meetingsdk-react-sample` directory in your code editor.

1. Open the `src/App.tsx` file, and enter values for the variables:

   **NEW:** To use the [Component View](https://developers.zoom.us/docs/meeting-sdk/web/component-view/), replace `App.tsx` with `App-New.tsx`. (The `leaveUrl` is not needed).

   | Variable                   | Description |
   | -----------------------|-------------|
   | authEndpoint          | Required, your Meeting SDK auth endpoint that securely generates a Meeting SDK JWT. [Get a Meeting SDK auth endpoint here.](https://github.com/zoom/meetingsdk-sample-signature-node.js) |
   | meetingNumber                   | Required, the Zoom Meeting or webinar number. |
   | passWord                   | Optional, meeting password. Leave as empty string if the meeting does not require a password. |
   | role                   | Required, `0` to specify participant, `1` to specify host. |
   | userName                   | Required, a name for the user joining / starting the meeting / webinar. |
   | userEmail                   | Required for Webinar, optional for Meeting, required for meeting and webinar if [registration is required](https://support.zoom.us/hc/en-us/articles/360054446052-Managing-meeting-and-webinar-registration). The email of the user starting or joining the meeting / webinar. |
   | registrantToken            | Required if your [meeting](https://developers.zoom.us/docs/meeting-sdk/web/client-view/meetings/#join-meeting-with-registration-required) or [webinar](https://developers.zoom.us/docs/meeting-sdk/web/client-view/webinars/#join-webinar-with-registration-required) requires [registration](https://support.zoom.us/hc/en-us/articles/360054446052-Managing-meeting-and-webinar-registration). |
   | zakToken            | Required to start meetings or webinars on external Zoom user's behalf, the [authorized Zoom user's ZAK token](https://developers.zoom.us/docs/meeting-sdk/auth/#start-meetings-and-webinars-with-a-zoom-users-zak-token). The ZAK can also be used to join as an [authenticated participant](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0063837). |
   | leaveUrl                   | Required for Client View, the url the user is taken to once the meeting is over. |

   Example:

   ```js
   var authEndpoint = 'http://localhost:4000'
   var meetingNumber = '123456789'
   var passWord = ''
   var role = 0
   var userName = 'React'
   var userEmail = ''
   var registrantToken = ''
   var zakToken = ''
   var leaveUrl = 'http://localhost:5173'
   ```

2. Save `App.tsx`.

3. Run the app:

   `$ npm run dev`

## Usage

1. Navigate to http://localhost:5173 and click "Join Meeting".

   ### Client View

   ![Zoom Meeting SDK Client View](/public/images/meetingsdk-web-client-view.gif)

   ### Component View

   ![Zoom Meeting SDK Component View](/public/images/meetingsdk-web-component-view.gif)

   Learn more about [Gallery View requirements](https://developers.zoom.us/docs/meeting-sdk/web/gallery-view/) and [see more product screenshots](https://developers.zoom.us/docs/meeting-sdk/web/gallery-view/#how-views-look-with-and-without-sharedarraybuffer).

## Deployment

The React Sample App can be easily deployed to [GitHub Pages](#github-pages), or [another static web hosting service](#other-static-web-hosting), like an AWS S3 bucket.

### GitHub Pages

1. Clone this repo and configure the `authEndpoint`.

1. Create a new repo on [GitHub](https://github.com).

1. Add the remote to your project:

   `$ git remote add myorigin GITHUB_URL/GITHUB_USERNAME/GITHUB_REPO_NAME.git`

1. Open the `vite.config.ts` file and add `base: "/GITHUB_REPO_NAME/"` in the `defineConfig` helper.

1. Build your project:

   `$ npm run build`

1. Rename the `build` folder to `docs`

1. Git add, commit, and push your project:

   `$ git add -A`

   `$ git commit -m "deploying to github"`

   `$ git push myorigin main`

1. On GitHub, in your repo, navigate to the "settings" page, scroll down to the "GitHub Pages" section, and choose the "main" branch and "/docs" folder for the source.

1. Now your project will be deployed to https://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME.

### Other Static Web Hosting

1. Build your project:

   `$ npm run build`

1. Deploy the complied `/build` directory to a static web hosting service, like an AWS S3 bucket.

### Advanced Deployment

For more advanced instructions on deployment, [see the Vite Deployment docs](https://vitejs.dev/guide/build.html#deployment).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.
