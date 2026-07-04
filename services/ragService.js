require("dotenv").config();

const axios = require("axios");
const db = require("../database/db");

const OLLAMA_URL = process.env.OLLAMA_URL;
const CHAT_MODEL = process.env.OLLAMA_CHAT_MODEL || "llama3.2:3b";
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";

/*
GERA EMBEDDING DA PERGUNTA
*/

async function generateEmbedding(text) {

    const response = await axios.post(
        `${OLLAMA_URL}/api/embed`,
        {
            model: EMBED_MODEL,
            input: text
        }
    );

    return response.data.embeddings[0];

}

/*
SIMILARIDADE DE COSSENO
*/

function cosineSimilarity(a, b) {

    let dot = 0;

    let normA = 0;

    let normB = 0;

    for (let i = 0; i < a.length; i++) {

        dot += a[i] * b[i];

        normA += a[i] * a[i];

        normB += b[i] * b[i];

    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));

}

/*
RECUPERA PRODUTOS MAIS RELEVANTES
*/

async function retrieveRelevantProducts(question) {

    const questionEmbedding = await generateEmbedding(question);

    return new Promise((resolve, reject) => {

        db.all(

            `SELECT
                p.*,
                pe.embedding
            FROM products p
            INNER JOIN product_embeddings pe
                ON p.id = pe.product_id`,

            [],

            (err, rows) => {

                if (err)
                    return reject(err);

                const ranked = rows.map(row => {

                    const embedding = JSON.parse(row.embedding);

                    return {

                        product: row,

                        score: cosineSimilarity(
                            questionEmbedding,
                            embedding
                        )

                    };

                });

                ranked.sort(
                    (a, b) => b.score - a.score
                );

                resolve(

                    ranked
                        .slice(0, 3)
                        .map(item => item.product)

                );

            }

        );

    });

}

/*
MONTA O PROMPT
*/

async function askAssistant(question) {

    const products =
        await retrieveRelevantProducts(question);

    const context = products.map(product => {

        return `
Produto: ${product.name}

Descrição: ${product.description}

Categoria: ${product.category}

Preço: R$ ${product.price}

Estoque: ${product.stock}
`;

    }).join("\n");

    const prompt = `

Você é um assistente inteligente da SecureShop AI.

Responda SEMPRE em português.

Utilize SOMENTE os produtos abaixo.

Nunca invente produtos.

Caso nenhum produto seja adequado,
explique isso claramente.

Produtos disponíveis:

${context}

Pergunta do cliente:

${question}

Resposta:
`;

    const response = await axios.post(

        `${OLLAMA_URL}/api/generate`,

        {

            model: CHAT_MODEL,

            prompt,

            stream: false

        }

    );

    return {
    answer: response.data.response,
    products
};

}

module.exports = {

    askAssistant

};