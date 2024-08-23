FROM node:latest

# Метаданные
LABEL version="1.0" other="value3"

# Папка приложения
ARG APP_DIR=app 
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Установка зависимостей
COPY package*.json ./
RUN npm install
# Для использования в продакшне
# RUN npm install --production

# Копирование файлов проекта
COPY . .

#Настройка для вмонтирования ссылки на папку из тома
#VOLUME [ "/volume-name:/data" ]

EXPOSE 3003

# Пермеменные окружения
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV}

# Запуск проекта
CMD ["npm", "run","docker"]