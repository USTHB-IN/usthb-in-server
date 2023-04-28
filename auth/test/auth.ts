import request from "supertest";
import { app } from "../src/server";

describe("Auth route", () => {
  let authToken = "";
  beforeAll(async () => {
    // Login user and get JWT token
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "johndd23121212332foe@examle.com",
        password: "pas12swor2332d123",
      });
    authToken = res.body.token;
  });

  describe("POST /auth/change-password", () => {
    test("should change the user password", async () => {
      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          currentPassword: "pas12swor2332d123",
          newPassword: "newpassword",
        })
        .expect(200);

      expect(res.body.message).toBe("Password changed successfully");

      // Login user with new password and get JWT token
      const res2 = await request(app)
        .post("/api/auth/login")
        .send({
          email: "johndd23121212332foe@examle.com",
          password: "newpassword",
        });
      expect(res2.body).toHaveProperty("token");
    });

    test("should return 401 if current password is incorrect", async () => {
      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          currentPassword: "wrongpassword",
          newPassword: "newpassword",
        })
        .expect(401);

      expect(res.body.error).toBe("Incorrect current password");
    });
  });
});
