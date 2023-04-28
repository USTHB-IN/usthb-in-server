import request from "supertest";
import { app } from "../src/server";
import Specialite from "../src/models/specialite.model";
import mongoose from "mongoose";

describe("Specialite routes", () => {
  let createdSpecialiteId: string;

  describe("POST /specialite", () => {
    it("should create a new specialite", async () => {
      const res = await request(app)
        .post("/specialite")
        .send({
          name: "Computer Science",
          abbreviation: "CS",
          filiereName: "Science",
        })
        .expect(201);

      createdSpecialiteId = res.body.id;
      expect(res.body).toMatchObject({
        name: "Computer Science",
        abbreviation: "CS",
        filiereName: "Science",
      });
    });
  });

  describe("GET /specialite", () => {
    it("should get all specialite", async () => {
      const res = await request(app).get("/specialite").expect(200);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: createdSpecialiteId,
            name: "Computer Science",
            abbreviation: "CS",
            filiereName: "Science",
          }),
        ])
      );
    });
  });

  describe("GET /specialite/:id", () => {
    it("should get a specialite by id", async () => {
      const res = await request(app)
        .get(`/specialite/${createdSpecialiteId}`)
        .expect(200);

      expect(res.body).toMatchObject({
        id: createdSpecialiteId,
        name: "Computer Science",
        abbreviation: "CS",
        filiereName: "Science",
      });
    });
  });

  describe("GET /specialite/name/:name", () => {
    it("should get a specialite by name", async () => {
      const res = await request(app)
        .get("/specialite/name/Computer Science")
        .expect(200);

      expect(res.body).toMatchObject({
        id: createdSpecialiteId,
        name: "Computer Science",
        abbreviation: "CS",
        filiereName: "Science",
      });
    });
  });

  describe("GET /specialite/abbreviation/:abbreviation", () => {
    it("should get a specialite by abbreviation", async () => {
      const res = await request(app)
        .get("/specialite/abbreviation/CS")
        .expect(200);

      expect(res.body).toMatchObject({
        id: createdSpecialiteId,
        name: "Computer Science",
        abbreviation: "CS",
        filiereName: "Science",
      });
    });
  });

  describe("GET /specialite/filiere/:filiereName", () => {
    it("should get specialite by filiere name", async () => {
      const res = await request(app)
        .get("/specialite/filiere/Science")
        .expect(200);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: createdSpecialiteId,
            name: "Computer Science",
            abbreviation: "CS",
            filiereName: "Science",
          }),
        ])
      );
    });
  });

  describe("PATCH /specialite/:id", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/specialite")
        .send({
          name: "Computer Science",
          abbreviation: "CS",
          filiereName: "Science",
        })
        .expect(201);

      createdSpecialiteId = res.body.id;
    });

    afterEach(async () => {
      await request(app)
        .delete(`/specialite/${createdSpecialiteId}`)
        .expect(200);
    });

    it("should update a specialite by id", async () => {
      const res = await request(app)
        .patch(`/specialite/${createdSpecialiteId}`)
        .send({
          name: "New Computer Science",
          abbreviation: "NCS",
          filiereName: "New Science",
        })
        .expect(200);

      expect(res.body).toMatchObject({
        id: createdSpecialiteId,
        name: "New Computer Science",
        abbreviation: "NCS",
        filiereName: "New Science",
      });
    });

    it("should return 404 if specialite with given id is not found", async () => {
      const res = await request(app)
        .patch(`/specialite/${createdSpecialiteId}1`)
        .send({
          name: "New Computer Science",
          abbreviation: "NCS",
          filiereName: "New Science",
        })
        .expect(404);

      expect(res.body.message).toBe("Specialite not found");
    });
  });

  describe("PATCH /specialite/name/:name", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/specialite")
        .send({
          name: "Computer Science",
          abbreviation: "CS",
          filiereName: "Science",
        })
        .expect(201);

      createdSpecialiteId = res.body.id;
    });

    afterEach(async () => {
      await request(app)
        .delete(`/specialite/${createdSpecialiteId}`)
        .expect(200);
    });

    it("should update a specialite by name", async () => {
      const res = await request(app)
        .patch("/specialite/name/Computer Science")
        .send({
          name: "New Computer Science",
          abbreviation: "NCS",
          filiereName: "New Science",
        })
        .expect(200);

      expect(res.body).toMatchObject({
        id: createdSpecialiteId,
        name: "New Computer Science",
        abbreviation: "NCS",
        filiereName: "New Science",
      });
    });

    it("should return 404 if specialite with given name is not found", async () => {
      const res = await request(app)
        .patch("/specialite/name/Nonexistent Specialite")
        .send({
          name: "New Computer Science",
          abbreviation: "NCS",
          filiereName: "New Science",
        })
        .expect(404);

      expect(res.body.message).toBe("Specialite not found");
    });
  });

  describe("PATCH /specialite/abbreviation/:abbreviation", () => {
    beforeEach(async () => {
      const res = await request(app)
        .post("/specialite")
        .send({
          name: "Computer Science",
          abbreviation: "CS",
          filiereName: "Science",
        })
        .expect(201);

      createdSpecialiteId = res.body.id;
    });

    describe("DELETE /specialite/:id", () => {
      it("should delete a specialite by id", async () => {
        const specialite = await Specialite.create({
          name: "Test Specialite",
          abbreviation: "TS",
          filiereName: "Test Filiere",
        });

        const res = await request(app).delete(`/specialite/${specialite._id}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Specialite deleted successfully");
      });

      it("should return 404 if specialite with given id is not found", async () => {
        const res = await request(app).delete(
          `/specialite/${new mongoose.Types.ObjectId()}`
        );

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Specialite not found");
      });
    });

    describe("DELETE /specialite/name/:name", () => {
      it("should delete a specialite by name", async () => {
        const specialite = await Specialite.create({
          name: "Test Specialite",
          abbreviation: "TS",
          filiereName: "Test Filiere",
        });

        const res = await request(app).delete(
          `/specialite/name/${specialite.name}`
        );

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Specialite deleted successfully");
      });

      it("should return 404 if specialite with given name is not found", async () => {
        const res = await request(app).delete(
          `/specialite/name/Nonexistent Specialite`
        );

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Specialite not found");
      });
    });

    describe("DELETE /specialite/abbreviation/:abbreviation", () => {
      it("should delete a specialite by abbreviation", async () => {
        const specialite = await Specialite.create({
          name: "Test Specialite",
          abbreviation: "TS",
          filiereName: "Test Filiere",
        });

        const res = await request(app).delete(
          `/specialite/abbreviation/${specialite.abbreviation}`
        );

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Specialite deleted successfully");
      });

      it("should return 404 if specialite with given abbreviation is not found", async () => {
        const res = await request(app).delete(`/specialite/abbreviation/XYZ`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Specialite not found");
      });
    });
  });
});
