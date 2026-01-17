@echo off
REM Script de setup automatisé pour AuthInteractive - Windows

echo.
echo 🚀 Setup AuthInteractive - Systeme de Contact Email
echo ==================================================
echo.

REM Vérifier Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js n'est pas installe
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js detecte: %NODE_VERSION%
echo.

echo 📦 Installation des dependances...
call npm install

echo.
echo ✅ Installation terminee!
echo.

echo ⚙️  CONFIGURATION REQUISE:
echo ==================================================
echo.
echo 1. Ouvrez le fichier .env et configurez:
echo    - GMAIL_USER=votre-email@gmail.com
echo    - GMAIL_PASSWORD=mot-de-passe-application
echo.
echo 2. Pour obtenir le mot de passe app Gmail:
echo    - Allez sur: https://myaccount.google.com
echo    - Activer 2FA si ce n'est pas deja fait
echo    - Aller a: Securite ^> Mots de passe d'application
echo    - Selectionner 'Mail' et 'Windows/Linux'
echo    - Copier le mot de passe genere
echo.

echo 🚀 DEMARRAGE:
echo ==================================================
echo.
echo Terminal 1 - Serveur backend:
echo   npm run server:dev
echo.
echo Terminal 2 - Frontend (dans un autre terminal):
echo   npm run dev
echo.

echo ✨ Une fois demarre, testez sur: http://localhost:5173
echo.
pause
