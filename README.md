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
