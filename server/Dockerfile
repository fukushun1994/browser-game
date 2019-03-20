FROM php:7.2-apache

RUN apt-get update && docker-php-ext-install mysqli mbstring pdo_mysql
RUN apt-get install -y git
RUN a2enmod rewrite
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer