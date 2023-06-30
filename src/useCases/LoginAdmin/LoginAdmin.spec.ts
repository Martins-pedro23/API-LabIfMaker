import { test, describe, expect } from "vitest";
import { LoginAdminUseCase } from "./LoginAdminUseCase";
import { AdminRepository } from "../../repositories/implementations/AdminRepository";
import { MockAdminRepository } from "../../repositories/mocks/MockAdminRepository";

const repository = new AdminRepository();
const useCase = new LoginAdminUseCase(repository);
const MockRepository = new MockAdminRepository();

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
      expect("Email is required").toBe(error.message);
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
      expect("Password is required").toBe(error.message);
    }
  });

  test("trying to login with an invalid email, should return an error", async () => {
    try {
      const result = await MockRepository.findByEmail("jonhdoe@gmail.co");

      if (!result) throw new Error("Credentials invalid");

      throw new Error("Should not reach this point");
    } catch (err: any) {
      expect("Credentials invalid").toBe(err.message);
    }
  });

  /*  test("trying to login with an invalid password, should return an error", async () => {
    try {
      const alreadyExist = await MockRepository.findByEmail(
        "johndoe@gmail.com"
      );

      if (!alreadyExist) throw new Error("Credentials invalid");

      if (alreadyExist.password === "1234567")
        throw new Error("Credentials invalid");

      throw new Error("Should not reach this point");
    } catch (error: any) {
      expect("Credentials invalid").toBe(error.message);
    }
  });

  test("trying to login with an invalid password, should return an error", async () => {
    try {
      const alreadyExist = await MockRepository.findByEmail(
        "johndoe@gmail.com"
      );

      if (!alreadyExist) throw new Error("Credentials invalid");

      if (alreadyExist.password != "123456")
        throw new Error("Invalid password");

      expect(alreadyExist).toBe(alreadyExist);
    } catch (error: any) {
      expect(!error).toBe(error);
    }
  }); */
});
