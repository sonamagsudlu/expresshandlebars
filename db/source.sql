drop database if exists burger_restaurant;

create database burger_restaurant;

use burger_restaurant;

create table burgers(
	id int not null auto_increment,
    name varchar(255),
    devoured boolean,
    primary key (id)
);