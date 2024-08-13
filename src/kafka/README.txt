//https://hostman.com/tutorials/install-apache-kafka-on-ubuntu-22-04/

Установка и настройка kafka на ubuntu 

1)Cоздать выделенного пользователя, чтобы гарантировать, что операции Kafka не мешают другим функциям системы.

    sudo adduser kafka

2)Далее вам нужно добавить kafka пользователя в sudo группу, чтобы иметь необходимые привилегии для установки Kafka.

    sudo adduser kafka sudo

3)Затем войдите в kafka учетную запись (пароль 091234):

    su -l kafka

4)Установка Java Development Kit

    sudo apt update
    sudo apt install openjdk-11-jdk

5)Загрузка Kafka & nbsp

    a)Начните с создания папки с именем downloads для хранения архива:

        mkdir ~/downloads
        cd ~/downloads
        wget https://archive.apache.org/dist/kafka/3.8.0/kafka_2.12-3.8.0.tgz


    b)Затем перейдите в ~ и распакуйте загруженный вами архив:                       <<<================================== на этом этапе

        cd ~
        tar -xvzf ~/downloads/kafka_2.12-3.8.0.tgz                         

    c)Давайте переименуем каталог kafka_2.12-3.8.0 в kafka.

        mv kafka_2.12-3.8.0/ kafka/

6)Настройка сервера Kafka

    a)Для этого вам необходимо отредактировать server.properties файл: ctrl + x => y => enter

        nano ~/kafka/config/server.properties

        (Найдите log.dirs и установите значение в /home/kafka/kafka-logs.Вы также можете изменить значение num.partition на 3,
         чтобы при создании раздела вы не указывали количество разделов, по умолчанию оно будет равно 3.)

    б)Открытие портов:

        nano ~/kafka/config/server.properties

        Изменяем #listeners = PLAINTEXT://your.host.name:9092 на listeners = PLAINTEXT://0.0.0.0:9092

        Если на одной машине:

        Изменяем #advertised.listeners=PLAINTEXT://your.host.name:9092 на advertised.listeners=PLAINTEXT://localhost:9092 

7)Запуск сервера Kafka

    a)Чтобы запустить сервер Kafka, вам нужно сначала запустить Zookeeper, а затем запустить Kafka. 
    (Apache ZooKeeper управляет координацией и конфигурацией распределенных систем, таких как Kafka. )

    (Чтобы запустить Zookeeper и Kafka, есть 2 команды:

        ~/bin/zookeeper-server-start.sh  ~/kafka/config/zookeeper.properties
        ~/kafka/bin/kafka-server-start.sh  ~/kafka/config/server.properties

    )

    Но, чтобы быть более эффективным, вам нужно создать systemd модульные файлы и вместо этого использовать systemctl.

    Файл модуля для Zookeeper:

        sudo nano /etc/systemd/system/zookeeper.service

        , где пишем:

            [Unit]
            Description=Apache Zookeeper Service
            Requires=network.target                 
            After=network.target                 

            [Service]
            Type=simple
            User=kafka
            ExecStart=/home/kafka/kafka/bin/zookeeper-server-start.sh /home/kafka/kafka/config/zookeeper.properties        
            ExecStop=/home/kafka/kafka/bin/zookeeper-server-stop.sh
            Restart=on-abnormal

            [Install]
            WantedBy=multi-user.target

    Модульный файл для Kafka:

        sudo nano /etc/systemd/system/kafka.service

        , где пишем:

            [Unit]
            Description=Apache Kafka Service that requires zookeeper service
            Requires=zookeeper.service
            After=zookeeper.service

            [Service]
            Type=simple
            User=kafka
            ExecStart= /home/kafka/kafka/bin/kafka-server-start.sh /home/kafka/kafka/config/server.properties                            
            ExecStop=/home/kafka/kafka/bin/kafka-server-stop.sh
            Restart=on-abnormal

            [Install]
            WantedBy=multi-user.target

    b)Затем вы можете запустить сервер Kafka:

        sudo systemctl start kafka

        (перезапуск: sudo systemctl restart kafka )

    c)Проверьте состояние:

        sudo systemctl status kafka