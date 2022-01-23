// var token = JSON.parse(localStorage.getItem("token"));
// console.log(token)

//var token = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxZWE3NDkzZjkzNmM1NTMwMWQ3YzdiMiIsIm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFRHbmtGTzBNWXFjRExVVWJBazFSNmVGYWJoYTRNOVFIbUlBVDRRS3VwbS5vR1Y0bWhDL0txIiwiX192IjowfSwiaWF0IjoxNjQyOTQzNzkzLCJleHAiOjE2NDI5NDQwOTN9.097IJv9QCenK2WQ-C-EWZ2HZ88NRC6a_QZk1AkSZkYs";
//var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxZWE3NDkzZjkzNmM1NTMwMWQ3YzdiMiIsIm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFRHbmtGTzBNWXFjRExVVWJBazFSNmVGYWJoYTRNOVFIbUlBVDRRS3VwbS5vR1Y0bWhDL0txIiwiX192IjowfSwiaWF0IjoxNjQyOTMzNzYwLCJleHAiOjE2NDI5MzQwNjB9.KRlytB6UTYTyNY8cIWiKq4kBKzL2bYmigWuMMZh9tA"

// async function getuserdetails(token){


// let response=await fetch("/products",{

//     headers: {
//         "Content-Type":"application/json",

//         Authorization: `Bearer ${token}`

//     }

// });

// let data=await response.json();
// totalfunc(data)
// console.log("data",data)


// }

// getuserdetails(token);





async function getdata(){
try{
     let response=await fetch("/products")
    
     let result = await response.json();
         
     totalfunc(result)
       return ;
}catch (err){
    
        console.log("error",err)
       }
}

getdata();


function totalfunc(data){

const duvet_covers = data;
console.log(duvet_covers)


var products_container = document.getElementById("products_container");
var view = 4;

displayItems(duvet_covers);

function displayItems(duvet_covers) {
    products_container.innerHTML = null;
    duvet_covers.forEach(el => {
        let product_item_container = document.createElement("div");
        let item_image_container = document.createElement("div");
        let item_image = document.createElement("img");
        let item_overlay = document.createElement("div");
        let item_overlay_text = document.createElement("p");
        let product_item_title = document.createElement("p");
        let product_item_price = document.createElement("p");

        if(view === 2) {
            product_item_container.style.width = "99%";
            item_image.style.height =  "760px";
        } else if(view === 4) {
            product_item_container.style.width = "49%";
            item_image.style.height =  "380px";
        }

        product_item_container.setAttribute("class", "product_item_container");
        item_image_container.setAttribute("class", "item_image_container");
        item_image.setAttribute("class", "item_image");
        item_overlay.setAttribute("class", "item_overlay");
        item_overlay_text.setAttribute("class", "item_overlay_text");
        product_item_title.setAttribute("class", "product_item_title");
        product_item_price.setAttribute("class", "product_item_price");

        item_image.src = el.main_img;
        item_overlay_text.textContent = "ADD TO BASKET";
        product_item_title.textContent = el.name;
        product_item_price.innerHTML = `&#8364 ${el.price}`;

        item_overlay.append(item_overlay_text);
        item_image_container.append(item_image, item_overlay);
        product_item_container.append(item_image_container, product_item_title, product_item_price);
        products_container.append(product_item_container);

        product_item_container.addEventListener("click", function () {
            localStorage.setItem("itemArr", JSON.stringify(el));

            console.log(el._id)
            window.location.href = `/products/${el._id}`;

            // window.location.href = `/items_page`;
        })
    });
}

let singleView = document.getElementById("singleView");
let dualView = document.getElementById("dualView");

singleView.addEventListener("click", function() {
    view = 2;
    displayItems(duvet_covers);
    singleView.style.textDecoration = "underline";
    dualView.style.textDecoration = "none";
    singleView.style.fontWeight = "bold";
    dualView.style.fontWeight = "400";
    
})

dualView.addEventListener("click", function() {
    view = 4;
    displayItems(duvet_covers);
    dualView.style.textDecoration = "underline";
    singleView.style.textDecoration = "none";
    dualView.style.fontWeight = "bold";
    singleView.style.fontWeight = "400";    

})

// displayItems(duvet_covers);


// fiter............................................
let low=document.getElementById("low");
low.addEventListener("click",sortpricelow);

let high=document.getElementById("high");
high.addEventListener("click",sortpricehigh);

// let low=document.getElementById("low")

function sortpricelow(){
    var selectedp=document.getElementById("low").value;
        if(selectedp=="low"){
       var sortp = duvet_covers.sort(function(a,b){
                return a.price-b.price;
              });
         }
         displayItems(sortp);
  }

  function sortpricehigh(){
    var selectedp1=document.getElementById("high").value;
        if(selectedp1=="high"){
       var sortp1=duvet_covers.sort(function(a,b){
                return b.price-a.price;
              });
         }
         displayItems(sortp1);
  }

  //LOGIN
let loginDisplay = localStorage.getItem("loginDisplay") || null;
console.log(loginDisplay);
if (loginDisplay !== null) {
    document.getElementById("modallogin").innerHTML = loginDisplay;
}

//BASKET
let countItem = localStorage.getItem("countItem") || 0;
document.getElementById("basketCount").innerText = countItem;

}