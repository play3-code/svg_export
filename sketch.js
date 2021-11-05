// svg_export

let geodata;
let treeData;

let currentYear;

let bounds = {
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};

function preload() {
  geodata = loadJSON("lucerne-trees.json");
}

function setup() {
  createCanvas(900, 650, SVG);

  treeData = geodata.features;
  console.log(treeData.length);

  noLoop();
}

function draw() {
  clear();

  drawTrees();
  //  save("trees.svg");
}

function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];

    let coordinates = treeObject.geometry.coordinates;
    let lat = coordinates[1];
    let lon = coordinates[0];

    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);

    fill(0, 255, 0);
    noStroke();
    ellipse(x, y, 10, 10);
  }
}

function keyTyped() {
  if (key == "s") {
    save("trees.svg");
  }
}
