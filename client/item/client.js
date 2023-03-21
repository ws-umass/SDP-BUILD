const itemButtonBox = document.getElementById("itemButtonBox");
const itemNameBox = document.getElementById("itemNameBox");
const itemA = document.getElementById("itemA");

const itemName = itemNameBox.innerText;

async function highlight(name) {
   try {
      // const response = new XMLHttpRequest();
      // response.open("GET", `https://testpage-1.ciscosong.cloud/v0.1/highlight/access_id:${itemName},bins:\[00ffaa11\]`, true);
      // response.onload = () => {console.log(response.responseText)}
      // request.send();
      // const headerFields = { "Content-Type": "application/json" };
      const response = await fetch(`https://testpage-1.ciscosong.cloud/v0.1/highlight/access_id:${name},bins:\[00ffaa11\]`);
      const data = await response.json();
      return data;
   }
   catch (error) {
      console.log(error);
   }
}

function renderTurnOnButton() {
   itemButtonBox.innerHTML = '';
   let html = `
      <div id="turnOnButton">Turn On</div>
   `;
   itemButtonBox.innerHTML = html;

   const turnOnButton = document.getElementById("turnOnButton");
   turnOnButton.addEventListener("click",
      () => {
         renderTurnOffButton();
         let response = highlight(itemName);
         console.log(response);
      }
   );
}

function renderTurnOffButton() {
   itemButtonBox.innerHTML = '';
   let html = `
      <div id="turnOffButton">Turn Off</div>
   `;
   itemButtonBox.innerHTML = html;

   const turnOffButton = document.getElementById("turnOffButton");
   turnOffButton.addEventListener("click",
      () => {
         renderTurnOnButton();
         // wait for turn off api
      }
   );
}

renderTurnOnButton();