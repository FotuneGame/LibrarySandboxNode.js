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