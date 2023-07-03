const Title = document.getElementById('title');
const Form = document.getElementById('info');
const signup = document.getElementById('sign');
const login = document.getElementById('log');
const SignupBtn = document.getElementById('signup');
const LoginBtn = document.getElementById('login');
const nameField = document.getElementById('txt');
const Forgot = document.getElementById('forgot');
const Noacc = document.getElementById('no-acc');
const Haveacc = document.getElementById('have-acc');
const Name = document.getElementById('urname');

const Email = document.getElementById('uremail');
Email.addEventListener('keyup', () => {
    const Emailerror = document.getElementById('email_error');
    const mailField = document.getElementById('mail');
    const Form = document.getElementById('info');
    if (Email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
        Form.classList.add("valid");
        Form.classList.remove("invalid");
        Emailerror.innerHTML = "";
        mailField.style.border = '2px solid #2c6f9f';
    }
    else if (Email == "" || Email.value == null) {
        Form.classList.remove("valid");
        Form.classList.remove("invalid");
        Emailerror.innerHTML = "";
        mailField.style.border = '2px solid transparent';
    }
    else {
        Form.classList.remove("valid");
        Form.classList.add("invalid");
        Emailerror.innerHTML = "Please enter a valid email address";
        mailField.style.border = '2px solid red';
        Emailerror.style.color = "red";
    }

})

const Password = document.getElementById('password');
Password.addEventListener('keyup', () => {
    const Passerror = document.getElementById('password_error');
    const PassField = document.getElementById('pass');
    if (Password.value === '' || Password.value == null) {
        Passerror.innerText = '';
        PassField.style.border = '2px solid transparent';
    }
    else if (Password.value.length <= 6) {
        Passerror.innerText = 'Password must contain at least 6 characters';
        PassField.style.border = '2px solid red';
        Passerror.style.color = "red";
    }
    else if (Password.value.length >= 15) {
        Passerror.innerText = 'Password can contain at most 15 characters';
        PassField.style.border = '2px solid red';
        Passerror.style.color = "red";
    }
    else {
        Passerror.innerText = '';
        PassField.style.border = '2px solid #2c6f9f';
    }
})



function showpassword() {
    const checkBox = document.getElementById('check');
    const Password = document.getElementById('password');
    if (checkBox.checked == false) {
        Password.type = "password";
    }
    else { Password.type = "text" };
}

login.onclick = function displayLoginpage() {
    nameField.style.display = "none";
    SignupBtn.style.display = "none";
    LoginBtn.style.display = "block";
    Forgot.style.display = "block";
    Noacc.style.display = "flex";
    Haveacc.style.display = "none";
    Title.innerHTML = "Login";
}
signup.onclick = function displaySignuppage() {
    nameField.style.display = "flex";
    SignupBtn.style.display = "block";
    LoginBtn.style.display = "none";
    Forgot.style.display = "none";
    Noacc.style.display = "none";
    Haveacc.style.display = "flex";
    Title.innerHTML = "Sign Up";
}

function resetall() {
    Email.innerHTML = "";
    Name.innerHTML = "";
    Password.innerHTML = "";
}
function resetalll() {
    Email.innerHTML = "";
    Password.innerHTML = "";
}

SignupBtn.onclick = resetall();
LoginBtn.onclick = resetalll();

