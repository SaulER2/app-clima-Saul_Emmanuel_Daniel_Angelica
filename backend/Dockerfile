# ---- Base ----
FROM php:8.4-fpm as base

RUN apt-get update && apt-get install -y \
    zip unzip curl libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

RUN pecl install redis \
    && docker-php-ext-enable redis

# ---- Development ----
FROM base AS development
WORKDIR /var/www/html
COPY . .
EXPOSE 9000
CMD ["php-fpm"]

# ---- Production ----
FROM base AS production
WORKDIR /var/www/html
COPY . .
EXPOSE 9000
CMD ["php-fpm"]