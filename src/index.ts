import "dotenv/config";
import { Hono } from "hono";
import calculateScore from "./services/calculate-score-service";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/video-score", async (c) => {
  const videoId = c.req.query("videoId");
  if (!videoId) {
    return c.json({ error: "Video ID is required" }, 400);
  }

  const result = await calculateScore({ videoId });
  return c.json(result);
});

export default app;
