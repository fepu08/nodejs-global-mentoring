# Sections

## [3 Layer Architecture](#3-layer-architecture)

### [Controller Layer](##controller-layer)

### [Service Layer](<##service-(domain)-layer>)

#### [Dependency Injection](###dependency-injection)

## [File Structure](#file-structure-example)

## [Backend Patterns](#backend-patterns)

### [Data Mapper Pattern](##data-mapper-pattern)

### [Repository Pattern](##repository-pattern)

## [Docker](#docker)

# 3 Layer Architecture

The idea is to use the **principle of separation of concerns** to move the business logic away from the node.js API Routes

[3 Layer Architecture](docs/3-layer.png)

[3 Layer Architecture in this project](docs/3-layer-in-project.png)

[Read more](https://softwareontheroad.com/ideal-nodejs-project-structure/)

## Controller Layer

- validator (middleware)
- create some kind of DTO e.g. `const userDTO = req.body`
- Call to service layer e.g. `const {user, company} = await UserService.Signup(userDTO)`
- return a response to client `return res.json({user, company});`

## Service (Domain) Layer

- Move your code away from the express.js router
- Don't pass the **req** or **res** object to the service layer
- Don't return anything related to the HTTP transport layer like a status code or headers from the service layer

### Dependency Injection

_Direct dependencies_ is an Anti-pattern.

```js
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';
class UserService {
  constructor() {}
  Signup() {
    // Calling UserModel, CompanyModel, etc
    //...
  }
}
```

Use **dependency injection** instead!

```js
class UserService {
  constructor(userModel, companyModel, salaryModel) {
    this.userModel = userModel;
    this.companyModel = companyModel;
    this.salaryModel = salaryModel;
  }
  getMyUser(userId) {
    // models available through 'this'
    const user = this.userModel.findById(userId);
    return user
  }
```

```js
const userServiceInstance = new UserService(
  userModel,
  companyModel,
  salaryModel
);
```

# File Structure Example

```
.
├── index.js    # App entry point
├── api         # Express route controllers for all the endpoints of the map
├── config      # Environment variables and configuration related stuff
├── loaders     # Split the startup process into modules
├── modules     # Database models
├── services    # All the business logic is here
├── subscribers # Event handlers for async task
└── types       # Type declaration files (d.ts) for typescript
```

# Backend Patterns

## Data Mapper Pattern

[Data Mapper Pattern](docs/data-mapper-pattern.png)

Objects' structure that operate in domain not the same with our database object, probably they have different fields, different properties, database structures don't contain features that includes in the domain objects (e.g. inheritance)

The data mapper pattern is an **architectural pattern**.
The interface of an object conforming to this pattern would include functions such as Create, Read, Update, and Delete, that operate on objects that represent domain entity types in a data store.

A Data Mapper is a **Data Access Layer** that _performs transfer of data between a persistent data store (often a relational database) and an in-memory data representation (the domain layer)._

The goal is to **keep the in-memory representation and the persistent data store independent of each other and the data mapper itself.**

This is useful when one needs to model and enforce strict business processes on the data in the domain layer that do not map neatly to the persistent data store.

The layer is composed of one or more _mappers_ (or **Data Access Objects** (DAO)), **performing the data transfer**. Mapper implementations vary in scope. Generic mappers will handle many different domain entity types, dedicated mappers will handle one or a few.
[See on Wikipedia](https://en.wikipedia.org/wiki/Data_mapper_pattern)

```js
export default class EntityDataMapper {
  toDomain(entity) {
    return entity;
  }

  toDalEntity(domain) {
    return domain;
  }
}
```

```js
import EntityDataMapper from './EntityDataMapper';
export default class UserDataMapper extends EntityDataMapper {
  toDomain(entity) {
    return {
      name: entity.firstName + ' ' + entity.lastName,
    };
  }

  toDalEntity(domain) {
    const userName = domain.name.split(' ');
    return {
      firstName: userName[0],
      lastName: userName[1],
    };
  }
}
```

## Repository Pattern

[Repository Pattern](./docs/repository-pattern.png)
Separate logic that retries data and maps it to the entity model. To avoid confusion with domain layer which handle model concerns.

It's a place where our database interaction logic encapsulated in and our business logic becomes a client in this case and just send any request to the repository for data and may pass any argument. Our repository knows how to handle any flows and how to get necessary data. In this case it asks for data source layer for data (it can be a database), and get it. After this, repository may try to use data mapper to ensure that data from database structured well, after this returns any data to the service layer. It's just intermediator but not so small like data mapper.

### Pros of usage repository

- it centralizes the data logic or web service access logic
- it provides a substitution for the unit tests
- it provides a flexible architecture that can be adapted as the overall design of the application evolves

```js
export default class UserRepository {
  constructor(userModel, userDataMapper) {
    this.model = userModel;
    this.mapper = userDataMapper;
  }

  async getAll() {
    const users = await this.model.getAll();
    return users.map((user) => this.mapper.toDomain(user));
  }

  async readOneById(id) {
    const user = await this.model.readOne(id);
    return this.mapper.toDomain(user);
  }
}
```

It helps us:

- ensure that the object it in good state,
- encapsulate database and models interaction,
- prevents global changes in our application

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
  - `docker-compose exec backend npm install --save <package name>` (doesn't work on all systems)
  - `docker-compose exec backend bash` & `npm install --save <package name>`

After installing the package, if your nodemon has not refreshed, try to change some source code to invoke nodemon to restart.

Moreover after `docker-compose down` you should use `npm i` and rebuild the image with `docker-compose up --build` next time.
