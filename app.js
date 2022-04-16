"use strict";
// purchase
// item add

const storage = localStorage.getItem("posItemDataPurchase");
const batchStorage = localStorage.getItem("batchStorage");
if (storage === null && batchStorage === null) {
  localStorage.setItem("posItemDataPurchase", JSON.stringify([]));
  localStorage.setItem("batchStorage", JSON.stringify([]));
}

// show item

function showItem() {
  const item = localStorage.getItem("posItemDataPurchase");
  const itemData = JSON.parse(item);

  let html = "";
  for (let i = 0; i < itemData.length; i++) {
    const element = itemData[i];

    html += `
        <tr>
            <td>${element.batchId}</td>
              <td>${element.qty}</td>
              <td>${element.totalPrice}</td>
              <td>${element.fee}</td>
              <td>${element.price}</td>
              <td>${element.basic}</td>
              <td>${element.dis}</td>
              <td>${element.tax}</td>
              <td>${element.amount}</td>
        </tr>
        `;
  }

  document.getElementById("item-list").innerHTML = html;
  grandTotal();
}
showItem();

// reset data

function resetData() {
  localStorage.setItem("posItemDataPurchase", JSON.stringify([]));
  showItem();
  grandTotal();
  alertMessage();
  popUp(false, "clear_data_warning");
}

// item qt update

function minus(id) {
  const qt = document.querySelector(`#${id}`).value;
  if (qt > 1) {
    const value = (document.querySelector(`#${id}`).value = qt - 1);

    const qtId = id.replace("item", "");
    updateQt(qtId, value);
  }
}

function plus(id) {
  const qt = document.querySelector(`#${id}`).value;
  const value = (document.querySelector(`#${id}`).value = parseInt(qt) + 1);
  const qtId = id.replace("item", "");
  updateQt(qtId, value);
  console.log(qtId, value);
}

function updateQt(id, qt) {
  const item = localStorage.getItem("posItemDataPurchase");
  const itemData = JSON.parse(item);

  for (let i = 0; i < itemData.length; i++) {
    const element = itemData[i];
    if (element.id === Number(id)) {
      element.qt = qt;
    }
  }
  localStorage.setItem("posItemDataPurchase", JSON.stringify(itemData));
  showItem();
  grandTotal();
}

// grand Total

function grandTotal() {
  const item = localStorage.getItem("posItemDataPurchase");
  const itemData = JSON.parse(item);

  let total = 0;
  for (let i = 0; i < itemData.length; i++) {
    const element = itemData[i];
    total += element.totalPrice * element.qty;
  }
  document.getElementById("grand-total").innerHTML = total;
  document.getElementById("subTotal").value = total;
}
grandTotal();

