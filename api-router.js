var http = require('http');
var mongoose = require('mongoose').Schema;
var bodyparser = require('body-parser');
const express = require('express');
const productJson = require('./mock-data/productResponse.json');
var paginationProduct = require('./mock-data/paginationResponse');
var http = require('http');
var schedule = require('node-schedule');
var WalmartCategoriesRequested = require('./models/walmartCategoriesRequested');
var request = require('request');
var categoryList = require('./mock-data/walmart_categories_requested.json');
const router = express.Router();
var Product = require('./models/product');
var ProductsMissingUPC = require('./models/missingUPC');
router.use(express.static(__dirname + '/mock-data'));
var c = []
for (var key in categoryList[0]) {
  var value = categoryList[0][key];
  c.push(value);
}
var trackTime = null;

var BASE_URL = 'http://api.walmartlabs.com';
//returns a product json
router.get("/paginated", (req, res) => {
  console.log('-------------sorry, I\'m slow server :)----------------');
  console.log((Date.now() - trackTime) / 1000 + " sec ");
  setTimeout(() => {
    var a = paginationProduct;
    a['nextPage'] = req.query.id;
    // paginationProduct['nextPage'] = paginationProduct['nextPage'] + Date.now(); 
    // console.log(a['nextPage']);
    res.send(a);
    a = [];
  }, 2000);

});
router.get("/product", (req, res) => {
  res.send(productJson);
});

router.get('/w', (req, res) => {
  console.log('asked');
  res.send(productJson);
});
var http = require('http');
var requestLoop = (category) => {
  var allData = []
  trackTime = Date.now();
  var counter = 0;
  var nextPage = BASE_URL + `/v1/paginated/items?format=json&category=${category}&apiKey=2aqapxyrrj6mfv4ptecp6vqd`;
  // var url = "http://localhost:2222/api/paginated?id=" + Date.now();
  var arr = [nextPage];
  var clearId = setInterval(function () {

    // var req = http.get(`http://api.walmartlabs.com/v1/search?query=+%2A&format=json&categoryId=${c[counter]}&apiKey=2aqapxyrrj6mfv4ptecp6vqd`, function (res) {
    if (arr.length != 0) {
      var req = http.get(arr.pop(), function (res) {
        var bodyChunks = [];
        res.on('data', function (chunk) {
          bodyChunks.push(chunk);
        }).on('end', function () {
          // console.log(bodyChunks.toString())
          var body = JSON.parse(Buffer.concat(bodyChunks));
          // console.log(body);
          // if (body = {}) {
          //   console.log('we are done');
          //   clearInterval(clearId);
          //   return;
          // }
          try {
            console.log(body['items'].length);
          } catch (err) {
            console.log('End of journey')
            addWalmartProducts(category, allData);
            // console.log(err);
            clearInterval(clearId);
            return;
          }
          arr.push(BASE_URL + body['nextPage']);
          // console.log(body);
          // arr.push("http://localhost:2222/api/paginated?id=" + Date.now());
          console.log('time ', (Date.now() - trackTime) / 1000);
          console.log('size: ', body['items'].length);
          console.log('first item', body['items'][0].name);
          console.log('counter ', counter);
          allData.push(body['items']);
          // console.log(JSON.parse(body)['totalResults'], ' -> ', JSON.parse(body)['categoryId']);
        })
      });
      counter++;
    } else {
      // console.log('I can\'t, no nextPage is ready');
    }
    // if (counter == 2) {
    //   clearInterval(clearId);
    //   console.log('stopped setInterval of 40 request');
    // }
  }, 300);
}
// expects http://localhost:2222/api/w
router.get('/iterate', (req, res) => {
  console.log('This runs every 50 second');
  requestLoop('5427_133283_164196');
});
requestLoop('1085666_133225_1058964');




const addWalmartProducts = (id, data) => {
  console.log('in update walmart category', id);
  // var body = [paginationProduct['items']];
  var body = data;
  // console.log(body);
  let fullArray = body;
  let counter = 0;
  let productArray = [];
  let missingArray = [];
  let hasError = false;

  fullArray.map((prodArray, index) => {
    // console.log(prodArray);
    prodArray.map((product, i) => {
      // insert each product into array to batch insert into db
      if (product.upc) {
        counter++;
        let productInfo = {
          upc: product.upc,
          item_ids: {
            source: 'walmart',
            id: product.itemId
          },
          item_name: product.name,
          item_description_short: product.shortDescription,
          item_description_long: product.longDescription,
          price: product.salePrice,
          price_msrp: product.msrp,
          imp_size: product.size,
          walmartCategoryPath: product.categoryPath,
          brand_name: product.brandName,
          image_thumbnail: product.thumbnailImage,
          image_large: product.largeImage,
          dateAdded: Date.now(),
          hasError: false
        };
        console.log("id ", product.itemId);
        console.log('addingOne ', product.upc);
        productArray.push(productInfo);

      } else {
        console.log('addingONe Missing ', product.upc);


        // missing upc codes
        missingArray.push({
          item_name: product.name,
          item_ids: {
            source: 'walmart',
            id: product.itemId
          },
          brand_name: product.brandName,
          walmartCategoryPath: product.categoryPath,
          image_thumbnail: product.thumbnailImage,
          image_large: product.largeImage,
          dateAdded: Date.now()
        })
      }

    });

  });
  Product.insertMany(productArray)
    .then(function () {
      console.log('total items: ', counter);

    })
    .catch((err)=>{
      console.log('product err');
      
      console.log(err.message);
    });


  ProductsMissingUPC.insertMany(missingArray)
    .then(function () {
      console.log('total missing items: ', missingArray.length);
    })
    .catch((err) => {
      console.log('missing err');
      console.log(err.message);require('./mock-data/walmart_categories_requested.json')
    });

  var categoryName = null;
  Object.keys(categoryList[0]).every(cate => {
    if (categoryList[0][cate] == id) {
      categoryName = cate;
      console.log('got the cateogry ', cate);
      return false;
    }
    return true;
  });
  WalmartCategoriesRequested.insert({
     categoryName: categoryName,
      categoryId: id,
      productDataRetrieved: true,
      productDataRetrievedDate: Date.now(),
      productsInserted: true,
      numPages: fullArray.length,
      numItems: counter,
      hasError: hasError
    },function (err, category) {
    if (err) return err;
    console.log('complete creating walmart');
    // res.end();
  });
}


module.exports = router;



//   schedule.scheduleJob("*/30 * * * * *", function () {
//         console.log('-----------------startof1JOB-----------------------')
//         console.log('size so far ', i);
//         requestLoop(i);
//         // i+=40;
//     });
