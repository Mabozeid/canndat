"use strict"

// Start Setting Variables // 

var  megaOutput = document.getElementById("mega-converted"),
  gigaOutput = document.getElementById("giga-converted"),
  numbersArabic = document.getElementById("convert-numbers"),
  numbersConvert = document.getElementById("numbers-converted"),
  p = document.querySelectorAll(".item-msg"),
  bssQuota = document.getElementById("bssQuota"),
  unusedBSSQuota = document.getElementById("unusedBSS"),
  remainingMega = document.getElementById("remaining"),
  consumedMega = document.getElementById("consumed"),
  copied = document.querySelectorAll(".coopy"),
  seacrhBtn = document.getElementById("search"),
  balance = document.getElementById("net-balance"),
  totalCharge = document.getElementById("total-charge"),
  billTaxes = document.getElementById("addBillTaxes"),
  billAmount = document.getElementById("totalBill"),
  mintues = document.getElementById("mintues"),
 addBlog = document.querySelector(".addBlog"),
 headInfo = document.querySelector("#headInfo"),
 cannedInfo = document.querySelector("#cannedInfo"), 
 CannedContainer = document.querySelector(".msg-container");
 

// End   Setting Variables // 

 

// Start Change Arabic Numbers to English Numbers // 

var persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
],
arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str) {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
    }
  }
  return str
};

$('#convert-numbers').on("keyup keypress blur change paste copy", function(e) {
  var nums = this.value
  numbersConvert.textContent = fixNumbers(nums)   
});

//  End Change Arabic Numbers to English Numbers  // 



// Start Convert Bytes to mega and Giga   // 
$('#conver-to-mega').on("keyup keypress blur change paste copy ", function(e) {
var result = this.value / 1024 / 1024
megaOutput.textContent = result.toFixed(2) + " Mega"
gigaOutput.textContent = (result / 1024).toFixed(2) + " Giga"
});
// End  Convert Bytes to mega and Giga   // 

// Start Convert  Second to mintues  // 
$("#conver-min").on("keyup keypress blur change paste copy ", function(e) {
  var amount = this.value
  mintues.textContent = (amount / 60).toFixed(2);
  });
  // End Convert  Second to mintues  // 

// Start Count usage   // 
$('#unusedBSS, #bssQuota').on("keyup keypress blur change paste copy ", function(e) { 
  var remain = this.value 
 var quota =  $('#bssQuota').val();
 console.log(quota)
 remainingMega.textContent = (+remain/ 1024 / 1024).toFixed(2) + " Remaining MB"
 consumedMega.textContent = (quota / 1024 / 1024)- (remain /1024 /1024).toFixed(2) + " consumed MB"
  });

  $('#flexCheckDefault').on('change', function(){ 
    var remain =  $('#unusedBSS').val();
    var quota =  $('#bssQuota').val();
    if(this.checked) 
    {
      remainingMega.textContent = (+remain/ 1024 / 1024/ 1024).toFixed(2) + " Remaining GB"
      consumedMega.textContent = (quota / 1024 / 1024 /1024)- (remain /1024 /1024 /1024).toFixed(2) + " consumed GB"
     }
     else{
      remainingMega.textContent = (+remain/ 1024 / 1024).toFixed(2) + " Remaining MB"
      consumedMega.textContent = (quota / 1024 / 1024)- (remain /1024 /1024).toFixed(2) + " consumed MB"
     }
 })
  // End  Count usage   // 
  
// Start remove  taxes  // 
$('#remove-taxes').on("keyup keypress blur change paste copy ", function(e) {
var recharge = this.value
balance.textContent = (recharge / 100 * 70).toFixed(2);
});
// End  remove  taxes  // 

// Start Add  taxes  // 
$('#add-taxes').on("keyup keypress blur change paste copy ", function(e) {
var amount = this.value
totalCharge.textContent = (amount / (1 - 30 / 100)).toFixed(2);
});
// end Add  taxes  // 


