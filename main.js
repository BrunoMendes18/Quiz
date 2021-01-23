var h1Pergunta = document.getElementById("pergunta");
var h1Categoria = document.getElementById("categoria");

var btnResposta1 = document.getElementById("resposta1");
var btnResposta2 = document.getElementById("resposta2");
var btnResposta3 = document.getElementById("resposta3");
var btnResposta4 = document.getElementById("resposta4");

var btnComecar = document.getElementById("comecar");

btnComecar.addEventListener("click",chamarAPI);

var respostaAPI;
var contar =0;

var arrayTodasRespostas = [];
var arrayTeste = [];
var arrayBtnTeste = [btnResposta1,btnResposta2,btnResposta3,btnResposta4];

//Variavel para verificar se o jogo ja começou (default false)
var GamaHasStarted = false;

function chamarAPI()
{
    fetch("https://opentdb.com/api.php?amount=10")
    .then((response)=>{ return response.text()})
    .then((r) => {respostaAPI =JSON.parse(r); console.log(respostaAPI);novaPergunta()})

    
}


btnResposta1.addEventListener("click", respostaUtilizador);
btnResposta2.addEventListener("click", respostaUtilizador);
btnResposta3.addEventListener("click", respostaUtilizador);
btnResposta4.addEventListener("click", respostaUtilizador);

function respostaUtilizador(event)
{

    if(GamaHasStarted==false)
    return console.log("game not started");

    switch (event.target.id) {
        case "resposta1":
            validarResposta(event.target.innerHTML);
            break;
        case "resposta2":
            validarResposta(event.target.innerHTML);
            break;
        case "resposta3":
            validarResposta(event.target.innerHTML);
            break;
        case "resposta4":
            validarResposta(event.target.innerHTML);
                break;

        default:
            break;
    }
}

//Funcao para validar a Resposta
function validarResposta(resposta)
{
    console.log("Resposta: "+resposta);

    if(resposta==respostaAPI.results[contar].correct_answer)
    {
        console.log("acertou");
        contar++;
        novaPergunta();
    }
    else 
    {
        contar++;
        console.log("errou");
        novaPergunta();
    }
}

function novaPergunta()
{
    //Se nao houver mais perguntas
    if(contar>=10)
    {
        jogoAcabou();
        
        return console.log("jogo acabou, de reset á pagina");
    }

    btnResposta3.style.display ="block";
    btnResposta4.style.display ="block";
    h1Pergunta.innerHTML = respostaAPI.results[contar].question;
    h1Categoria.innerHTML = respostaAPI.results[contar].category;

    if(respostaAPI.results[contar].incorrect_answers[contar]=="False" || respostaAPI.results[contar].incorrect_answers[0]=="True")
    {
        console.log("pergunta com resposta Verdadeiro ou Falso");
        btnResposta3.style.display ="none";
        btnResposta4.style.display ="none";
        arrayTodasRespostas.push(respostaAPI.results[contar].incorrect_answers);
        arrayTodasRespostas.push(respostaAPI.results[contar].correct_answer);
    }
    else 
    {
        for(var i =0;i<respostaAPI.results[contar].incorrect_answers.length;i++)
    {
        arrayTodasRespostas.push(respostaAPI.results[contar].incorrect_answers[i])
    }

    arrayTodasRespostas.push(respostaAPI.results[contar].correct_answer);

    console.log(arrayTodasRespostas);

    }

    
    
    //Isto faz o shuffle das perguntas
    for(var i=0;i<arrayBtnTeste.length;i++)
    {
        let numero = Math.floor(Math.random() * arrayTodasRespostas.length);
        arrayBtnTeste[i].innerHTML = arrayTodasRespostas[numero];
        arrayTodasRespostas.splice(numero,1);
    }

    GamaHasStarted = true;
   
}

//Funcao quando o as perguntas acabam
function jogoAcabou()
{
    GamaHasStarted = false;
    contar =0;

    h1Categoria.innerHTML = "Game is over";
    h1Pergunta.innerHTML = "Game is over";

    btnResposta1.innerHTML = "resposta";
    btnResposta2.innerHTML = "resposta";
    btnResposta3.innerHTML = "resposta";
    btnResposta4.innerHTML = "resposta";
}

