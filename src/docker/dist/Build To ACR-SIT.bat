@echo off
set AppServiceName=longchamp-2026cny-website-sit
set /P UserInput="longchamp-2026cny-website-sit"
if not "%AppServiceName%" == "%UserInput%" ( 
	echo  [41;97m App Service 名稱並非 %AppServiceName% ，請確認設定。 [0m  
	pause
	exit
	)

echo Build Docker Image  [43;97m%AppServiceName%[0m
docker build -t sugarfun.azurecr.io/%AppServiceName%:latest .

echo Push to sugarfun.azurecr.io/%AppServiceName%
docker push sugarfun.azurecr.io/%AppServiceName%:latest

echo 操作完成，請手動重啟Azure App Service  [43;97m%AppServiceName%[0m。
pause
