import { UserService } from '../services/user-service';
import UserController from '../controllers/user-controller';
import { Response, Request, NextFunction } from 'express';
import httpMocks from 'node-mocks-http';

const userData = {
  login: 'JohnDoe12',
  password: 'pasw123',
  age: 20,
};

describe('UserController', () => {
  let mockNext: jest.Mocked<NextFunction>;
  let mockRequest: httpMocks.MockRequest<Request<any>>;
  let mockResponse: httpMocks.MockResponse<Response<any, Record<string, any>>>;

  beforeEach(() => {
    mockNext = jest.fn();
    mockResponse = httpMocks.createResponse();
    jest.clearAllMocks();
  });

  describe('GET /users/id', () => {
    const id = 1;
    let spy;

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        params: {
          id,
        },
      });
      spy = jest.spyOn(UserService, 'getUserById').mockReset();
      jest.clearAllMocks();
    });

    it('should return status 200 with info in the body', async () => {
      spy.mockResolvedValue(userData as any);
      await UserController.getUserById(mockRequest, mockResponse, mockNext);

      expect(UserService.getUserById).toBeCalledWith(id);
      expect(mockResponse.statusCode).toEqual(200);
      expect(mockResponse._getJSONData()).toEqual(userData);
    });

    it('should return status 404 with message in the body', async () => {
      // @ts-ignore
      spy.mockReturnValue(null);
      await UserController.getUserById(mockRequest, mockResponse, mockNext);

      expect(UserService.getUserById).toBeCalledWith(id);
      expect(mockResponse.statusCode).toEqual(404);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'User is not found',
      });
    });
  });

  describe('GET /users', () => {
    let spy;
    const mUserRecord = [
      {
        id: '1',
        login: 'test_user',
        password: 'test_password',
        age: 21,
      },
      {
        id: '2',
        login: 'test_user1',
        password: 'test_password1',
        age: 21,
      },
    ];
    const loginSubstring = 'test';
    const limit = 2;

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        query: {
          loginSubstring,
          limit,
        },
      });
      spy = jest.spyOn(UserService, 'getAllUsers').mockReset();
      jest.clearAllMocks();
    });

    it('should respond with array of users and status 200', async () => {
      spy.mockResolvedValue(mUserRecord as any);
      await UserController.getUsers(mockRequest, mockResponse, mockNext);

      expect(UserService.getAllUsers).toBeCalledWith(loginSubstring, limit);
      expect(mockResponse._getJSONData()).toEqual(mUserRecord);
      expect(mockResponse.statusCode).toEqual(200);
    });

    it('should respond with error status 400 and error message', async () => {
      spy.mockReturnValue({ message: 'Users not found' });
      await UserController.getUsers(mockRequest, mockResponse, mockNext);

      expect(mockResponse._getJSONData()).toEqual({
        message: 'Users not found',
      });
      expect(mockResponse.statusCode).toEqual(404);
    });
  });

  describe('POST /users', () => {
    let spy;
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        body: {
          login: userData.login,
          password: userData.password,
          age: userData.age,
        },
      });
      spy = jest.spyOn(UserService, 'addUser').mockReset();
      jest.clearAllMocks();
    });

    it('should return status 201 with info in the body', async () => {
      spy.mockResolvedValue([userData, true] as any);
      await UserController.createUser(mockRequest, mockResponse, mockNext);

      expect(UserService.addUser).toBeCalledWith(userData);
      expect(mockResponse.statusCode).toEqual(201);
      expect(mockResponse._getJSONData()).toEqual(userData);
    });

    it('should return status 409 and an error in the body', async () => {
      // @ts-ignore
      spy.mockReturnValue([null, false]);
      await UserController.createUser(mockRequest, mockResponse, mockNext);

      expect(UserService.addUser).toBeCalledWith(userData);
      expect(mockResponse.statusCode).toEqual(409);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'User already exist',
      });
    });
  });

  describe('PUT /users/{id}', () => {
    const id = 1;
    let spy;

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        body: {
          login: userData.login,
          password: userData.password,
          age: userData.age,
        },
        params: { id },
      });
      spy = jest.spyOn(UserService, 'updateUser').mockReset();
      jest.clearAllMocks();
    });

    it('should return status 200 with info in the body', async () => {
      spy.mockResolvedValue(userData as any);
      await UserController.updateUser(mockRequest, mockResponse, mockNext);

      expect(UserService.updateUser).toBeCalledWith(userData, id);
      expect(mockResponse.statusCode).toEqual(200);
      expect(mockResponse._getJSONData()).toEqual(userData);
    });

    it('should return status 404 with error in the body', async () => {
      // @ts-ignore
      spy.mockReturnValue(null);
      await UserController.updateUser(mockRequest, mockResponse, mockNext);

      expect(UserService.updateUser).toBeCalledWith(userData, id);
      expect(mockResponse.statusCode).toEqual(404);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'User not found',
      });
    });
  });

  describe('DELETE /users/{id}', () => {
    const id = 1;
    let spy;

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        params: { id },
      });
      spy = jest.spyOn(UserService, 'deleteUser').mockReset();
      jest.clearAllMocks();
    });

    it('should return status 200 with info in the body', async () => {
      spy.mockResolvedValue(1);
      await UserController.deleteUser(mockRequest, mockResponse, mockNext);

      expect(UserService.deleteUser).toBeCalledWith(id);
      expect(mockResponse.statusCode).toEqual(200);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'User deleted',
      });
    });

    it('should return status 404 with error in the body', async () => {
      // @ts-ignore
      spy.mockReturnValue(0);
      await UserController.deleteUser(mockRequest, mockResponse, mockNext);

      expect(UserService.deleteUser).toBeCalledWith(id);
      expect(mockResponse.statusCode).toEqual(404);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'User not found',
      });
    });
  });

  describe('POST /users/login', () => {
    let spy;
    const userLoginData = {
      login: userData.login,
      password: userData.password,
    };

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        body: {
          login: userData.login,
          password: userData.password,
        },
      });
      spy = jest.spyOn(UserService, 'getUserByLogin').mockReset();
      jest.clearAllMocks();
    });

    it('should return status 200', async () => {
      spy.mockResolvedValue([userLoginData, true] as any);
      await UserController.login(mockRequest, mockResponse, mockNext);

      expect(UserService.getUserByLogin).toBeCalledWith(
        userLoginData.login,
        userLoginData.password
      );
      expect(mockResponse.statusCode).toEqual(200);
    });
  });
});
