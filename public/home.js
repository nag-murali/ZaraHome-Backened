

let home_content = document.querySelector("#home_content");
home_content.addEventListener("click", function () {
    window.location.href = "/story_page";
})











// lllllllllllllllllllllllllllllllllllllllllllllllllllllll

// sign in part

let modallogin = document.getElementById("modallogin")

let closebtn = document.getElementById("closingbtna")

let modalbox = document.getElementById("modalbox")


modallogin.addEventListener("click", openmodal)

closebtn.addEventListener("click", closemodal)

window.addEventListener("click", outsideclick)


function openmodal() {
    if(modallogin.textContent=="LOG IN"){
        modalbox.style.display = "block"   
    }else{
        modalbox.style.display = "none"
    }

}

function closemodal() {

    modalbox.style.display = "none"
}
function outsideclick(e) {
    if (e.target == modalbox) {
        modalbox.style.display = "none"
    }
}

// signup part--------------------------------------

let newaccountbtn = document.getElementById("newaccountbtn")

let closebtn1 = document.getElementById("closingbtn1")

let modalbox1 = document.getElementById("modalbox1")





newaccountbtn.addEventListener("click", openmodal1)

closebtn1.addEventListener("click", closemodal1)
window.addEventListener("click", outsideclick1)


function openmodal1() {

    modalbox1.style.display = "block";
    modalbox.style.display = "none";

}
function closemodal1() {

    modalbox1.style.display = "none";
    modalbox.style.display = "block";
}

function outsideclick1(e) {
    if (e.target == modalbox1) {
        modalbox1.style.display = "none"
    }
}


//  company modal-------------------------------------------------------
let closebtn2 = document.getElementById("closingbtn2")
let modalbox2 = document.getElementById("modalbox2")

// radiobuuttons
let radiobutton = document.querySelectorAll("input[name='gp1']");
console.log(radiobutton)
let findselected = () => {
    let selectedradio = document.querySelector("input[name='gp1']:checked").value;
    console.log(selectedradio)

    if (selectedradio == "com") {
        modalbox1.style.display = "none";
        modalbox2.style.display = "block";

    } else if (selectedradio == "ind") {
        modalbox2.style.display = "none";
        modalbox1.style.display = "block";
    }
}


radiobutton.forEach(radiobtn => {
    radiobtn.addEventListener("change", findselected)
})



closebtn2.addEventListener("click", closemodal2)
window.addEventListener("click", outsideclick2)


function closemodal2() {

    modalbox2.style.display = "none";
    // modalbox.style.display="block";
}
function outsideclick2(e) {
    if (e.target == modalbox1) {
        modalbox1.style.display = "none"
    }
}



// backend++++++++++++++++++++++++++++++++++++++++++++++++++++++

let createaccount = document.getElementById("createaccount");
createaccount.addEventListener("click", Register);

let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", Login);

async function Register(){

 let signup_data={
    
    name:document.getElementById("signname").value,
    email:document.getElementById("signemail").value,
    password:document.getElementById("signpassword").value,

    };
    
     signup_data=JSON.stringify(signup_data);
    
    // console.log("signup_data",signup_data);
    
    
    let register_api=`/home/reg`
    
    
    
    
    let response=await fetch(register_api,{
    
    method:"POST",
    
    body:signup_data,
    
    headers: {
    "Content-Type":"application/json"
    },
    
    
    
    });
    
    
   
    let data =await response.json();
    console.log("data", data)
    alert(data.message);
    modalbox1.style.display = "none";
    // if(data.error==true){
    //     alert(data.message)
    // }else{
    //   alert("data.message")
    // window.location.href="/users/login"
    // }
    
    }
    async function Login(){

    
        let login_data={
            email:document.getElementById("inputemail").value,
            password:document.getElementById("inputpass").value,
        
        
        };
        
        login_data=JSON.stringify(login_data)
        
        // console.log(login_data)
        
        let login_api=`/home/log`
        
        let response=await fetch(login_api,{
        
            method:"POST",
        
            body:login_data,
        
            headers: {
        
                "Content-Type":"application/json"
            },
        
        });
        
        
   
        let data=await response.json();
        console.log("data",data);
     
        alert(data.message);
        
         modallogin.innerHTML=data.user.name;
         
         modalbox.style.display = "none";
         let toke=data.token;
         let username =  data.user.name;
         let userId = data.user._id;
         localStorage.setItem("token", JSON.stringify(toke))
         localStorage.setItem("userId", JSON.stringify(userId));
         localStorage.setItem("username", JSON.stringify(username));
        
        
        // alert("sign in sucess")
        }
// backend end---------------------------------------------------------


