
let xd = [],
    yd = [],
    segNum = 15,
    segLength = 40,
    table;

let head;
let body;
let tail;
let sun;
let sky;

let circles = [];

for (let i = 0; i < segNum; i++) {     //used for the dragon
  xd[i] = 0;
  yd[i] = 0;
}
function preload(){
  font1 = loadFont('font/Montserrat-VariableFont_wght.ttf');
  font2 = loadFont('font/Roboto-Medium.ttf');
  table = loadTable('Dataset/solar2.csv', 'csv', 'header');
  head = loadImage('assets/head.png');
  body = loadImage('assets/body.png');
}

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  console.log(table);
}

function draw() {
  let colorbg = color(20, 20, 20);
  let colorYellow = color(232, 175, 61);
  let colorDark = color(71, 68, 6);
  background(colorbg);

  fill(colorYellow);
push();
var protection = 0;

    
      while(circles.length < table.getRowCount()){
      let time = table.getNum(circles.length , 'Delta T (s)');
      var diam = map(time, 73, 95, 20, 200);
      let xr = random(90, windowWidth - 90);
      let yr =  random(90, windowHeight - 140);

      var circle = {
        x: xr,
        y: yr,
        r: diam
      }

      var overlapping = false;
      for (var j = 0; j < circles.length; j++) {
        var other = circles[j];
        var d = dist(circle.x, circle.y, other.x, other.y);
        if (d < circle.r + other.r) {
          overlapping = true;
        }
      }
      if (!overlapping) {
        circles.push(circle);
      }
      protection++;
      if (protection > 10000) {
        break;
      }
    }
    let sundatover = false;
    for (var i = 0; i < circles.length; i++) {
      let days = table.getString(i, 'Calendar Date');
      let hour = table.getString(i, 'Eclipse Time');
      let type = table.getString(i, 'Eclipse Type');
      if(sunoverdat(circles[i].x - width/2, circles[i].y - height/2, circles[i].r)){
        sundatover = true;
      }
      else{
        sundatover = false;
      }
      push();
      fill(colorYellow);
      noStroke();
      ellipse(circles[i].x - width/2, circles[i].y - height/2, circles[i].r);
      pop();
      if(sundatover){
        background(28, 3, 0);
        fill(colorYellow);
        noStroke();
        ellipse(circles[i].x - width/2, circles[i].y - height/2, circles[i].r)
        fill(114, 32, 13);
        ellipse(circles[i].x - width/2, circles[i].y - height/2, circles[i].r - 10);
        fill(255);
        textSize(12);
        textFont(font2);
        text(days, circles[i].x - width/2 - 40, circles[i].y + circles[i].r/2 + 40 - height/2 );
        text(hour, circles[i].x - width/2 - 40, circles[i].y + circles[i].r/2 + 60 - height/2 );
        text(type, circles[i].x - width/2 - 40, circles[i].y + circles[i].r/2 + 80 - height/2 );

      }
    }
pop();

push();              //dragon
  dragFace(0, mouseX - width/2, mouseY - height/2);
  dragSegment(0, mouseX - width/2, mouseY - height/2);   
  //dragcoda(0, mouseX - width/2, mouseY - height/2);           
  for (let i = 0; i < xd.length - 1; i++) {
    dragSegment(i + 1, xd[i], yd[i]);
  }
pop();

for(i = 0; i < table.getRowCount(); i++){
  let txt = table.getString(i, 'Calendar Date');
  let xc = random(0, width);
  let yc = random(0, height);
  text(txt, xc, yc);
}


}

function sunoverdat(x, y, diameter){
  const disX = x - (mouseX - width/2);
  const disY = y - (mouseY - height/2);
  if(sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}

function dragFace(i, xin, yin) {
  const dxd = xin - xd[i];
  const dyd = yin - yd[i];
  const angled = atan2(dyd, dxd);
  xd[i] = xin - cos(angled) * segLength;
  yd[i] = yin - sin(angled) * segLength;
  face(xd[0], yd[0], angled);

}

function face(xd, yd, a){
  push();
  translate(xd, yd);
  rotate(a);
  noStroke();
  texture(head);
  //fill(255);
  rect(0, -45, 150, 90);
  pop();
}

function dragSegment(i, xin, yin) {
  const dxd = xin - xd[i];
  const dyd = yin - yd[i];
  const angled = atan2(dyd, dxd);
  xd[i] = xin - cos(angled) * segLength;
  yd[i] = yin - sin(angled) * segLength;
  segment(xd[i], yd[i], angled);

}


function segment(xd, yd, a) {
  push();
  translate(xd, yd);
  rotate(a);
  noStroke();
  texture(body);
  //fill(255);
  rect( -50, 0, segLength + 30, segLength);
  pop();
}

