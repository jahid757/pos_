"use strict";
// sell
// item add

const storage = localStorage.getItem("posItemDataSell");
if (storage === null) {
  localStorage.setItem("posItemDataSell", JSON.stringify([]));
}

function addItem(name, id, price) {
  const item = localStorage.getItem("posItemDataSell");
  const itemData = JSON.parse(item);

  if (itemData.length === 0) {
    window.localStorage.setItem(
      "posItemDataSell",
      JSON.stringify([
        {
          name: name,
          id: id,
          price: price,
          qt:  1,
        },
      ])
    );
    showItem();
  } else {
    for (let i = 0; i < itemData.length; i++) {
      const element = itemData[i];
      if (element.id === Number(id)) {
        element.qt += 1;
        const newItem = JSON.stringify(itemData);
        window.localStorage.setItem("posItemDataSell", newItem);
        showItem();
        return;
      } else {
        window.localStorage.setItem(
          "posItemDataSell",
          JSON.stringify([
            {
              name: name,
              id: id,
              price: price,
              qt:  1,
            },
            ...JSON.parse(item),
          ])
        );
        showItem();
        return;
      }
    }
  }
}

// show item

function showItem() {
  const item = localStorage.getItem("posItemDataSell");
  const itemData = JSON.parse(item);

  let html = "";
  for (let i = 0; i < itemData.length; i++) {
    const element = itemData[i];

    html += `
        <tr>
            <td>${element.name}</td>
              <td>${element.price}$</td>
                <td>
                <div class="quantity">
                <div role="group" class="input-group">
                <div class="input-group-prepend">
                <span onclick="minus('item${
                  element.id
                }')" class="btn btn-primary btn-sm">-</span>
                </div> 
                <input id="item${
                  element.id
                }" class="qt_input text-center" value="${element.qt}"> 
                <div class="input-group-append">
                <span onclick="plus('item${
                  element.id
                }')"  class="btn btn-primary btn-sm">+</span>
                </div>
             </div>
            </div>
            </td>
          <td>${(element.price * element.qt).toFixed(2)}$</td>
        </tr>
        `;
  }

  document.getElementById("item-list").innerHTML = html;
  grandTotal();
}
showItem();

// reset data

function resetData() {
  localStorage.setItem("posItemDataSell", JSON.stringify([]));
  showItem();
  grandTotal();
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
  const item = localStorage.getItem("posItemDataSell");
  const itemData = JSON.parse(item);

  for (let i = 0; i < itemData.length; i++) {
    const element = itemData[i];
    if (element.id === Number(id)) {
      element.qt = qt;
    }
  }
  localStorage.setItem("posItemDataSell", JSON.stringify(itemData));
  showItem();
  grandTotal();
}

// grand Total

function grandTotal() {
  const item = localStorage.getItem("posItemDataSell");
  const itemData = JSON.parse(item);

  let total = 0;
  for (let i = 0; i < itemData.length; i++) {
    const element = itemData[i];
    total += element.price * element.qt;
  }
  document.getElementById("grand-total").innerHTML = total;
  document.getElementById("subTotal").value = total;
}
grandTotal();

function popUp(ind) {
  const modal = document.getElementById("modal");
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
  if(paid == 0){
    document.getElementById("change").value = `Pay Now`;
  }else{
    document.getElementById("change").value = `${change} Change`;
  }
}
paidAmount();

// display resolution
function displayResolution(width,height) {
  window.innerHeight = height;
  window.innerWidth = width;
}
// open select option

function openOption(id) {
  const option = document.getElementById(id);
  option.classList.toggle("active");
}

