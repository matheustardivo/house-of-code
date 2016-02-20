create table books (
  id int(11) not null auto_increment primary key,
  title varchar(255) default null,
  description text,
  price decimal(10, 2) default null
)
