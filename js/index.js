const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Ops, verifique se o usuário ou senha estão corretos.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Ops! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

//Criar Conta 
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    console.log(email, password);

    if (email.length < 5) {
        alert("preencha o campo com um e-mail válido");
        return;
    }

    if (password.length <4 ) {
        alert("Preencha a senha com no mínimo 4 digitos");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });
    
    myModal.hide();
    alert("Conta criada com sucesso!");
});

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account)
    {
        return JSON.parse(account);
    }

    return "";
}

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveSession (data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

