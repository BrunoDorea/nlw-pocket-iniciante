const fs = require("fs").promises

let metas = []

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    } catch (error) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const getMetas = () => metas

const setMetas = (novasMetas) => {
    metas = novasMetas
}

module.exports = { carregarMetas, salvarMetas, getMetas, setMetas }
