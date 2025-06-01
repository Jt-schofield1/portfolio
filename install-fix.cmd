@echo off
echo Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1

echo Cleaning everything...
if exist .next rmdir /s /q .next
if exist .turbo rmdir /s /q .turbo
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo Installing dependencies...
npm install

echo Verifying Tailwind installation...
npm list tailwindcss
npm list autoprefixer
npm list postcss

echo Setup complete! Starting server...
npm run dev 