import { createUser, verifyUser } from "./cloudFireStore";

let signUp = () => {

    //Create loginContainer
    let loginContainer = document.createElement("div");
    loginContainer.className = "loginContainer";

    // create loginWrapper
    let loginWrapper = document.createElement("div");
    loginWrapper.className = "login-wrapper";

    let haperLogo = document.createElement("div");
    haperLogo.className = "haperLogo";

    let haperImage = document.createElement("img");
    haperImage.src = "https://i.ibb.co/nQPqV4x/favicon-1.png";
    haperImage.alt = "Haper Logo";
    haperImage.style.width = "70px";
    haperImage.style.height = "70px";

    haperLogo.appendChild(haperImage);

    loginWrapper.appendChild(haperLogo);

    // Form
    let form = document.createElement("div");
    form.className = "form";
    //form.action = "javascript: submitForm()";

    // username
    let username = document.createElement("input");
    username.className = "userDetails";
    username.type = "text";
    username.id = "username";
    username.placeholder = "Enter User Name";
    username.autocomplete = "off";

    let password = document.createElement("input");
    password.className = "userDetails";
    password.id = "pass";
    password.type = "password";
    password.placeholder = "Enter Password";

    let loginButton = document.createElement("button");
    loginButton.className = "loginButton";
    loginButton.type = "submit";
    loginButton.innerText = "Sign In";
    loginButton.onclick = signIn;

    // Sign Up
    let signUpButton = document.createElement("button");
    signUpButton.className = "signupButton";
    signUpButton.innerText = "Sign Up";
    signUpButton.onclick = signUpUser;


    let forgotPassword = document.createElement("div");
    forgotPassword.className = "forgotPassword";
    forgotPassword.innerText = "Forgotten Password?";

    let divider = document.createElement("div");
    divider.className = "divider";

    let textInSeparator = document.createElement("span");
    textInSeparator.className = "textinseparator";
    textInSeparator.innerText = "OR";

    divider.appendChild(textInSeparator);

    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(forgotPassword);
    form.appendChild(loginButton);
    form.appendChild(divider);
    form.appendChild(signUpButton);

    loginWrapper.appendChild(form);
    loginContainer.appendChild(loginWrapper);

    document.querySelector("#signInContainer").appendChild(loginContainer);

}

function signIn() {
    console.log("FORM SUBMITTED");
    verifyUser(document.getElementById("username").value, document.getElementById("pass").value).then(() => {
        document.location.hash = "routechange-trending";
    })
}

function signUpUser() {
    createUser(document.getElementById("username").value, document.getElementById("pass").value).then(() => {
        // redirect to homepage
        document.location.hash = "routechange-trending";
    }).catch(error => {
        console.log("User not created -- " + error);
    });
}

export { signUp };