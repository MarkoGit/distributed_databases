if (db.items.count === 0) {
db.items.insertMany([
	{
	"category" : "Phone",
	"model" : "iPhone 6",
	"producer" : "Apple",
	"price" : 600
	},
	{
	"category" : "Laptop",
	"model" : "Macbook Pro",
	"producer" : "Apple",
	"price" : 1000
	},
	{
	"category" : "Laptop",
	"model" : "Thinkpad",
	"producer" : "Lenovo",
	"price" : 400
	}
])
}

// All items in JSON
db.items.find().pretty()

// Number of  items
db.items.find({"category" : "Laptop"}).length()

// Select items for categories and price range
db.items.find({category: "Laptop", $or : [{model : {$in : ["Macbook Pro", "Thinkpad"]}}], price: {"$gt": 200, "$lt": 1100}}).pretty()

//Update models
db.items.update({category: "Phone", model: "iPhone 6"}, {$set: {model: "iPhone X"}})

//Add field
db.items.update({category: "Laptop"}, {$set: {processor: "i7"}}, {multi: true})

//Find items with property
db.items.find({processor: {"$exists": true}})

// Insert Order
if (db.orders.count === 0) {
db.orders.insertMany(
[{
	"order_number" : 201513,
	"date" : ISODate("2015-04-14"),
	"total_sum" : 1923.4,
	"customer" : {
    	"name" : "Andrii",
    	"surname" : "Rodinov",
    	"phones" : ["9876543", "1234567"],
    	"address" : "PTI, Peremohy 37, Kyiv, UA"
	},
	"payment" : {
    	"card_owner" : "Andrii Rodionov",
    	"cardId" : 12345678
	},
	"order_items_id" : [
    	{
        	"$ref" : "items",
        	"$id" : ObjectId("5a771f3e8ef5ae08d3c593c4")
    	},
    	{
        	"$ref" : "items",
        	"$id" : ObjectId("5a771f3e8ef5ae08d3c593c3")
    	}
	]
},
{    
	"order_number" : 201513,
	"date" : ISODate("2015-04-14"),
	"total_sum" : 4000,
	"customer" : {
    	"name" : "Andrii",
    	"surname" : "Rodinov",
    	"phones" : ["9876543", "1234567"],
    	"address" : "PTI, Peremohy 37, Kyiv, UA"
	},
	"payment" : {
    	"card_owner" : "Andrii Rodionov",
    	"cardId" : 12345678
	},
	"order_items_id" : [
    	{
        	"$ref" : "items",
        	"$id" : ObjectId("5a771f3e8ef5ae08d3c593c4")
    	},
	]
},
{    
	"order_number" : 201513,
	"date" : ISODate("2015-04-14"),
	"total_sum" : 1923.4,
	"customer" : {
    	"name" : "Andrii",
    	"surname" : "Rodinov",
    	"phones" : ["9876543", "1234567"],
    	"address" : "PTI, Peremohy 37, Kyiv, UA"
	},
	"payment" : {
    	"card_owner" : "Andrii Rodionov",
    	"cardId" : 12345678
	},
	"order_items_id" : [
    	{
        	"$ref" : "items",
        	"$id" : ObjectId("5a771f3e8ef5ae08d3c593c4")
    	},
    	{
        	"$ref" : "items",
        	"$id" : ObjectId("5a771f3e8ef5ae08d3c593c3")
    	},
    	{
        	"$ref" : "items",
        	"$id" : ObjectId("5a771f3e8ef5ae08d3c593c5")
    	}
	]
}
])
}

// Get all orders
db.orders.find().pretty()

// Get orders with sum greater than n
db.orders.find({total_sum : {$gt : 3500}})

// Find orders from customer
db.orders.find({"customer.name": "Andrii", "customer.surname": "Rodinov"})

// Find all orders with some item
db.orders.find({'order_items_id.$id': ObjectId("5a771f3e8ef5ae08d3c593c3")})

// Update all orders with some item
db.orders.updateMany(
  {
  "order_items_id.$id": ObjectId("5a771f3e8ef5ae08d3c593c3")
  },
  {
    "$push": {
      order_items_id: {
        "$ref": "items", 
        "$id": ObjectId("5a771f3e8ef5ae08d3c593c4")
      }
   },
   "$inc": {total_sum: 300}}
   )
;

// Count of goods in order
db.orders.aggregate([
  {
      $match: {_id:ObjectId("5a7728f78ef5ae08d3c593d4")}
  },
  {
    $project: {
        countOfgoods: {$size:'$order_items_id'}
    }}]
)

// Get name and card number 
db.orders.find({total_sum: {"$gt": 3500}}, {_id: 0, payment: 1})

// Remove orders
db.orders.updateMany(
{
  date: {"$gt": ISODate("2015-03-14T00:00:00.000+0000"), "$lt": ISODate("2015-05-14T00:00:00.000+0000")}
}, 
{
  "$pop": {order_items_id: 1}
}
)

// Rename surname
db.orders.updateMany({}, 
{$set:{"customer.surname":"Borisov"}}
)

db.orders.find()



