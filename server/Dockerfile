FROM php:7.2-apache

RUN apt-get update && docker-php-ext-install mysqli mbstring pdo_mysql
RUN apt-get install -y git
ADD ./config/000-default.conf /etc/apache2/sites-available
RUN rm /etc/apache2/sites-enabled/000-default.conf
RUN ln -s /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-enabled/000-default.conf
ADD ./config/default-ssl.conf /etc/apache2/default-ssl.conf
RUN a2enmod rewrite
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer