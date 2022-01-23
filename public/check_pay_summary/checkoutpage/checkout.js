// var dellocal =JSON.parse ( localStorage.getItem("Delivery"));
// var billlocal =JSON.parse ( localStorage.getItem("Billing"));
 var userid_cartpage = "61ea74acf936c55301d7c7b5"
  async function getData () {
   
         let response = await fetch(`/address/${userid_cartpage}`);
         // console.log(response)
         let result = await response.json();
         // console.log(result)

         if(result.success){
            display(result.address) 
                   
         }else{
            display([{"delivery_ads": null,
            "billing_ads": null}])     
         }
         
         return  ;
      
       
   }
 getData();
function display(data){

   // if(data == null){
   //    console.log("right")
   // }
  

let changeptag = document.getElementById("addchange")
const balckbox = document.getElementById("blackdiv");
let deliverydiv = document.getElementById("emergediv");
const dellocal = data.delivery_ads || null;
const billlocal =data.billing_ads || null;
let advertizediv = document.createElement("div");
let outblock = document.getElementById("extradivbillblock");
const checkFlag =JSON.parse( localStorage.getItem("checkoutFlag"));

if(dellocal == null){
   localStorage.setItem("Del_status", JSON.stringify( null));
}

if(billlocal !== null){

   displayboxes(billlocal);
   document.getElementById("dummybillnulldiv").style.display = "none";
   document.getElementById("billinglabel").innerText = "Send to the billing address";
}
localStorage.setItem("checkoutFlag", JSON.stringify(true));

// this is checkbox  function------------->
 let popup  = (e) => { 
     console.log("here in  pop")
    if(e.target.checked){
     
        changeptag.innerText = "DELIVERY ADDRESS";
        deliverydiv.innerHTML = null;
         console.log("herer at checked")
         
        if(billlocal !== null){
              
         displayboxes(billlocal);
         console.log(billlocal)
           document.getElementById("dummybillnulldiv").style.display = "none";
        }

        localStorage.setItem("checkoutFlag", JSON.stringify(true));
    }else{

      localStorage.setItem("checkoutFlag", JSON.stringify(false));

        changeptag.innerText = "BILLING ADDRESS";
       
        
     deliverydiv.innerHTML = null;

     
    let ptag = document.createElement("p");
    ptag.innerText = "DELIVERY ADDRESS";
    ptag.setAttribute("class", "highlight extras")

    let newadd = document.createElement("button");
    newadd.innerText = "NEW ADDRESS";
    newadd.setAttribute("class", "newaddbtn")

     deliverydiv.append(ptag, newadd)

     //function for changing advertizetag
     console.log(dellocal)
     if(dellocal == null){
         
        
      
      advertizediv.innerText = "Please add a delivery address";
      advertizediv.setAttribute("class", "pinkadv")
      deliverydiv.append( advertizediv);

       }else{
          
         displayboxes(dellocal);
       }

     newadd.addEventListener("click", () => {
           
        balckbox.style.pointerEvents ="auto";
           balckbox.style.opacity = "1";
          
     });
    }



    
 }

 
  document.getElementById("billing").addEventListener("change", popup);

//   if(!checkFlag){
//    document.getElementById("billing").checked = false;
//    popup( );
// }
 
//close function ------------------->
 let close = ( ) => {
    
    
    balckbox.style.opacity = "0";
           balckbox.style.pointerEvents ="none";
           console.log("close it")
    
 }


 document.getElementById("crossbtn").addEventListener("click", close);

 //function for adding address to local storage; (ACCEPT BUTTON)

 let store  = () => {

    let deladdress = {

      Name: document.getElementById("delName").value,
      SurName : document.getElementById("delsurname").value,
      Address : document.getElementById("deladd").value,
      Doorno :  document.getElementById("deldoor").value,
      City : document.getElementById("delcity").value,
      Telephone : document.getElementById("deltele").value,
      Type : "Delivery",

    }
    var model_ads = {
      delivery_ads: deladdress,
      user_id: `${userid_cartpage}`
   };

     if(billlocal == null){

      async function posting () {
     
         let response = await fetch("/address", {
    
             method: "POST",
             headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(model_ads)
           });
    
           console.log(await response.json());
         }
         posting();
       localStorage.setItem("Del_status", JSON.stringify( "POSTED"));
     }else{
     

       model_ads = {
         delivery_ads: deladdress,
         
      };
      async function patching () {
     
         let response = await fetch(`/address/del/${userid_cartpage}`, {
    
             method: "PATCH",
             headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(model_ads)
           });
           
           console.log(await response.json());
           localStorage.setItem("Del_status", JSON.stringify( "PATCHED"));
         }
         patching();
         
     }
    

   
    

   //  localStorage.setItem("Delivery", JSON.stringify( deladdress));
    close();
    advertizediv.style.display = "none";
  
    displayboxes(deladdress);

 }
 document.getElementById("popacceptbtn").addEventListener("click", store);
//-------------------------------------------------------------------------------->
 let storebill  = () => {

   let name = document.getElementById("billName").value;
   let surname = document.getElementById("billsurname").value;
   let add = document.getElementById("billadd").value;
   let city = document.getElementById("billcity").value;
   let tele = document.getElementById("billtele").value;
   let door = document.getElementById("billdoor").value;

 
   if(billlocal == null){

 if(name == "" || surname == "" || add == "" || city == "" || tele == ""){

      alert("Please Fill the required fields(*)");
      return ;
   }

   }else{

      window.location.href = "/paymentpage";
   }
  

   let billaddress = {

     Name: name,
     SurName : surname,
     Address : add,
     Doorno :  door,
     City :  city,
     Telephone : tele,
     Type : "Billing",
   }
 console.log("herei n 216")
  
     let del_status = JSON.parse( localStorage.getItem("Del_status"));
            
     if(del_status == "POSTED"){

      const bil_request = async () => {
         const model_bil = {

            "billing_ads" : billaddress,
            
         }

         let bil_response =  await  fetch(`/address/bil/${userid_cartpage}`, {
              method: "PATCH",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(model_bil)
           })
     
           const result_bil = await  bil_response.json() 
            console.log(result_bil)
           window.location.href = "/paymentpage";
        }
       bil_request();

     }else{
      const request = async () => {

         const model_bil = {

            "billing_ads" : billaddress,
            "user_id" : `${userid_cartpage}`
         }
         let response =  await  fetch("/address", {
              method: "POST",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(model_bil)
           })
     
           const result_bil = await  response.json() 
            console.log(result_bil)
           window.location.href = "/paymentpage";
        }
       request();
     }
   
   // localStorage.setItem("Billing", JSON.stringify( billaddress));

   
}
const testbtn = document.getElementById("addcontbtn");

console.log(billlocal, "in here in 240")
if(billlocal == null){

    testbtn.addEventListener("click", storebill);
}else{
   
   testbtn.addEventListener("click", () => {

      window.location.href = "/paymentpage";
   });
   

}

    

    

//<--------------------continue button top ------------------>

     function displayboxes (data) {
 console.log("hererearasfaf")
         let divv = document.createElement("div");
          divv.setAttribute("class", "newdelblock");

        let ptag1 = document.createElement("p");
        ptag1.innerText = data.Name + " " + data.SurName;

        let ptag2 = document.createElement("p");
        ptag2.innerText = data.Doorno;

        let ptag3 = document.createElement("p");
        ptag3.innerText = data.Address;

        let ptag4 = document.createElement("p");
        ptag4.innerText = data.City;

        let ptag5 = document.createElement("p");
        ptag5.innerText = data.Telephone;
         
        divv.append(ptag1, ptag2, ptag3,ptag4, ptag5)
        if(data.Type == "Delivery"){

            deliverydiv.append(divv)
        }else{
             
        
            outblock.innerHTML = null;
            outblock.append(divv);
        }

        console.log(divv)
     }


     //function of displacing prices in pricediv ------- from local storage ----->
   

     let totalprice = JSON.parse( localStorage.getItem("Total") );
     document.getElementById("totallocal").innerText = totalprice + " €";
     totalprice = +totalprice;
     totalprice += 45 + 56.43;
     totalprice = totalprice.toFixed(2);
     localStorage.setItem("Totalchekout", totalprice);
     document.getElementById("oritotal").innerText = totalprice + " €";

     let countedItems =JSON.parse( localStorage.getItem("countItem"));
    document.getElementById("NumItems").innerHTML = countedItems + " " + "ITEMS";


     // <-----------------Radio Buttons----------->

     let individual = document.getElementById("indivi");
     let company = document.getElementById("company");
     let inppur = document.getElementById("changein");
     let vatin = document.getElementById("vatin");
 
     individual.addEventListener("click", OnOff);
     company.addEventListener("click", OffOn);

    function OnOff( ) {

      if(individual.checked){
         company.checked = false;
      }
       inppur.placeholder = "Tax ID number";
       vatin.style.display = "none";
    } 

    function OffOn (){
         
      if(company.checked){
         individual.checked = false;
      }
      inppur.placeholder = "Company Name";
      vatin.style.display = "block";
    }

  
   }



   
   