# Think Crew API 2

This is a Typescript RESTful API using [Node.js](https://nodejs.org), [Express](https://github.com/expressjs/express) and [MongoDB](https://www.mongodb.com/). All original code is the property of Think Crew, LLC. 

*readme last updated 2023-09-10*

---

## Install

This API was written using Node.js v18.12.1. 

1. Clone repo with `git clone git@github.com:thinkcrew/thinkcrew-api2.git`
2. Run `npm install` to install all node-modules
3. Create a local `/.env` file in the root folder. This file name is already gitIgnored. File should contain:
```
PORT: 3000
NODE_ENV: development
URL: https://thinkcrew.com
ORMONGO_CONNECT: mongodb://127.0.0.1:27017/thinkcrew2 (YOUR DB MAY BE AT A DIFFERENT ADDRESS, USE 127.0.0.1 INSTEAD OF LOCALHOST)
ACCESS_TOKEN_SECRET: (CONTACT ADMIN FOR KEY, IF NECESSARY)
REFRESH_TOKEN_SECRET: (CONTACT ADMIN FOR KEY, IF NECESSARY)
IPAPI_KEY: (CONTACT ADMIN FOR KEY, IF NECESSARY)
STRIPE_SECRET_KEY: (CONTACT ADMIN FOR KEY, IF NECESSARY)
MAILCHIMP_API_KEY: (CONTACT ADMIN FOR KEY, IF NECESSARY)
MAILCHIMP_LISTID: ed2800cc2b
EMAIL_HOST: sandbox.smtp.mailtrap.io
EMAIL_USER: 70a56abf2fbead
EMAIL_PASS: c1c8b3f711f04b
```
4. Start with `npm run dev` for local development

## Git Branches

 - `main` - this is the production version of the api, currently v2.0.0

For working branches, please create separate unique branches from `main` that can be merged via pull requests.

