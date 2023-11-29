import fs from "fs/promises";

export const setup = () => {
  fs.access("./planes.json")
    .then((data) => console.log(data))
    .catch((err) => {
      fs.writeFile("./planes.json", "[]");
    });
};

export const allPlanes = () => {
  return fs
    .readFile("./planes.json", { encoding: "utf-8" })
    .then((data) => JSON.parse(data));
};

export const savePlane = (plane) => {
  allPlanes()
    .then((data) => {
      data.push(plane);
      return data;
    })
    .then((array) => fs.writeFile("./planes.json", JSON.stringify(array)));
};

export const editPlane = (newPlane, idplan) => {
  allPlanes().then((planes) => {
    const index = planes.findIndex((item) => item.id === idplan);
    if (index !== -1) {
      planes.splice(index, 1, newPlane);
      fs.writeFile("./planes.json", JSON.stringify(planes));
    }
  });
};

export const deletePlane = (id) => {
  allPlanes().then((planes) => {
    const index = planes.findIndex((item) => item.id === id);
    planes.splice(index, 1);
    fs.writeFile("./planes.json", JSON.stringify(planes));
  });
};
