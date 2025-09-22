@echo off
echo Starting deployment process...

echo Clearing dist folder...
if exist dist rmdir /s /q dist

echo Installing dependencies...
npm install

echo Building project...
npm run build

echo Checking build result...
if exist dist\index.html (
    echo Build successful! Index.html exists.
    echo Checking assets...
    if exist dist\assets\index.js (
        echo Assets exist. Build is ready.
    ) else (
        echo ERROR: Assets not found!
        exit /b 1
    )
) else (
    echo ERROR: Build failed! Index.html not found.
    exit /b 1
)

echo Adding files to git...
git add .

echo Committing changes...
git commit -m "Deploy: Fix build and update website"

echo Pushing to GitHub...
git push origin feat/init-project-react

echo Deployment process completed!
pause
