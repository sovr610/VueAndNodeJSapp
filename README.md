# VueAndNodeJSapp
An example of a basic setup of vue.js, vuex and nodejs with maybe npm addons with mocha and chai.

# Description
This app is a basic starting app with vue.js and node.js working with a MySql server to manage users in the database. This
is a great project for anyone to use to get started with vue!

# Dependencies

1. node.js and NPM
2. vue.js npm command: `npm install -g @vue/cli`
3. MySql database server 
4. visual code (optional) 


# Setup Database and layout
database: nodetest
table: users

columns:
1. user_id
2. lastName
3. firstName
4. age

# Run the website

## Windows
For windows it's easy, click on the run_all.bat, if not make sure to run the server first then the client batch files.

## macOS/Linux
Make sure you open the terminal and set your current directory to the root directory of this project. You will need two terminals, one for the node server and the other for running vue (command one and command two).
__Server command:__ `node "vue-nodejs\api\server.js"`

for the second command make sure your terminal is in the folder directory: `cd "vue-nodejs"`
__Client Commands:__ `npm run build` then `npm run serve --fix`


