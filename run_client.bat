@echo off
echo running vue client site
cd "vue-nodejs"
npm run build && npm run start --fix
pause