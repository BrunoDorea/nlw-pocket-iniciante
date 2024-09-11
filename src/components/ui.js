const exibirMensagem = (mensagem) => {
    console.clear()
    if (mensagem) {
        console.log(mensagem)
        console.log("")
    }
}

module.exports = { exibirMensagem }
