const { select } = require('@inquirer/prompts')
const { carregarMetas, salvarMetas } = require('./components/storage')
const { cadastrarMeta, listarMetas, metasRealizadas, metasAbertas, deletarMetas } = require('./components/metas')
const { exibirMensagem } = require('./components/ui')

let mensagem = "Bem-vindo ao app de metas"

const start = async () => {
    await carregarMetas()

    while (true) {
        exibirMensagem(mensagem)
        await salvarMetas()

        const opcao = await select({
            message: "Menu ->",
            choices: [
                { name: "Cadastrar meta", value: "cadastrar" },
                { name: "Listar meta", value: "listar" },
                { name: "Metas realizadas", value: "realizadas" },
                { name: "Metas abertas", value: "abertas" },
                { name: "Deletar metas", value: "deletar" },
                { name: "Sair", value: "sair" }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                mensagem = await cadastrarMeta()
                break
            case "listar":
                mensagem = await listarMetas()
                break
            case "realizadas":
                mensagem = await metasRealizadas()
                break
            case "abertas":
                mensagem = await metasAbertas()
                break
            case "deletar":
                mensagem = await deletarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()
