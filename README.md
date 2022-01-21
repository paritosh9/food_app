# Food app Client and Server

This is a very early prototype of the food app (until there is a brand name, the name "food app" should suffice).
The directories are quite self-explanatory. The code is completely written in JavaScript. The server uses Node and the client uses the *React Native* framework, for building mobile apps.

# Setup and run the server

These instructions are for a Linux machine. The process should be very similar for Windows / Mac.

1. Install Node from [here](https://nodejs.org/en/)
2. `tar -xvf <node_download_file>`
3. Move the extracted files to say /usr/local/bin/node
4. Add the bin/ directory to your path. Add this to your ~/.bashrc file:  
   `export PATH="/usr/local/bin/node/bin:$PATH"`
5. `cd server/`
6. `npm install`
7. `node src/app.js`
8. Visit the demo page at:  
   http://localhost:10000/demo.html  

The first 6 steps are needed only the first time.

# Important

This code, being a very early version is far from being production-ready. It needs supporting infrastructure for (among other things):  

1. Unit-testing (see [Jest](https://www.npmjs.com/package/jest))  
2. Linter (see [ESLint](https://www.npmjs.com/package/eslint))  
3. Prettifier (see [prettier](https://www.npmjs.com/package/prettier))  

There are a number of best-practises to pruductionize code that can be found in the relevant documentation for Node, Express and AWS Lambda.
