"use strict";

// item add

function addItem(name, id, price) {
  const item = localStorage.getItem("posItemData");
  const itemData = JSON.parse(item);

  if (itemData.length === 0) {
    window.localStorage.setItem(
      "posItemData",
      JSON.stringify([
        {
          name: name,
          id: id,
          price: price,
          qt: 1,
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
        window.localStorage.setItem("posItemData", newItem);
        showItem();
        return;
      } else {
        window.localStorage.setItem(
          "posItemData",
          JSON.stringify([
            {
              name: name,
              id: id,
              price: price,
              qt: 1,
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
  const item = localStorage.getItem("posItemData");
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
          <td>${element.price * element.qt}$</td>
        </tr>
        `;
  }

  document.getElementById("item-list").innerHTML = html;
  grandTotal();
}
showItem();

// reset data

function resetData() {
  localStorage.setItem("posItemData", JSON.stringify([]));
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
}

function updateQt(id, qt) {
  const item = localStorage.getItem("posItemData");
  const itemData = JSON.parse(item);

  for (let i = 0; i < itemData.length; i++) {
    const element = itemData[i];
    if (element.id === Number(id)) {
      element.qt = qt;
    }
  }
  localStorage.setItem("posItemData", JSON.stringify(itemData));
  showItem();
  grandTotal();
}

// grand Total

function grandTotal() {
  const item = localStorage.getItem("posItemData");
  const itemData = JSON.parse(item);

  let total = 0;
  for (let i = 0; i < itemData.length; i++) {
    const element = itemData[i];
    total += element.price * element.qt;
  }
  document.getElementById("grand-total").innerHTML = total;
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
