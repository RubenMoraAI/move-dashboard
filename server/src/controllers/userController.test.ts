 
   
    import { Request, Response } from "express";
    import { PrismaClient } from "@prisma/client";
    import { getUsers } from "./userController";
    
    jest.mock("@prisma/client", () => {
      const mPrismaClient = {
        users: {
          findMany: jest.fn(),
        },
      };
      return { PrismaClient: jest.fn(() => mPrismaClient) };
    });
    
    const prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>;
    
    describe("User Controller", () => {
      let req: Partial<Request>;
      let res: Partial<Response>;
    
      beforeEach(() => {
        req = {};
        res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
      });
    
      it("should get users successfully", async () => {
        const users = [{ id: 1, name: "John Doe" }];
        (prismaMock.users.findMany as jest.Mock).mockReturnValue(Promise.resolve(users));

    
        await getUsers(req as Request, res as Response);
    
        expect(prismaMock.users.findMany).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(users);
      });
    
      it("should handle errors when getting users", async () => {
        const error = new Error("Error retrieving users");
        (prismaMock.users.findMany as jest.Mock).mockRejectedValue(error);
    
        await getUsers(req as Request, res as Response);
    
        expect(prismaMock.users.findMany).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving users" });
      });
    });