function popUp(ind, id) {
  const modal = document.getElementById(id);
  if (ind === true) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

// fixed amount controls

function fixedAmount(price) {
  const input = document.getElementById("paid");
  input.value = "";
  input.value = price;
  paidAmount();
}

// fixed menu controls
function fixedMenu(id, id2) {
  if (id !== "") {
    const menu = document.getElementById(id);
    menu.classList.add("fixed-menu");
  } else if (id2 !== "") {
    const menu2 = document.getElementById(id2);
    menu2.classList.remove("fixed-menu");
  }
}

// paid amount
function paidAmount() {
  const total = document.getElementById("subTotal").value;
  const paid = document.getElementById("paid").value;
  const change = paid - total;
  if (paid == 0) {
    document.getElementById("change").value = `Pay Now`;
  } else {
    document.getElementById("change").value = `${change} Change`;
  }
}
paidAmount();

// display resolution
function displayResolution(width, height) {
  window.innerHeight = height;
  window.innerWidth = width;
}
// open select option

function openOption(id, id2) {
  const option = document.getElementById(id);
  const option2 = document.getElementById(id2);
  option.classList.toggle("active");
  if (id2 !== "") {
    option2.classList.remove("active");
  }
}

// open purchase popup

// added to json

function addToJson() {
  const batchId = inputValue("batch");
  const qty = inputValue("qyt");
  const totalPrice = inputValue("tPrice");
  const fee = inputValue("free");
  const price = inputValue("price");
  const basic = inputValue("basic");
  const dis = inputValue("discount");
  const tax = inputValue("tax");
  const amount = inputValue("amount");

  const item = localStorage.getItem("posItemDataPurchase");
  const itemData = JSON.parse(item);
  if (itemData.length === 0) {
    window.localStorage.setItem(
      "posItemDataPurchase",
      JSON.stringify([
        {
          batchId: batchId,
          qty: qty,
          totalPrice: totalPrice,
          fee: fee,
          price: price,
          basic: basic,
          dis: dis,
          tax: tax,
          amount: amount,
        },
      ])
    );
  } else {
    window.localStorage.setItem(
      "posItemDataPurchase",
      JSON.stringify([
        {
          batchId: batchId,
          qty: qty,
          totalPrice: totalPrice,
          fee: fee,
          price: price,
          basic: basic,
          dis: dis,
          tax: tax,
          amount: amount,
        },
        ...itemData,
      ])
    );
  }
  showItem();
  popUp(false, "modal2");
  alertMessage();
}

const inputValue = (id) => {
  const input = document.getElementById(id);
  return input.value;
};

//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);

//function to handle keyboard inputs
function keyboardInputHandler(e) {
  //grabbing the liveScreen
  let res = document.getElementById("result");

  //numbers
  if (e.key === "0") {
    res.value += "0";
  } else if (e.key === "1") {
    res.value += "1";
  } else if (e.key === "2") {
    res.value += "2";
  } else if (e.key === "3") {
    res.value += "3";
  } else if (e.key === "4") {
    res.value += "4";
  } else if (e.key === "5") {
    res.value += "5";
  } else if (e.key === "6") {
    res.value += "6";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "8") {
    res.value += "8";
  } else if (e.key === "9") {
    res.value += "9";
  }

  //operators
  if (e.key === "+") {
    res.value += "+";
  } else if (e.key === "-") {
    res.value += "-";
  } else if (e.key === "*") {
    res.value += "*";
  } else if (e.key === "/") {
    res.value += "/";
  }

  //decimal key
  if (e.key === ".") {
    res.value += ".";
  }

  //press enter to see result
  if (e.key === "Enter") {
    res.value = eval(result.value || null);
  }

  //backspace for removing the last input
  if (e.key === "Backspace") {
    let resultInput = res.value;

    //remove the last element in the string
    res.value = resultInput.substring(0, res.value.length - 1);
  }
}

// Clears the screen on click of C button.
function clearScreen() {
  document.getElementById("result").value = "";
}
// Displays entered value on screen.
function liveScreen(value) {
  let res = document.getElementById("result");
  if (!res.value) {
    res.value = "";
  }
  res.value += value;
}

// alert message

function alertMessage() {
  const alert = document.getElementById("alert");
  alert.classList.add("active");

  setTimeout(() => {
    alert.classList.remove("active");
  }, 3000);
}

// add new batch
function newBatchId() {
  const batch = inputValue("batch");
  const discount = inputValue("batchDiscount");
  const mrp = inputValue("mrp");
  const retail = inputValue("retail");
  const menuFactureDate = inputValue("manufactureDate");
  const expiryDate = inputValue("expiryDate");

  const item = localStorage.getItem("batchStorage");
  const itemData = JSON.parse(item);
  if (itemData.length === 0) {
    window.localStorage.setItem(
      "batchStorage",
      JSON.stringify([
        {
          batch: batch,
          discount: discount,
          mrp: mrp,
          retail: retail,
          menuFactureDate: menuFactureDate,
          expiryDate: expiryDate,
        },
      ])
    );
  } else {
    window.localStorage.setItem(
      "batchStorage",
      JSON.stringify([
        {
          batch: batch,
          discount: discount,
          mrp: mrp,
          retail: retail,
          menuFactureDate: menuFactureDate,
          expiryDate: expiryDate,
        },
        ...itemData,
      ])
    );
  }
}

function clearCache() {
  alertMessage();
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

// select option

document.getElementById("item_value").addEventListener("click", (e) => {
  const value = e.target.textContent;
  document.getElementById("select_value").innerText = value;
});
document.getElementById("item_value2").addEventListener("click", (e) => {
  const value = e.target.textContent;
  document.getElementById("select_value2").innerText = value;
});

document.getElementById("item_value3").addEventListener("click", (e) => {
  const value = e.target.textContent;
  document.getElementById("select_value3").innerText = value;
});

document.getElementById("item_value4").addEventListener("click", (e) => {
  const value = e.target.textContent;
  document.getElementById("select_value4").innerText = value;
});
