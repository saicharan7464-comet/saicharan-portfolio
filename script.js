/* Intro to JavaScript
1. Variables 
2. Function
3. Pops Ups
4. Conditional St.
5. Loops
6. Error Handling
7. Event Listeners
8. DOM

*/




// let name = "Farhath"; //hardcoding?



// let age = 27;

//alert("Welcome to my web app! "+ name);


// Function definition
// function add(a, b){
//   let num1 = a;
//   let num2 = b;
//   result = num1 + num2;
//   return result;
// }

//function def
// function greet(){
//   alert("This is a greet function pop up!");
// }

//function call
//greet();

// let answer = add (3,4);
// console.log(answer);

//Conditional statements

// if (condition1a and condition1b) {
//   // code will execute if the condition 1 is true
// }
// else if (condition2) {
//   // code will execute if the condition 2 is true
// }
// else {
//   //this code will execute if the condition is not true
// }
// grade = 42;
// if (grade>=90) {
//   alert("You got A grade");
// }
// else if (grade>=70) {
//   alert("You got B grade");
// }

// else if (grade>=50) {
//   alert("You got C grade");
// }
// else {
//   alert("You did not qualify");
// }

// for (let i=10; i>20; i=i+2){
//   console.log(i);
// }

// const control_of_toggle_btn = document.getElementById("toggle-theme");

// control_of_toggle_btn.addEventListener('click', function(){
//   console.log("toggle button was clicked!");
// }
// );

// document.addEventListener('keydown', function(event) {
//   console.log("Key Down event trigged with: " + event.key);
// }
// );

// window.addEventListener('scroll', function() {
//   console.log("Window was scolled");
// }
// );

// const control_of_contact_form = document.getElementById("contact-form");

// control_of_contact_form.addEventListener('submit', function() {
//   console.log("Contact Form was submitted");
// }
// );

//ERROR HANDLING

// function getUser(id){
//   const users = {
//     1: "Aisha",
//     3: "Farhath"
//   };
//   if (!users[id]) {
//     throw new Error(`No user found with the id${id}`);
//   }
//   return users[id];
// }

// function runBroken(){
//   console.log("Fetching user 1:" + getUser(1));
//   console.log("Fetching user 2:" + getUser(2));
//   console.log("Fetching user 3:" + getUser(3));
// }

// function runHandled(){
//   const ids = [1,2,3];

//   ids.forEach(id => {
//     try{
//       console.log("Fetching user" + id + getUser(id));
//     }
//     catch (error) {
//       console.log("Could not find user" + id + error.message + "\n");
//     }
//     finally {
//       console.log("Done trying user" + id);
//     }
//   });
//   console.log("Processing completed!");
// }


//Tasks for JavaScript

// 1. Make the toggle button work.
// 2. Make Admin login button work.
// 3. Make Contact me section capture user data and store in DB.
// 4. Make Admin login section work - check creds and show responses.
// 5. Fetch User messages from the DB.

// Task 2

const control_of_admin_btn = document.getElementById("admin-btn");
const control_of_admin_login_section = document.getElementById("admin-login");
const control_of_user_responses_section = document.getElementById("user-responses");

control_of_admin_btn.addEventListener('click', function(){
  control_of_admin_login_section.style.display = "block"; //from none to block.
}
);

//Task toggle button work

const control_of_toggle_btn = document.getElementById("toggle-theme");

control_of_toggle_btn.addEventListener('click', function(){
  document.body.classList.toggle("dark-theme");
});

const db_url = "https://script.google.com/macros/s/AKfycbxj4I6DfaXMVs_ZIfFn2F5a2vECikxw4npUknOfScUg5QmTHVMtR4yDVJeP4xuvrxmT/exec" //Our API


//Task 3 - Capture info from the contact me form.

const control_of_contact_form = document.getElementById("contact-form");

control_of_contact_form.addEventListener("submit", async function(event){
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let msg = document.getElementById("input-msg").value;
  //let date = new Date().toLocaleString();

try {
  let response = await fetch (
    db_url, 
    {
      method: "POST",
      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },
      body: JSON.stringify({ 
        action: "save_message",
        name: name,
        email: email,
        msg: msg
      })
        
    }
  );
  
  let result = await response.json();
  if (result.success) {
    alert("Message submitted, will get back to you shortly!");
  }
  else{
    alert("Message could not be saved!");
  }
}
  catch(error){
    console.error(error);
    alert("There was a problem submitting the message!");
  }
});

//Task - making the admin login section work
let control_of_admin_form = document.getElementById("admin-form");

control_of_admin_form.addEventListener("submit", async function(event){
  let username = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;
  
try {
  let response = await fetch (
    db_url, 
    {
      method: "POST",
      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },
      body: JSON.stringify({ 
        action: "login",
        username: username,
        password: password
      })
        
    }
  );

  let result = await response.json();
  if (result.success) {
    alert("Login Successful!");

    //Admin section should disappear and User responses section should come up!
    control_of_admin_login_section.style.display = "none"; //Makes it invisible
    control_of_user_responses_section.style.display = "block"; //makes it visible
    
    //CALL the getUserMessages function here
    getUserMessages();
  }
  else{
    alert("Access denied, please try again!");
  }
}
  catch(error){
    console.error(error);
    alert("There was a problem loging in!");
  }
  
}
)

async function getUserMessages() {
  try{
    let response = await fetch(
      db_url
    );

    let result = await response.json();

    if(!result.success){
      alert("Could not fetch the messages.");
      return; //the function will not run further once a return is encountered.
    }

    const control_of_user_messages_div = document.getElementById("user-messages");

    result.messages.forEach(
      responses => {
        let control_of_new_div = document.createElement("div");

        let nameParagraph = document.createElement("p");
        nameParagraph.textContent = "Name: " + responses.name;

        let emailParagraph = document.createElement("p");
        emailParagraph.textContent = "Email: " + responses.email;

        let messageParagraph = document.createElement("p");
        messageParagraph.textContent = "Message: " + responses.msg;

        let dateParagraph = document.createElement("p");
        dateParagraph.textContent = "Date: " + responses.date;

        let separater = document.createElement("hr");

        control_of_new_div.appendChild(nameParagraph);

        control_of_new_div.appendChild(emailParagraph);

        control_of_new_div.appendChild(messageParagraph);

        control_of_new_div.appendChild(dateParagraph);

        control_of_new_div.appendChild(separater);

        control_of_user_messages_div.appendChild(control_of_new_div);

        

        
      }
    )
  }

  catch(error) {
    console.error(error);
    alert("There was a problem in fetching messages from DB!");
  }
}