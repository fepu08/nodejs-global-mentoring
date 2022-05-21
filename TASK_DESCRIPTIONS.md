# TASK 2

## TASK 2.1

Write a simple REST service withCRUD operations for User entity.

- To create REST service,use ExpressJS (https://expressjs.com/).The User should have the following properties(you can use UUIDas a user identifier (id)):
  ```ts
  type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
  };
  ```
- Service should have the following CRUD operations for User:
  - get user by id;
  - create and update user;
  - get auto-suggest list from `limit` users, sorted by login property and filtered by `loginSubstring` in the login property:
    `getAutoSuggestUsers(loginSubstring, limit)`
  - remove user (soft delete–user gets marked with isDeletedflag, but not removed from the collection).
- Store user’scollection in the service memory (while the service is running).

## TASK 2.2

Add server-side validation for create/update operations of Userentity:

- all fields are required;
- login validationis required;
- password must contain letters and numbers;
- user’s age must be between 4 and 130.

In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message.For requests validation use special packages like joi
