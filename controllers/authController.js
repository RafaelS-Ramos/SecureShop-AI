const authService = require("../services/authService");
const db = require("../database/db");

function logAction(userId, action, ip) {
    db.run(
        "INSERT INTO audit_logs (user_id, action, ip) VALUES (?, ?, ?)",
        [userId, action, ip]
    );
}

function showLogin(req, res) {
    res.render("login", { error: null });
}

function showRegister(req, res) {
    res.render("register", { error: null });
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await authService.login(email, password);

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        logAction(user.id, "LOGIN_SUCCESS", req.ip);

        res.redirect("/account");

    } catch (error) {

        res.render("login", {
            error: "Credenciais inválidas."
        });

    }
}

async function register(req, res) {

    try {

        const { name, email, password } = req.body;

        await authService.register(
            name,
            email,
            password
        );

        res.redirect("/login");

    } catch (error) {

        let message = "Erro ao cadastrar.";

        switch (error.message) {

            case "WEAK_PASSWORD":
                message = "A senha deve possuir pelo menos 8 caracteres.";
                break;

            case "EMAIL_ALREADY_EXISTS":
                message = "Este e-mail já está cadastrado.";
                break;

        }

        res.render("register", {
            error: message
        });

    }

}

function logout(req, res) {

    if (req.session.user) {
        logAction(
            req.session.user.id,
            "LOGOUT",
            req.ip
        );
    }

    req.session.destroy(() => {
        res.redirect("/login");
    });

}

module.exports = {
    showLogin,
    showRegister,
    login,
    register,
    logout
};