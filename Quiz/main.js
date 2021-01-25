var h1Pergunta = document.getElementById("pergunta");
var h1Categoria = document.getElementById("categoria");

var certas=document.getElementById("certas");
var resul=document.getElementById("resultado")

var btnResposta1 = document.getElementById("resposta1");
var btnResposta2 = document.getElementById("resposta2");
var btnResposta3 = document.getElementById("resposta3");
var btnResposta4 = document.getElementById("resposta4");

var btnComecar = document.getElementById("comecar");

btnComecar.addEventListener("click",chamarAPI);

var respostaAPI;
var contar =0;
var respostascertas=0

var arrayTodasRespostas = [];
var arrayTeste = [];
var arrayBtnTeste = [btnResposta1,btnResposta2,btnResposta3,btnResposta4];

//Variavel para verificar se o jogo ja começou (default false)
var GamaHasStarted = false;

//FUNCAO PARA CHAMAR JOGADOR
function chamarJogador()
{
    var nome=document.getElementById("nome").value

    if(nome=="")
    {
        document.getElementById("texto").innerHTML = "Player";
    }
    else
    {
        document.getElementById("texto").innerHTML = nome;
    }
    
}

function chamarAPI()
{
    chamarJogador()

    fetch("https://opentdb.com/api.php?amount=10")
    .then((response)=>{ return response.text()})
    .then((r) => {respostaAPI =JSON.parse(r); console.log(respostaAPI);novaPergunta()})

    //Fez o pedido e no fim invocou a funçao novaPergunta;
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
        //Aqui que vai-se adicionar os pontos
        console.log("acertou");
        contar++;
        //Conta as respostas certas
        respostascertas++
        certas.innerText="Pontuação: " + respostascertas 
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

//Voltar a por o display do 3 e 4 botao pk eles desaparecem se a pergunta é de verdadeiro e falso
    btnResposta3.style.display ="inline";
    btnResposta4.style.display ="inline";

    //Atribuir a pergunta ao h1 especifico
    h1Pergunta.innerHTML = respostaAPI.results[contar].question;
    //Atribuir a categoria ao h1 especifico
    h1Categoria.innerHTML = respostaAPI.results[contar].category;


    //Se a pergunta for de verdadeiro e falso
    if(respostaAPI.results[contar].incorrect_answers[0]=="False" || respostaAPI.results[contar].incorrect_answers[0]=="True")
    {
        console.log("pergunta com resposta Verdadeiro ou Falso");
        //Desaparece o 3 e 4 butao
        btnResposta3.style.display ="none";
        btnResposta4.style.display ="none";

        //Adiciona ao array com Todas as respostas para aquela pergunta(as incorretas+corretas)
        arrayTodasRespostas.push(respostaAPI.results[contar].incorrect_answers);
        arrayTodasRespostas.push(respostaAPI.results[contar].correct_answer);
    }
    else 
    {

        //Faz o mesmo do de cima mas como tem mais respostas fiz um for
        for(var i =0;i<respostaAPI.results[contar].incorrect_answers.length;i++)
    {
        arrayTodasRespostas.push(respostaAPI.results[contar].incorrect_answers[i])
    }

    arrayTodasRespostas.push(respostaAPI.results[contar].correct_answer);

    console.log(arrayTodasRespostas);

    }

    
    
    //Isto faz o shuffle das respostas
    for(var i=0;i<arrayBtnTeste.length;i++)
    {
        //Random numero entre 0 e array.length(no inicio vai de 0-4 mas vai diminuir pk eu removo do array)
        let numero = Math.floor(Math.random() * arrayTodasRespostas.length);

        //O butao i (neste momento o 1(na posicao 0 fica o primeiro butao eu declarei em cima de todo)) fica com a pergunta duma posicao random do array de respostas
        arrayBtnTeste[i].innerHTML = arrayTodasRespostas[numero];

        //Remove a resposta do array
        arrayTodasRespostas.splice(numero,1);
    }

    //O jogo começou
    GamaHasStarted = true;
   
}

//Funcao quando o as perguntas acabam
function jogoAcabou()
{
    GamaHasStarted = false;
    contar =0;

    MudarFim()

    resul.innerText="O jogador " + nome.value + " acertou " + respostascertas + " respostas"
}

//Funcao que muda de formulario (do form de nome do jogador para as perguntas)
function MudarForm() {
    var x = document.getElementById("jogador")
    var y = document.getElementById("form")
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
      y.style.display = "block"
    }
  }

  //Funcao que muda de formulario (do form das perguntas para o resultado)
  function MudarFim() {
    var x = document.getElementById("form")
    var y = document.getElementById("fim")
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
      y.style.display = "block"
    }

    
  }