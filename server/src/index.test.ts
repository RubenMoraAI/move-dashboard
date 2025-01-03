import request from "supertest";
import { app, startServer } from "./index";
 
describe("Express App", () => {
  let server: any;

  beforeAll((done) => {
    server = startServer(0); // Use an ephemeral port for tests
    server.on("listening", done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should use JSON middleware", async () => {
    const response = await request(app).get("/dashboard");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it("should apply Helmet security middleware", async () => {
    const response = await request(app).get("/dashboard");
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
  });

  it("should configure CORS", async () => {
    const response = await request(app).options("/products");
    expect(response.status).toBe(204);
    expect(response.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
  });

  it("should respond to routes with 404 if undefined", async () => {
    const response = await request(app).get("/undefinedRoute");
    expect(response.status).toBe(404);
  });

  it("should configure and start listening on the given port", async () => {
    const address = server.address();
    const port = typeof address === "string" ? address.split(":").pop() : address?.port;
    expect(port).toBeDefined();
  });
});
 