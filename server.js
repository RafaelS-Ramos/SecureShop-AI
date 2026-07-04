require("dotenv").config();

const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const requireAdmin = require("./middleware/admin");
const adminController = require("./controllers/adminController");
const adminRoutes = require("./routes/admin");
const cartRoutes = require("./routes/cart");
const aiRoutes = require("./routes/ai");

const productController = require("./controllers/productController");

//Routes
const authRoutes = require("./routes/auth");

//Middlewares
const requireAuth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set("view engine", "ejs");

// Segurança
app.use(helmet());

// Formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Arquivos estáticos
app.use(express.static("public"));

// Sessão
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);

// Public Routes
app.get("/", productController.home);

//Protected Routes
app.get("/account", requireAuth, (req, res) => {
	res.render("account", {
		user: req.session.user
	});
});

// Inicialização
app.listen(PORT, () => {
  console.log(`SecureShop AI executando em http://localhost:${PORT}`);
});

app.use("/ai", aiRoutes);

app.get(
    "/admin",
    requireAdmin,
    adminController.dashboard
);