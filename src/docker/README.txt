//https://habr.com/ru/companies/ruvds/articles/440656/

Настройка Dockerfile и создания контейнера.

1)Создадим пустой Dockerfile (просто Dockerfile без расширения) в корне проекта

2)Пример заполнения файла в Dockerfile в этой директории

3) Создания файла .dockerignore в корне проекта

4) Для работы с томами:

    1)Создаем том:
        docker volume create volume-name

    2)Список томов:
        docker volume ls

    3)Посмотреть том:
        docker volume inspect volume-name

    4)Удалить том:
        docker volume rm volume-name

    5)Удалить все неиспользуемые тома:
        docker volume prune

5)Для создания образа контейнера (не забудь запустить dockerDesktop):
    шаблон:
        docker build --build-arg <build arguments> -t <user-name>/<image-name>:<tag-name> /path/to/Dockerfile

    как пример:
        docker build --build-arg APP_DIR=. --build-arg NODE_ENV=production -t titov/docker-node-js-app:v1 .

6)Проверка наличия образа в докере:
    docker images

7)Запуск образа:
    шаблон:
        docker run -v <volume-name>:/<path> -p <External-port:exposed-port> -d --name <name of the container> <user-name>/<image-name>:<tag-name>
    как пример (внешний порт 8000):
        docker run -v volume-name:/data -p 8000:3003 -d --name docker-node-js-app titov/docker-node-js-app:v1

8)Инфа на счет рабочих контейнеров:
    docker ps
