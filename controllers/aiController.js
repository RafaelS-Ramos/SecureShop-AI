const ragService = require("../services/ragService");

function showAssistant(req, res) {
    res.render("ai", {
        question: "",
        answer: "",
        products: []
    });
}

async function ask(req, res) {

    try {

        const { question } = req.body;

        if (!question || question.trim() === "") {
            return res.render("ai", {
                question: "",
                answer: "Digite uma pergunta."
            });
        }

        const result = await ragService.askAssistant(question);

        res.render("ai", {
            question,
            answer: result.answer,
            products: result.products
        });

    } catch (error) {

        console.error(error);

        res.render("ai", {
            question: req.body.question,
            answer: "Erro ao consultar a IA.",
            products: []
        });

    }

}

module.exports = {
    showAssistant,
    ask
};