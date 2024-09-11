const { input, checkbox, select } = require('@inquirer/prompts')
const { getMetas, setMetas } = require('./storage')

const cadastrarMeta = async () => {
    const metas = getMetas()
    const meta = await input({ message: "Digite a meta:" })
    if (!meta.length) {
        return "A meta não pode ser vazia."
    }
    metas.push({ value: meta, checked: false })
    setMetas(metas)
    return "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    const metas = getMetas()
    if (metas.length === 0) {
        return "Não existe metas cadastradas."
    }
    const respostas = await checkbox({
        message: "Utilize as [setas] para alternar de metas, o [espaço] para marcar/desmarcar e [enter] para finalizar.",
        choices: metas,
        instructions: false,
    })

    metas.forEach((m) => (m.checked = false))

    if (!respostas.length) {
        return "Nenhuma meta selecionada."
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => m.value === resposta)
        if (meta) meta.checked = true
    })

    setMetas(metas)
    return "Meta(s) concluída(s)."
}

const metasRealizadas = async () => {
    const metas = getMetas()
    const realizadas = metas.filter((meta) => meta.checked)
    if (realizadas.length === 0) {
        return "Não existe metas realizadas!"
    }
    await select({
        message: "Metas Realizadas - " + realizadas.length,
        choices: realizadas,
    })
}

const metasAbertas = async () => {
    const metas = getMetas()
    const abertas = metas.filter((meta) => !meta.checked)
    if (abertas.length === 0) {
        return "Não existe metas abertas!"
    }
    await select({
        message: "Metas Abertas - " + abertas.length,
        choices: abertas,
    })
}

const deletarMetas = async () => {
    let metas = getMetas()
    if (metas.length === 0) {
        return "Não existe meta(s) para deletar."
    }

    const metasDesmarcadas = metas.map((meta) => ({
        value: meta.value,
        checked: false,
    }))

    const itemsADeletar = await checkbox({
        message: "Selecione o item para deletar",
        choices: metasDesmarcadas,
        instructions: false,
    })

    if (!itemsADeletar.length) {
        return "Nenhuma meta para deletar."
    }

    metas = metas.filter((meta) => !itemsADeletar.includes(meta.value))
    setMetas(metas)
    return "Metas deletadas."
}

module.exports = { cadastrarMeta, listarMetas, metasRealizadas, metasAbertas, deletarMetas }
