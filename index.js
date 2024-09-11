const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem-vindo ao app de metas"
let metas

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(error){
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:" })
    if (!meta.length) {
        mensagem = "A meta não pode ser vazia."
        return
    }

    metas.push({ value: meta, checked: false })

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Utilize as [setas] para alternar de metas, o [espaço] para marcar/desmarcar e [enter] para finalizar.",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (!respostas.length) {
        mensagem = "Nenhuma meta selecionada"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    mensagem = "Metas(s) concluída(s)"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (!realizadas.length) {
        mensagem = "Não existe metas realizadas!"
        return
    }

    await select({
        message: "Metas Realizadas - " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter(() => {
        return !meta.checked
    })

    if (!abertas.length) {
        mensagem = "Não existe metas abertas!"
        return
    }

    await select({
        message: "Metas Abertas - " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {
            value: meta.value, checked: false
        }
    })

    const itemsADeletar = await checkbox({
        message: "Selecione o item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if (!itemsADeletar) {
        mensagem = "Nenhum item para deletar."
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
}

const exibirMensagem = () => {
    console.clear()
    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()
    
    while (true) {
        exibirMensagem()
        await salvarMetas()
    
        const opcao = await select({
            message: "Menu ->",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar meta",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()