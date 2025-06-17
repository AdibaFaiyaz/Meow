@echo off
set ANDROID_HOME=C:\Users\adiba\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin
cd /d "d:\vsc\AppDev\Meow"
npx expo start
