var myData;
var people = [];
var myImg;

function preload() {
    myData = loadJSON('./assets/peopleinspace.json');
    myImg = loadImage('./assets/backgroundimage.jpg');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
    
  for(var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    print(astroData);
    var newAstronaut = new Astronaut(astroData.name, astroData.launchdate);
    people.push(newAstronaut);
  }
}

function draw() {
  background(0);
  imageMode(CENTER);
  image(myImg,width/2,height/2,500,500);
    
  for(var i = 0; i < people.length; i++) {
	  var astronaut = people[i];
	  astronaut.move();
	  astronaut.display();
	}
}

function Astronaut(name, launchDate) {
    
    this.name = name;
    
    this.radius = 10;
    
    this.launchDate = Date.parse(launchDate);
    var timeInSpace = floor( (Date.now()-this.launchDate)/(1000*60*60*24) );
    
    this.x = random(windowWidth/2-250, windowWidth/2+250);
    this.y = random(windowHeight/2-250, windowHeight/2+250);
    
    this.incrementX = 1;
    this.incrementY = 1;
    
    this.display = function() {
        
        if(mouseIsPressed === true) {
          if(mouseButton == LEFT){
              textAlign(CENTER);
              text(this.name, this.x, this.y + this.radius + 15);
          }
          if(mouseButton == RIGHT){
              textAlign(CENTER);
              text(timeInSpace+" days in space", this.x, this.y + this.radius + 15);
          }
        } else {
          fill(255);
          ellipse(this.x, this.y, this.radius);
        }
    }
    
    this.move = function() {
        
        this.x += this.incrementX;
        this.y += this.incrementY;
        
        if (this.x > windowWidth/2+250 || this.x < windowWidth/2-250){
            this.incrementX *= -1
            print(this.x);
            print(this.radius);
        }

        if (this.y > windowHeight/2+250 || this.y < windowHeight/2-250){
            this.incrementY *= -1
            print(this.y);
            print(this.radius);
        }
        
        var distance = dist(mouseX,mouseY,this.x,this.y);
        if(distance < 10) {
            this.incrementY *= -1
            print(this.y);
            print(this.radius);
        }
    }   
}