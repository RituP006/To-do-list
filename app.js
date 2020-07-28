//get variables
const input = document.querySelector(".input-text");
const ul = document.querySelector(".list-content");
const clear = document.querySelector(".clear");

// ----------------------toggle-------------------
let darkmode = localStorage.getItem("darkmode");
// let checkstatus = localStorage.getItem("checkbox");
console.log("after refresh", darkmode);
const darkmodetoggle = document.querySelector(".checkbox");

// set darkmode
const enabledarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("checkbox", "checked");
  localStorage.setItem("darkmode", "enabled");
};

// off darkmode
const disabledarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("checkbox", "unchecked");
  localStorage.setItem("darkmode", "disable");
};

// // check checkbox
// if (checkstatus == "checked") {
//   darkmodetoggle.checked = true;
//   document.querySelector(".ball").classList.add(".ball1");
// } else {
//   document.querySelector(".ball").classList.remove(".ball1");
//   darkmodetoggle.checked = false;
// }

if (darkmode === "enabled") {
  enabledarkmode();
}

darkmodetoggle.addEventListener("change", () => {
  // checkstatus = localStorage.getItem("checkbox");
  // if (checkstatus == "checked") {
  //   darkmodetoggle.checked = true;
  //   document.querySelector(".ball").classList.add(".ball1");
  // } else {
  //   darkmodetoggle.checked = false;
  // }
  darkmode = localStorage.getItem("darkmode");

  if (darkmode !== "enabled") {
    enabledarkmode();
  } else {
    disabledarkmode();
  }
});

// -----------------------------------------set date
const dateelement = document.getElementById("date");
let today = new Date();
let options = { weekday: "long", month: "short", day: "numeric" };
dateelement.innerHTML = today.toLocaleDateString("en-US", options);

loadeventlisteners();

function loadeventlisteners() {
  // get item from local storage
  document.addEventListener("DOMContentLoaded", gettask);

  // call todo function after enter key
  document.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
      const todo = input.value.trim();
      if (todo) {
        additem(e);
      }
    }
  });

  // call todo function
  document
    .querySelector(".input-field")
    .addEventListener("click", function (e) {
      if (e.target.className == "fa fa-plus") {
        additem();
      }
    });

  // delete list item
  ul.addEventListener("click", deletelistitem);

  // taskdone
  ul.addEventListener("click", function (e) {
    if (e.target.className == "far fa-circle") {
      taskdone(e);
    } else {
      if (e.target.className == "fas fa-check-circle") {
        undotask(e);
      }
    }
  });

  // clear button
  clear.addEventListener("click", cleartask);
}

// ---------------get task from local storage--------------
function gettask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create li
    const li = document.createElement("li");

    // add class name
    li.className = "list-decoration";

    // create a link for check circle
    const circle = document.createElement("a");

    circle.className = "checked";

    circle.innerHTML = "<i class='far fa-circle'></i>";

    li.appendChild(circle);

    // create atext node and append to li
    li.innerHTML += `<p>${task}</p>`;
    // li.appendChild(document.createTextNode(input.value));

    // create alink for delete
    const link = document.createElement("a");

    link.className = "delete-item";

    link.innerHTML = '<i class="far fa-trash-alt"></i>';

    li.appendChild(link);

    // attach li to ul
    // ul.appendChild(li);
    ul.insertAdjacentElement("afterbegin", li);
  });
}

//----------------------------------- add item function
function additem(e) {
  if (input.value == "") {
    alert("enter to-do item");
  }

  // create li
  const li = document.createElement("li");

  // add class name
  li.className = "list-decoration";

  // create a link for check circle
  const circle = document.createElement("a");

  circle.className = "checked";

  circle.innerHTML = "<i class='far fa-circle'></i>";

  li.appendChild(circle);

  // create atext node and append to li
  li.innerHTML += `<p>${input.value}</p>`;
  // li.appendChild(document.createTextNode(input.value));

  // create alink for delete
  const link = document.createElement("a");

  link.className = "delete-item";

  link.innerHTML = '<i class="far fa-trash-alt"></i>';

  li.appendChild(link);

  // attach li to ul
  if (input.value != "") {
    // ul.appendChild(li);
    ul.insertAdjacentElement("afterbegin", li);
  }

  // stire in local storage
  storetask(input.value);
  // clear input
  input.value = "";
}

// ---------------------------------dtore task in local storage
function storetask(item) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(item);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//----------------------------------- delete item function
function deletelistitem(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    // remove from local storage
    deletetaskfromls(e.target.parentElement.parentElement);
  }

  e.preventDefault();
}

// -------------------------------------delete from local storage
function deletetaskfromls(item) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    console.log(task);
    console.log(item.textContent);

    if (item.textContent === task) {
      console.log(tasks);
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// -------------taskdone function---------------

function taskdone(e) {
  if (e.target.parentElement.classList.contains("checked")) {
    e.target.parentElement.nextElementSibling.className = "strike-text";
    e.target.className = "fas fa-check-circle";
  }

  e.preventDefault();
}

// -------------undotask function-----------------------------------
function undotask(e) {
  if ((e.target.className = "fas fa-check-circle")) {
    e.target.className = "far fa-circle";

    e.target.parentElement.nextElementSibling.classList.remove("strike-text");
  }

  e.preventDefault();
}

// ------------------------clear task function-----------------

function cleartask() {
  if (confirm("Are you sure you want to clear all Task?")) {
    while (ul.firstChild) {
      ul.firstChild.remove();
    }
    clearfromls();
  }
}

// -------------------------------clear local storage---------
function clearfromls() {
  localStorage.clear();
}
