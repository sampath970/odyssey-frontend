This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Background reading
Read Next.js React Essentials to understand Server and Client component rendering.

https://nextjs.org/docs/getting-started/react-essentials

## Requirements

Node version 18
Node is really easy to install & now include NPM. You should be able to run the following command after the installation procedure below.

node --version
v18.17.1

## Install
```bash
git clone git@ssh.dev.azure.com:v3/ORCSolution/odyssey-frontend/odyssey-frontend

cd odyssey-frontend

yarn install --freeze-lockfile

Then install ReactDevTools extension for Chrome browser.
```

Set your NODE_ENV to one of these: development, production, or test.
NODE_ENV=development

## Getting Running

First, build the Next.js project and then run the start script:

```bash
yarn dev    # if NODE_ENV==development

yarn build  # If NODE_ENV==production
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Debugging

In config/application.config.js, specify the localhost config:
    var nodeEnv = "localhost";
This will ensure that the id_token and access_token cookies are returned to localhost:3000 and that we use the local backend service.

NOTE: you will also need to ensure the local backend service is pointing to the same cognito_host value as the frontend localhost configuration. 

To debug client side code, use Chrome -> Right Click -> Inspect. 
Then at the top click on Sources.
Click on Filesystem
Click on + Add folder to workspace
Add the odyssey-frontend source folder
Browse to the file you want and click on it. You can now set a break point in the source view.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
