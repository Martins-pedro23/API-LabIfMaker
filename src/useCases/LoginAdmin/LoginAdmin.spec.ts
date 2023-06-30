import { test, describe, expect } from "vitest";
import { LoginAdminUseCase } from "./LoginAdminUseCase";
import { AdminRepository } from "../../repositories/implementations/AdminRepository";

const repository = new AdminRepository();
const useCase = new LoginAdminUseCase(repository);
const MockRepository = new AdminRepository();

MockRepository.addAdmin({
  email: "jonhdoe@gmail.com",
  name: "jonhdoe",
  password: "123456",
});

describe("LoginAdmin", () => {
  test("trying to login without an email, should return an error", async () => {
    try {
      await useCase.execute({
        email: "",
        password: "123456",
      });

      throw new Error("Should not reach this point");
    } catch (error: any) {
      expect(error.message).toBe("Email is required");
    }
  });

  test("trying to login without an password, should return an error", async () => {
    try {
      await useCase.execute({
        email: "jonhdoe@gmail.com",
        password: "",
      });

      throw new Error("Should not reach this point");
    } catch (error: any) {
      expect(error.message).toBe("Password is required");
    }
  });

  test("trying to login with an invalid email, should return an error", async () => {
    try {
      await MockRepository.loginAdmin({
        email: "mariedoe@gmail.com",
        password: "123456",
      });

      throw new Error("Should not reach this point");
    } catch (error: any) {
      expect(error.message).toBe("Admin not found");
    }
  });

  test("trying to login with an invalid password, should return an error", async () => {
    try {
      await MockRepository.loginAdmin({
        email: "jonhdoe@gmail.com",
        password: "1234567",
      });

      throw new Error("Should not reach this point");
    } catch (error: any) {
      expect(error.message).toBe("Invalid password");
    }
  });
});
