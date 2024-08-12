//https://habr.com/ru/articles/821363/

Для установки и настройик redis в ubuntu:

0)wsl

1)
sudo apt update -y
sudo apt upgrade -y

2)sudo apt-add-repository ppa:redislabs/redis

3)
sudo apt-get update -y
sudo apt-get upgrade -y

4)sudo apt-get install redis-server -y

5)sudo service redis-server restart

6)sudo service redis-server status


Дополнительные настройки для удалённого доступа

1)sudo nano /etc/redis/redis.conf

2)
    Измените следующие параметры:

    Замените bind 127.0.0.1 -::1 на bind 0.0.0.0

    Замените #requirepass foobared на requirepass your_password 

    Сохраните изменения и закройте файл, нажав CTRL + X, затем Y для подтверждения сохранения и ENTER.

3)sudo service redis-server restart
(если нет ошибок то ок)

4) Опционально добавление пользователя с паролем

   Замените (чтобы сохранять список пользователей в файле) #aclfile /path/to/users.acl на aclfile /path/to/users.acl

   ... Затем надо ковырятся в редисе чтобы его запустить

   Заходим в терминал управления redis: redis-cli -a пароль_пользователя_если_есть_по_умолчанию_его_нет

   Создаём пользователя: ACL SETUSER new_user on ~* +@all
   (new_user - имя, on - указывает на включение пользователя, ~* - разрешает доступ ко всем ключам, +@all - разрешает выполнение всех команд)

    //your_pass === 8e498bfcf8aa1fa28a764b8eeb5546f44c0c24dba0c6587b112ced55f688a4f6
   Добавляем зараенее хешированый пароль через RESETPASS #хеш: ACL SETUSER new_user on ~* +@all RESETPASS #8e498bfcf8aa1fa28a764b8eeb5546f44c0c24dba0c6587b112ced55f688a4f6


