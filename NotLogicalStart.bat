Taskkill /IM mysqld.exe /F
start /d "C:\Program Files\MySQL\MySQL Server 8.0\bin\" mysqld.exe --console
start /d "." ng serve
start /d ".\server" npm start