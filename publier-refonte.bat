@echo off
chcp 65001 >nul
title Publication du site AuthInteractive
rem ================================================================
rem  Publie le site AuthInteractive.
rem  Ce script vit dans le dossier du projet et n'utilise QUE ce
rem  dossier : tout ce qui est dans "Vite Project" est envoye tel quel.
rem ================================================================
cd /d "%~dp0" || goto :err

if not exist "package.json" (
  echo ARRET : ce script doit rester dans le dossier "Vite Project".
  goto :err
)

echo.
echo === 1/5  Recuperation de la derniere version GitHub ===
git fetch origin || goto :err
git merge-base --is-ancestor HEAD origin/main || goto :diverged
git reset -q origin/main || goto :err

echo === 2/5  Enregistrement des modifications du dossier ===
git add -A || goto :err
git status --short
git commit -q -m "Mise a jour du site (%date% %time:~0,5%)" || echo (rien de nouveau a enregistrer)

echo === 3/5  Envoi du code sur GitHub ===
git push origin main || goto :err

echo === 4/5  Installation des dependances ===
call npm install --no-audit --no-fund || goto :err

echo === 5/5  Construction et mise en ligne du site ===
call npm run deploy || goto :err

echo.
echo ============================================================
echo  Site publie ! https://authinteractive.com
echo  Comptez 1 a 5 minutes, puis Ctrl+F5 dans le navigateur
echo  (ou une fenetre de navigation privee) pour voir la nouvelle
echo  version sans le cache.
echo ============================================================
pause
exit /b 0

:diverged
echo.
echo ARRET : votre copie locale contient des commits qui ne sont pas sur GitHub.
echo Rien n'a ete modifie. Envoyez ce message a Claude.
pause
exit /b 1

:err
echo.
echo ERREUR pendant la publication. Copiez les lignes ci-dessus et envoyez-les a Claude.
pause
exit /b 1
