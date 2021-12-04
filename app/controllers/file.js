const models = require("../models/index"); //import de todos os models
const { Readable } = require("stream");
const readline = require("readline");

const Estoque = models.Estoque;

async function index(req, res) {
    if (req.route.methods.post) {
        //pegar os dados da tabela do buffer
        const { buffer } = req.file;

        //criando o arquivo para ler
        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);


        var arrayDados = [];

        //ler linha por linha
        const bloodLine = readline.createInterface({
            input: readableFile
        });

        for await (let line of bloodLine) {
            const dado = line.split(",");
            //objeto com dados do estoque
            var dadosSangue = new Object();
            dadosSangue.id_sangue = dado[1];
            dadosSangue.quantidade = dado[3];
            dadosSangue.id_centro = dado[2];
            //INSERE NO ARRAY
            arrayDados.push(dadosSangue);
        }
        //console.log(arrayDados);

        //Fazer upload do array no banco
        for await (let dado of arrayDados) {
            try {
                //verifico se existe uma entrada para atualizar
                const estoque = await Estoque.findOne({
                    where: {
                        id_centro: dado.id_centro,
                        id_sangue: dado.id_sangue
                    }
                });

                //atualizando com o novo nível
                if(estoque){
                    try{
                        await Estoque.update({
                            quantidade: dado.quantidade
                        },{ where: { id_centro: dado.id_centro, id_sangue: dado.id_sangue } });
                    }
                    catch(e){
                        res.send(e);
                    }
                }
                
            } catch (e) {
                res.send(e);
            }
        }
        res.send(200);
    }
    else {
        res.render("main/index", {
            titulo: "Home Page",
        });
    }
}

module.exports = { index };