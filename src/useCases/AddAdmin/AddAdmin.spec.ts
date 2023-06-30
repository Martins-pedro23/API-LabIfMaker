import { test, describe, expect } from "vitest";
import { AddAdminUseCase } from "./AddAdminUseCase";
import { AdminRepository } from "../../repositories/implementations/AdminRepository";
import { MockAdminRepository } from "../../repositories/mocks/MockAdminRepository";

const repository = new AdminRepository();
const useCase = new AddAdminUseCase(repository);
const MockRepository = new MockAdminRepository();

describe("AddAdmin", () => {
  test("trying to add a new user without an email, should return an error", async () => {
    try {
      await useCase.execute({
        email: "",
        name: "John Doe",
        password: "123456",
      });

      throw new Error("Should not reach this point");
    } catch (error: any) {
      expect(error.message).toBe("Email is required");
    }
  });

  test("trying to add a new user without an name, should return an error", async () => {
    try {
      await useCase.execute({
        email: "jonhdoe@gmail.com",
        name: "",
        password: "123456",
      });

      throw new Error("Should not reach this point");
    } catch (error: any) {
      expect(error.message).toBe("Name is required");
    }
  });

  test("trying to add a new user without an name, should return an error", async () => {
    try {
      await useCase.execute({
        email: "jonhdoe@gmail.com",
        name: "jonhdoe",
        password: "",
      });

      throw new Error("Should not reach this point");
    } catch (error: any) {
      expect(error.message).toBe("Password is required");
    }
  });

  test("trying to add a new admin, should recive no error and a JSON", async () => {
    try {
      const admin = {
        email: "jonhdoe@gmail.com",
        name: "jonhdoe",
        password: "123456",
      };
      const result = await MockRepository.addAdmin(admin);
      expect(result).toBe(admin);
    } catch (error: any) {
      expect(!error.message).toBe(error);
    }
  });

  test("trying to add a new admin with an email that already exists, should return an error", async () => {
    try {
      const admin = {
        email: "jonhdoe@gmail.com",
        name: "johndoe",
        password: "123456",
      };
      const result = await MockRepository.addAdmin(admin);

      expect(!result).toBe(result);
    } catch (error: any) {
      expect(error.message).toBe("Admin already exists");
    }
  });
});
