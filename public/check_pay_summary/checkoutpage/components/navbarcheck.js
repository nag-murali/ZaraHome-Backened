function navcheck() {

    return ` <header>
    <div id="mainnavcheck">
        <nav>
        <span id="zara">  <a href="/"><img src="https://static.zarahome.net/8/static4/itxwebstandard/logo/logo.png?t=202112110318092070005127" alt=""></a></span>
   
            <span id="basketcheck"> <a href="/cart_page"><p style="color:black"><i class="fas fa-shopping-bag"> &nbsp;</i>BASKET <span id= "basketnum">( )</span></p><a></span>
        </nav>
        <div id="linesdiv">
            <div class="highlight hrdiv" id ="deliverynavdiv"><p>1.DELIVERY</p><hr></div>
            <div class="hrdiv" id ="paymentnavdiv"><p>2.PAYMENT</p><hr></div>
            <div  class="hrdiv" id="summarynavdiv"><p>3.SUMMARY</p><hr></div>
        </div>

    </div>
</header>`;
}

// let cont = document.getElementById("ultimatenavcont");
// cont.innerHTML = navcheck();


// // let countedItems = JSON.parse(localStorage.getItem("countItem"));

// // document.getElementById("basketnum").innerText = `(${countedItems})`;



export default navcheck;