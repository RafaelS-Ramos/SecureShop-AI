require("dotenv").config();

const axios = require("axios");
const db = require("../database/db");

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";

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

db.all("SELECT * FROM products", [], async (err, products) => {

    if (err) {
        console.error(err);
        process.exit(1);
    }

    for (const product of products) {

        const document = `
Nome: ${product.name}
Descrição: ${product.description}
Categoria: ${product.category}
Preço: ${product.price}
Estoque: ${product.stock}
`;

        const embedding = await generateEmbedding(document);

        db.run(
            `INSERT OR REPLACE INTO product_embeddings
             (product_id, embedding)
             VALUES (?, ?)`,
            [
                product.id,
                JSON.stringify(embedding)
            ]
        );

        console.log(`✔ Embedding gerado para ${product.name}`);
    }

    console.log("\nIndexação concluída.");

    db.close();

});