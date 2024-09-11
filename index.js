const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: "Beber 2L de água",
    checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:" })
    if (!meta.length) {
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push({ value: meta, checked: false })
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Utilize as [setas] para alternar de metas, o [espaço] para marcar/desmarcar e [enter] para finalizar.",
        choices: [...metas]
    })

    metas.forEach((m) => { 
        m.checked = false
    })

    if (!respostas.length) { 
        console.log("Nenhuma meta selecionada")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log("Metas(s) concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(!realizadas.length) {
        console.log("Não existe metas realizadas!")
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
}

const start = async () => {
    while (true) {
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
            case "sair":
                return
        }
    }
}

start()