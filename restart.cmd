@echo off
echo Stopping any running processes...
taskkill /F /IM node.exe >nul 2>&1

echo Cleaning cache and dependencies...
if exist .next rmdir /s /q .next
if exist .turbo rmdir /s /q .turbo
if exist node_modules rmdir /s /q node_modules

echo Reinstalling dependencies...
npm install

echo Starting development server...
npm run dev 