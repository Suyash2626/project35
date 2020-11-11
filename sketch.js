//Create variables here
var dog,happyDog;
var database;
var foodS;
var foodStock;
var feedDog,addFoods;
var fedTime, lastFed;
var foodObj;
var feed,addFood;


function preload()
{
  //load images here
  i1=loadImage("images/dogImg.png");
  i2=loadImage("images/dogImg1.png");
  i3=loadImage("image/Milk.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog=createSprite(250,250);
  dog.addImage(i1);
  dog.addImage(i2);
  dog.scale=0.15

  database=firebase.database()

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  foodObj=new Food(50,80,80,40);
  foodObj.addImage(i3);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(0);

foodObj.display();



fedTime=database.ref('FedTime')
fedTime.on("value",function(data){
  lastFed=data.val();
})

  drawSprites();
  
//add styles here

if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM",350,30)
}else if(lastFed===0){
  text("Last Feed:12 AM",350,30)
}else{
  text("Last Feed:"+lastFed+"AM",350,30)
}



  
  text("Food remaining : "+foodS,170,200);
if(foodS===0){
  text("Food completed",180,100);
  dog.addImage(i1)
 }

}

function readStock(data){
  foodS=data.val();
  
}

function writeStock(x){
  if(x<=0){
   x=0 
  }
else{
  x=x-1

}

database.ref('/').update({
Food:x
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




function  feedDog(){
  dog.addImage(i2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour
  })
}


























