### NPM vs NPX

npm and npx are both command-line tools that come with Node.js, but they serve different purposes:

npm (Node Package Manager):
```
Used to manage packages (libraries or modules) for Node.js.
Common commands include:
npm install <package>: Installs a package.
npm init: Initializes a new Node.js project.
npm run <script>: Runs a script defined in the package.json file.
Example:
```
```cmd
npm install typescript --save-dev
```
npx (Node Package Execute):

```
Used to execute binaries from Node modules.
Allows you to run commands from packages without installing them globally.
Useful for running one-off commands or scripts.
Example:
In summary, npm is primarily for managing packages, while npx is for executing binaries from those packages.
```
```cmd
npx tsc --init
```
