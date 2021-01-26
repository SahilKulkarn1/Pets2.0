//Create variables here
var database; 
var dog;
var happyDog, sadDog;
var foodS;
var foodStock
var feed,addFood;
var foodObj,feedTime,lastFed;

function preload()
{
  //load images here
  happyDog=loadImage("images/dogImg1.png")
  sadDog = loadImage("images/dogImg.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  foodObj= new Food();

  dog = createSprite(450,250)
  dog.addImage(sadDog)
  dog.scale = 0.2
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)



  feed=createButton("Feed The Dog")
  feed.position(600,95)
  feed.mousePressed(feedDog) 

  addFood=createButton("Add Food")
  addFood.position(700,95)
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);

  foodObj.display();
  feedtime=database.ref("FeedTime")
  feedtime.on("value", function (data){
    lastFed= data.val()
  })
  
  drawSprites();


  textSize(15)
  fill(255)
  text("Food Remaing : " +foodS, 270, 100)

  
 
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed :"+lastFed+"AM",350,30)
  }





}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })


}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFoodStock();
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