// Start Add bill taxes  // 
$('#addBillTaxes').on("keyup keypress blur change paste copy ", function(e) {
  var serviceAmount = this.value
  var taxBasic = +serviceAmount + 10.67;
  billAmount.textContent =  ( taxBasic + (taxBasic * 23.12 / 100)).toFixed(2);
  });
  // end Add bill taxes // 



//  set array  of message 

let arrayOfMsg
console.log('Start',localStorage.crudCanned);
if (localStorage.crudCanned != null) {
  console.log('TWO',localStorage.crudCanned);
  arrayOfMsg = JSON.parse(localStorage.crudCanned)
} else {
  console.log('else',localStorage.crudCanned);
  arrayOfMsg = [{}];
}
addMsgToPageFrom(arrayOfMsg);
// Start add text to page //
 $("#staticBackdrop").on("click", function(e)
 {
  addBlog.textContent = "add";
 }
 )


$(".addBlog").on("click", function(e) {
  if (cannedInfo.value &&	headInfo.value !="") {
    addMsgToArray();
      headInfo.value ="";
      cannedInfo.value ="";
  }
  else {
    alert("Message cannot be Empty")
  }
});

// push values into array //

function addMsgToArray() {
   arrayOfMsg.push({
    head: headInfo.value,
    canned: cannedInfo.value,
   });
   localStorage.setItem("crudCanned", JSON.stringify(arrayOfMsg));
  addMsgToPageFrom(arrayOfMsg);
}


// loop all canned in page

function addMsgToPageFrom(arrayOfMsg) {
  CannedContainer.innerHTML = "";
  arrayOfMsg.map((x,index) => {
  CannedContainer.innerHTML += `
  <div class="col-md-4 col-xs-12">
  <div class= "item-msg">
  <label>${x.head}</label>
  <p class="p">${x.canned}</p>
  <button class="coopy">copy  <i class="far fa-copy"></i> </button>
  <span class="updateCanned" > <i onClick="editData(${index})" class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
  </span>
  <span class="DeleteCanned"><i onClick="deleteData(${index} )" class="fas fa-trash-alt delete"></i></span>
  </span>
</div>
<div>
  `;

  })
}


function deleteData(index){
  arrayOfMsg.splice(index,1);
  localStorage.crudCanned = JSON.stringify(arrayOfMsg)
  console.log('Delete',index);
  addMsgToPageFrom(arrayOfMsg);
}



// update funcation 

function editData(index) {
  headInfo.value = arrayOfMsg[index].head;
  cannedInfo.value = arrayOfMsg[index].canned;
addBlog.textContent = "Update";
  deleteData(index)
  console.log(index)
}

console.log(arrayOfMsg);

// start  Search Button // 


seacrhBtn.addEventListener("keyup", function(e) {
  let search = e.target.value.toLowerCase();
  p = document.querySelectorAll(".item-msg");
  if (search !=="") {
    for (let i = 0; i < p.length; i++) { 
      if (!p[i].innerHTML.toLowerCase().includes(search)) {
          p[i].style.display="none";
      }
   }
  } 
  else {
    p.forEach(p =>
    p.style.display = ""
      );                
}
});

console.log(copied)

// seacrhBtn.onkeyup = function () {
//   let search = this.value.toLowerCase()
//   if (search !=="") {
//     for (let i = 0; i < p.length; i++) { 
//       if (!p[i].innerHTML.toLowerCase().includes(search)) {
//           p[i].style.display="none";
//           console.log(p[i])
//       }
//    }
//   } 
//   else {
//     p.forEach(p =>
//     p.style.display = ""
//       );                
// }
// };

// Start Copy to Clipboard Button // 


$(".coopy").on("click", function(e) {
  var textWanted = $(this).siblings("p").text()
  navigator.clipboard.writeText(textWanted) 
  console.log("test",textWanted)
});


// End Copy to Clipboard Button //