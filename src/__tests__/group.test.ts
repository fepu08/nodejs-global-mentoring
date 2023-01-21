import { GroupService } from '../group/group-service';
import GroupController from '../group/group-controller';
import { Response, Request, NextFunction } from 'express';
import httpMocks from 'node-mocks-http';

const groupData = [
  {
    name: 'ADMIN',
    permissions: ['READ', 'WRITE'],
  },
  {
    name: 'USER',
    permissions: ['READ'],
  },
];

describe('GroupController', () => {
  let mockNext: jest.Mocked<NextFunction>;
  let mockRequest: httpMocks.MockRequest<Request<any>>;
  let mockResponse: httpMocks.MockResponse<Response<any, Record<string, any>>>;
  let spy;

  beforeEach(() => {
    mockNext = jest.fn();
    mockResponse = httpMocks.createResponse();
    jest.clearAllMocks();
  });

  describe('GET /groups/id', () => {
    const id = 1;

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        params: {
          id,
        },
      });
      spy = jest.spyOn(GroupService, 'getGroupById');
      jest.clearAllMocks();
    });

    it('should return status 200 with info in the body', async () => {
      spy.mockResolvedValue(groupData[0] as any);
      await GroupController.getGroupById(mockRequest, mockResponse, mockNext);

      expect(GroupService.getGroupById).toBeCalledWith(id);
      expect(mockResponse.statusCode).toEqual(200);
      expect(mockResponse._getJSONData()).toEqual(groupData[0]);
    });

    it('should return status 404 with error in the body', async () => {
      // @ts-ignore
      spy.mockReturnValue(null);
      await GroupController.getGroupById(mockRequest, mockResponse, mockNext);

      expect(GroupService.getGroupById).toBeCalledWith(id);
      expect(mockResponse.statusCode).toEqual(404);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'Group is not found',
      });
    });
  });
  describe('POST /groups', () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        body: {
          name: groupData[0].name,
          permissions: groupData[0].permissions,
        },
      });
      spy = jest.spyOn(GroupService, 'addGroup');
      jest.clearAllMocks();
    });

    it('should return status 201 with info in the body', async () => {
      spy.mockResolvedValue([groupData[0], true] as any);
      await GroupController.addGroup(mockRequest, mockResponse, mockNext);

      expect(GroupService.addGroup).toBeCalledWith(groupData[0]);
      expect(mockResponse.statusCode).toEqual(201);
      expect(mockResponse._getJSONData()).toEqual(groupData[0]);
    });

    it('should return status 404 and an error in the body', async () => {
      // @ts-ignore
      spy.mockReturnValue([null, false]);
      await GroupController.addGroup(mockRequest, mockResponse, mockNext);

      expect(GroupService.addGroup).toBeCalledWith(groupData[0]);
      expect(mockResponse.statusCode).toEqual(404);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'Group already exist',
      });
    });
  });
  describe('get all groups', () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({});
      spy = jest.spyOn(GroupService, 'getAllGroups');
      jest.clearAllMocks();
    });

    it('should respond with array of all groups', async () => {
      spy.mockResolvedValue(groupData as any);
      await GroupController.getAllGroups(mockRequest, mockResponse, mockNext);

      expect(GroupService.getAllGroups).toBeCalled();
      expect(mockResponse.statusCode).toEqual(200);
      expect(mockResponse._getJSONData()).toEqual(groupData);
    });
  });

  describe('PUT /groups/{id}', () => {
    const id = 1;

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        body: {
          name: groupData[0].name,
          permissions: groupData[0].permissions,
        },
        params: { id },
      });
      spy = jest.spyOn(GroupService, 'updateGroup');
      jest.clearAllMocks();
    });

    it('should return status 200 with info in the body', async () => {
      spy.mockResolvedValue(groupData[0] as any);
      await GroupController.updateGroup(mockRequest, mockResponse, mockNext);

      expect(GroupService.updateGroup).toBeCalledWith(id, groupData[0]);
      expect(mockResponse.statusCode).toEqual(200);
      expect(mockResponse._getJSONData()).toEqual(groupData[0]);
    });

    it('should return status 404 with error in the body', async () => {
      // @ts-ignore
      spy.mockReturnValue(null);
      await GroupController.updateGroup(mockRequest, mockResponse, mockNext);

      expect(GroupService.updateGroup).toBeCalledWith(id, groupData[0]);
      expect(mockResponse.statusCode).toEqual(404);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'Group not found',
      });
    });
  });

  describe('DELETE /groups/{id}', () => {
    const id = 1;

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        params: { id },
      });
      spy = jest.spyOn(GroupService, 'deleteGroup');
      jest.clearAllMocks();
    });

    it('should return status 200 with info in the body', async () => {
      spy.mockResolvedValue(1);
      await GroupController.deleteGroup(mockRequest, mockResponse, mockNext);

      expect(GroupService.deleteGroup).toBeCalledWith(id);
      expect(mockResponse.statusCode).toEqual(200);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'The group was deleted',
      });
    });

    it('should return status 404 with error in the body', async () => {
      // @ts-ignore
      spy.mockReturnValue(0);
      await GroupController.deleteGroup(mockRequest, mockResponse, mockNext);

      expect(GroupService.deleteGroup).toBeCalledWith(id);
      expect(mockResponse.statusCode).toEqual(404);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'Group not found',
      });
    });
  });

  describe('POST /groups/add', () => {
    const groupId = 1;
    const userIds = [1, 2];

    beforeEach(() => {
      mockRequest = httpMocks.createRequest({
        body: {
          groupId,
          userIds,
        },
      });
      spy = jest.spyOn(GroupService, 'addUsersToGroup');
      jest.clearAllMocks();
    });

    it('should return status 200 with info in the body', async () => {
      spy.mockResolvedValue(userIds as any);
      await GroupController.addUsersToGroup(mockRequest, mockResponse);

      expect(GroupService.addUsersToGroup).toBeCalledWith(groupId, userIds);
      expect(mockResponse.statusCode).toEqual(200);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'User(s) added to group',
      });
    });

    it('should return status 404 with error in the body', async () => {
      // @ts-ignore
      spy.mockRejectedValue(0);
      await GroupController.addUsersToGroup(mockRequest, mockResponse);

      expect(GroupService.addUsersToGroup).toBeCalledWith(groupId, userIds);
      expect(mockResponse.statusCode).toEqual(404);
      expect(mockResponse._getJSONData()).toEqual({
        message: 'Users not added to group',
      });
    });
  });
});
