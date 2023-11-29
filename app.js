import express from "express";
import {
  allPlanes,
  savePlane,
  setup,
  editPlane,
  deletePlane,
} from "./utils/filestorage.js";
const PORT = 9999;
const app = express();
setup();
app.use(express.json());
app.get("/api/planes", (req, res) => {
  allPlanes().then((planes) => res.json(planes));
});
app.post("/api/planes", (req, res) => {
  const newplane = req.body;
  allPlanes().then((planes) => {
    const isId = planes.some((item) => item.id === newplane.id);
    if (!isId) {
      savePlane(newplane);
    }
  });
  res.end();
});

// edit
app.put("/api/planes", (req, res) => {
  const newPlane = req.body;
  editPlane(newPlane, newPlane.id);
  res.end();
});

// delete
app.delete("/api/planes", (req, res) => {
  const plane = req.body;
  deletePlane(plane.id);
  res.end();
});

app.listen(PORT, () => console.log("server leuft"));
