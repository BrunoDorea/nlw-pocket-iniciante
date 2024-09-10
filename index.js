const { select } = require('@inquirer/prompts')

const start = async () => {
    while(true){
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
                name: "Sair",
                value: "sair"
            }
        ]
        })

        switch(opcao){
            case "cadastrar":
                console.log('cadastrou')
                break
            case "listar":
                console.log('listou');
                break
            case "sair":
                return
        }
    }
}

start()