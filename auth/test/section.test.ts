import request from "supertest";
import { app } from "../src/server"; // assuming that your express instance is exported as `app`

describe("Section endpoints", () => {
  let sectionId: string;

  it("should create a new section", async () => {
    const res = await request(app).post("/api/section").send({
      name: "Section 1",
      academicYear: "L3",
      nameSpecialite: "Informatique Academic",
    });

    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Section 1");
    expect(res.status).toEqual(201);
    sectionId = res.body._id;
  });

  it("should get all sections", async () => {
    const res = await request(app).get("/api/section");

    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should get all sections by specialite", async () => {
    const res = await request(app).get(
      "/api/section?specialite=Informatique Academic"
    );

    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should get section by id", async () => {
    // Assuming that there's already a section with id=1 in the database
    const res = await request(app).get(`/api/section/${sectionId}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toBe(sectionId);
  });

  it("should get section by name and nameSpecialite", async () => {
    const name = "Section 1";
    const academicYear = "L3";
    const nameSpecialite = "Informatique Academic";
    const res = await request(app).get(
      `/api/section?name=${name}&academicYear=${academicYear}&nameSpecialite=${nameSpecialite}`
    );

    expect(res.status).toEqual(200);
    expect(res.body.name).toBe(name);
    expect(res.body.academicYear).toBe(academicYear);
    expect(res.body.nameSpecialite).toBe(nameSpecialite);
  });

  it("should update section by id", async () => {
    // Assuming that there's already a section with id=1 in the database
    const res = await request(app).put(`/api/section/${sectionId}`).send({
      name: "Updated Section 1",
      academicYear: "L3",
      nameSpecialite: "Informatique Academic",
    });

    expect(res.status).toEqual(200);
    expect(res.body.id).toBe(sectionId);
    expect(res.body.name).toBe("Updated Section 1");
    expect(res.body.academicYear).toBe("L3");
    expect(res.body.nameSpecialite).toBe("Informatique Academic");
  });

  it("should update section by name and nameSpecialite", async () => {
    const name = "Section 1";
    const academicYear = "L2";
    const nameSpecialite = "Informatique Academic";
    const res = await request(app).patch("/api/section").send({
      name,
      academicYear,
      nameSpecialite,
      newName: "Updated Section 1",
      newAcademicYear: "M1",
      newNameSpecialite: "Informatique Academic",
    });

    expect(res.status).toEqual(200);
    expect(res.body.name).toBe("Updated Section 1");
    expect(res.body.academicYear).toBe("M1");
    expect(res.body.nameSpecialite).toBe("Informatique Academic");
  });

  it("should delete section by id", async () => {
    // Assuming that there's already a section with id=1 in the database
    const res = await request(app).delete(`/api/section/${sectionId}`);

    expect(res.status).toEqual(200);
  });

  it("should delete section by name", async () => {
    const section = {
      name: "Updated Section 1",
      academicYear: "M1",
      nameSpecialite: "Informatique Academic",
    };
    const res = await request(app).delete("/api/section").send(section);

    expect(res.status).toEqual(200);
  });
});
