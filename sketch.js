// animation 001

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
  createCanvas(900, 650);

  treeData = geodata.features;
  console.log(treeData.length);

  // filter out trees with no PFLANZJAHR
  treeData = treeData.filter(function (d) {
    return d.properties.PFLANZJAHR != null;
  });
  console.log(treeData.length);

  // filter out obviously invalid year data (12)
  treeData = treeData.filter(function (d) {
    return d.properties.PFLANZJAHR > 1000;
  });

  // get the start year for the animation, this is the earliest year in the data
  let startYear = d3.min(treeData, function (d) {
    return d.properties.PFLANZJAHR;
  });

  console.log("startYear", startYear);

  currentYear = startYear;

  frameRate(30);
}

function draw() {
  background(255);

  noStroke();
  fill(0);
  text(currentYear, 50, 50);

  drawTrees();

  currentYear += 0.5;
}

function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];

    if (treeObject.properties.PFLANZJAHR < currentYear) {
      let coordinates = treeObject.geometry.coordinates;
      let lat = coordinates[1];
      let lon = coordinates[0];

      let x = map(lon, bounds.left, bounds.right, 0, width);
      let y = map(lat, bounds.top, bounds.bottom, 0, height);

      fill(0);
      noStroke();
      ellipse(x, y, 3, 3);
    }
  }
}
