@echo off
echo Building and deploying to gh-pages...

REM Save current branch
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set CURRENT_BRANCH=%%i

REM Build the project using vite
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    exit /b 1
)

REM Create/checkout gh-pages branch
git checkout --orphan gh-pages-temp

REM Remove all files except dist and .git
for /d %%i in (*) do (
    if not "%%i"=="dist" if not "%%i"==".git" rd /s /q "%%i"
)
for %%i in (*) do (
    if not "%%i"=="deploy-manual.bat" del "%%i"
)

REM Move dist contents to root
xcopy /E /Y dist\* .
rd /s /q dist

REM Add .nojekyll to prevent Jekyll processing
echo. > .nojekyll

REM Commit and push
git add -A
git commit -m "Deploy v0.2.0 to gh-pages"

REM Delete old gh-pages and rename temp
git branch -D gh-pages 2>nul
git branch -m gh-pages

REM Push to remote
git push -f origin gh-pages

REM Return to original branch
git checkout %CURRENT_BRANCH%

echo.
echo Deployment complete!
echo Your site should be live at: https://dyjagger.github.io/gametest-v2/
echo.
pause
