import request from "supertest";
import { app } from "../src/server";
import mongoose from "mongoose";

describe("Filiere API", () => {
  let filiereId: string;
  let filiereName: string;
  let filiereAbbreviation: string;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI!);
    // Create a test filiere
    const filiere = await request(app).post("/api/filiere").send({
      name: "Test Filiere",
      abbreviation: "TF",
    });
    filiereId = filiere.body._id;
    filiereName = filiere.body.name;
    filiereAbbreviation = filiere.body.abbreviation;
  });

  afterAll(async () => {
    // Delete test filiere
    await request(app).delete(`/api/filiere/${filiereId}`);
    // Disconnect from database
    await mongoose.connection.close();
  });

  describe("POST /api/filiere", () => {
    it("should create a new filiere", async () => {
      const response = await request(app)
        .post("/api/filiere")
        .send({
          name: "New Filiere",
          abbreviation: "NF",
        })
        .expect(201);
      expect(response.body.name).toBe("New Filiere");
      expect(response.body.abbreviation).toBe("NF");
    });
  });

  describe("GET /api/filiere", () => {
    it("should return all filieres", async () => {
      const response = await request(app).get("/api/filiere").expect(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/filiere/:id", () => {
    it("should return a filiere by ID", async () => {
      const response = await request(app)
        .get(`/api/filiere/${filiereId}`)
        .expect(200);
      expect(response.body._id).toBe(filiereId);
      expect(response.body.name).toBe(filiereName);
      expect(response.body.abbreviation).toBe(filiereAbbreviation);
    });
    it("should return 404 if filiere with ID does not exist", async () => {
      const nonExistentId = "123456789012345678901234"; // 24-character non-existent ID
      await request(app).get(`/api/filiere/${nonExistentId}`).expect(404);
    });
  });

  describe("GET /api/filiere/name/:name", () => {
    it("should return a filiere by name", async () => {
      const response = await request(app)
        .get(`/api/filiere/name/${filiereName}`)
        .expect(200);
      expect(response.body._id).toBe(filiereId);
      expect(response.body.name).toBe(filiereName);
      expect(response.body.abbreviation).toBe(filiereAbbreviation);
    });
    it("should return 404 if filiere with name does not exist", async () => {
      const nonExistentName = "Nonexistent Filiere";
      await request(app)
        .get(`/api/filiere/name/${nonExistentName}`)
        .expect(404);
    });
  });

  describe("GET /api/filiere/abbreviation/:abbreviation", () => {
    it("should return a filiere by abbreviation", async () => {
      const response = await request(app)
        .get(`/api/filiere/abbreviation/${filiereAbbreviation}`)
        .expect(200);
      expect(response.body._id).toBe(filiereId);
      expect(response.body.name).toBe(filiereName);
      expect(response.body.abbreviation).toBe(filiereAbbreviation);
    });
    it("should return 404 if filiere with abbreviation does not exist", async () => {
      const nonExistentAbbreviation = "NF";
      await request(app)
        .get(`/api/filiere/abbreviation/${nonExistentAbbreviation}`)
        .expect(404);
    });
  });

  describe("PATCH /api/filiere/:id", () => {
    it("should update a filiere by ID", async () => {
      const response = await request(app)
        .patch(`/api/filiere/${filiereId}`)
        .send({
          name: "Updated Filiere",
          abbreviation: "UF",
        })
        .expect(200);
      expect(response.body._id).toBe(filiereId);
      expect(response.body.name).toBe("Updated Filiere");
      expect(response.body.abbreviation).toBe("UF");
    });
    it("should return 404 if filiere with ID does not exist", async () => {
      const nonExistentId = "123456789012345678901234"; // 24-character non-existent ID
      await request(app)
        .patch(`/api/filiere/${nonExistentId}`)
        .send({
          name: "Updated Filiere",
          abbreviation: "UF",
        })
        .expect(404);
    });
  });

  describe("PATCH /api/filiere/name/:name", () => {
    it("should update a filiere by name", async () => {
      const response = await request(app)
        .patch(`/api/filiere/name/${filiereName}`)
        .send({
          name: "Updated Filiere",
          abbreviation: "UF",
        })
        .expect(200);
      expect(response.body._id).toBe(filiereId);
      expect(response.body.name).toBe("Updated Filiere");
      expect(response.body.abbreviation).toBe("UF");
    });
    it("should return 404 if filiere with name does not exist", async () => {
      const nonExistentName = "Nonexistent Filiere";
      await request(app)
        .patch(`/api/filiere/name/${nonExistentName}`)
        .send({
          name: "Updated Filiere",
          abbreviation: "UF",
        })
        .expect(404);
    });
  });

  describe("PATCH /api/filiere/abbreviation/:abbreviation", () => {
    it("should update a filiere by abbreviation", async () => {
      const response = await request(app)
        .patch(`/api/filiere/abbreviation/${filiereAbbreviation}`)
        .send({
          name: "Updated Filiere",
          abbreviation: "UF",
        })
        .expect(200);
      expect(response.body._id).toBe(filiereId);
      expect(response.body.name).toBe("Updated Filiere");
      expect(response.body.abbreviation).toBe("UF");
    });
    it("should return 404 if filiere with abbreviation does not exist", async () => {
      const nonExistentAbbreviation = "NF";
      await request(app)
        .patch(`/api/filiere/abbreviation/${nonExistentAbbreviation}`)
        .send({
          name: "Updated Filiere",
          abbreviation: "UF",
        })
        .expect(404);
    });
  });

  describe("DELETE /api/filiere/:id", () => {
    it("should delete a filiere by ID", async () => {
      await request(app).delete(`/api/filiere/${filiereId}`).expect(200);
    });
    it("should return 404 if filiere with ID does not exist", async () => {
      const nonExistentId = "123456789012345678901234"; // 24-character non-existent ID
      await request(app).delete(`/api/filiere/${nonExistentId}`).expect(404);
    });
  });

  describe("DELETE /api/filiere/name/:name", () => {
    it("should delete a filiere by name", async () => {
      await request(app).delete(`/api/filiere/name/${filiereName}`).expect(200);
    });
    it("should return 404 if filiere with name does not exist", async () => {
      const nonExistentName = "Nonexistent Filiere";
      await request(app)
        .delete(`/api/filiere/name/${nonExistentName}`)
        .expect(404);
    });
  });

  describe("DELETE /api/filiere/abbreviation/:abbreviation", () => {
    it("should delete a filiere by abbreviation", async () => {
      await request(app)
        .delete(`/api/filiere/abbreviation/${filiereAbbreviation}`)
        .expect(200);
    });
    it("should return 404 if filiere with abbreviation does not exist", async () => {
      const nonExistentAbbreviation = "NF";
      await request(app)
        .delete(`/api/filiere/abbreviation/${nonExistentAbbreviation}`)
        .expect(404);
    });
  });
});
