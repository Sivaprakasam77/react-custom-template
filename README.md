[![vite](https://img.shields.io/badge/created%20with-vite-ddbb00.svg)](https://vitejs.dev/)
[![Ionic](https://img.shields.io/badge/Mobile%20app%20created%20with-ionic-000000.svg)](https://ionicframework.com/)
[![Firebase](https://img.shields.io/badge/created%20with-firebase-ddbb00.svg)](https://firebase.google.com/)

# React Custom Template

## Development Setup

- After cloning the repository, to install all the dependencies run the following command in your terminal / command prompt.

  ```bash
  npm install
  ```

- After installing all the dependencies, rename a `.env-example` file to `.env` for development and `.env.production` for production in the folder.

- After setting up the `.env`, to run the development server run the following command in your terminal / command prompt.

  ```bash
  npm run dev
  ```

- Run the following command in your terminal / command prompt for build web app.

  ```bash
  # production mode
  npm run build:prod

  # development mode
  npm run build:dev
  ```

- Setup IP address as `SERVER_IP` in `/etc/hosts` (or) `C:\Windows\System32\Drivers\etc\hosts` and run the following command in your terminal / command prompt for deploy

  ```bash
  # deploy through scp
  npm run deploy:scp

  # deploy through scp with .pem filer
  npm run deploy:scp:key

  # deploy through rsync
  npm run deploy:rsync

  # deploy through rsync with .pem file
  npm run deploy:rsync:key

  # deploy through firebase
  npm run deploy:firebase
  ```

- Mobile App build `Android & IOS` using ionic framework

  ```bash
  #init capacitor
  npm run app:init

  #build android and ios apps
  npm run ionic:build
  ```
