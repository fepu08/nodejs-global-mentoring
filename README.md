# 3 Layer Architecture

The idea is to use the **principle of separation of concerns** to move the business logic away from the node.js API Routes

[3 Layer Architecture](docs/3-layer.png)

[3 Layer Architecture in this project](docs/3-layer-in-project.png)

[Read more](https://softwareontheroad.com/ideal-nodejs-project-structure/)

# ORM

## What is it?

Mapping between Objects & Relational Database

## Why ORM?

- Leverages existing knowledge and skills related to OOP
- Level of abstraction
- Saves programmer time

## CRUD

- Create
- Read
- Update
- Delete

## Advantages of ORM

- ORM frees the programmer from dealing with simple repetitive database queries
- Automatically mapping the database to business objects lets programmers focus more on business problems and less with data storage
- ORM can provide a caching layer above the database
- Lazy loading

## Disadvantages of ORM

- ORM adds a small layer of application code, increasing processing overhead and amount of moving parts
- Lazy loading
- an ORM system's design might dictate certain database decisions

## Using an ORM in an MVC framework

[ORM in MVC](/docs/orm-in-mvc.png)

- The ORM is your data abstraction layer
- The Model contains your business logic
- What NOT to do:
  - have the business logic in the controller and use the ORM as your model
- Some ORM's allow you to merge the functionality of the Model and the ORM

# DAO and ORM

A **DAO**, or **Data Access Object**, is a _universal interface to a collection of objects_.
DAO _provides some specific data operations **without** exposing details of the database._

Go and run a query on database using some database management tool - something like `"select * from users limit 1"`
That just gives you a set of results in some admin window, which aren't much use to your app.

You want to be able to execute SQL from your app, and get data back in a form that it can work with. You need to **Access** your **Data** _through_ some kind of **JS Object** - you need a **Data Access Object**, or **DAO**.

You could run the query above with something like this

```js
result = db.query('SELECT * FROM data.person;
```

The result variable won't know or care about your **User** model

If you wanted to update the `first_name` to **Bob** you'd have to write your own SQL again, and get Nodejs to execute it for you

The **ORM** is like a layer on top of the **DAO**.
You can have a DAO without an ORM, but you can't have an ORM without a DAO.
The **ORM**, or **Object Relational Mapper** will _Map concepts / records in your Relational database with Objects in your programming language_.

Read more on:

1. [Stack Overflow](https://stackoverflow.com/questions/41495110/dao-vs-orm-concept-explained-in-the-context-of-sequelize-js)
2. [Stack Overflow - DAO vs ORM](https://stackoverflow.com/questions/4037251/dao-vs-ormhibernate-pattern)

# Docker

- Bind-mount package.json. This allows adding packages in realtime without rebuilding images. e.g.
  - `docker-compose exec backend npm install --save <package name>` (dosn't work on all systems)
  - `docker-compose exec backend bash` & `npm install --save <package name>`
