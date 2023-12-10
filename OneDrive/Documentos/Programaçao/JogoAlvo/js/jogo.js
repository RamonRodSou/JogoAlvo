const tela = document.querySelector('canvas')
const pincel = tela.getContext('2d')
const body = document.querySelector('#cursor')
const customCursor = document.getElementById('cursor')

let pontos = 0
let atualizacaoVelocidade = 900
let intervalId                  // Variável para armazenar o ID do intervalo
let mouseHabilitado = true

let xAleatorio
let yAleatorio
let raioGeral = 50


function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor
    pincel.beginPath()
    pincel.arc(x, y, raio, 0, 2 * Math.PI)
    pincel.fill()
}

function limpaTela() {
    pincel.clearRect(0, 0, tela.width, tela.height)
}

function desenhaAlvo(x, y, raio ) {
    limpaTela()
    while (raio > 0 && raio > -10) {
        desenhaCirculo(x, y, raio, 'red')
        desenhaCirculo(x, y, raio - 10, 'white')
        raio = raio - 20
    }
}


function sorteiaAlvo(maximo) {
    return Math.floor(Math.random() * maximo)
}

function atualizaTela() {
    xAleatorio = sorteiaAlvo(tela.width - 150)
    yAleatorio = sorteiaAlvo(tela.height - 100)
    desenhaAlvo(xAleatorio, yAleatorio, raioGeral)
}

function resizeCanvas() {
    tela.width = window.innerWidth - 50
    tela.height = window.innerHeight - 100
}

function dispara(evento) {

    if (!mouseHabilitado) {
        return; // Retorna se o mouse estiver desabilitado
    }

    let x = evento.pageX - tela.offsetLeft * 2.5
    let y = evento.pageY - tela.offsetTop * 2.5

    if (
        x > xAleatorio - raioGeral &&
        x < xAleatorio + raioGeral &&
        y > yAleatorio - raioGeral &&
        y < yAleatorio + raioGeral
    ) {
        pontos += 1


        if(pontos === 5){
           const corFundo = document.querySelector('body')
           corFundo.style.backgroundImage = 'url("https://th.bing.com/th/id/R.ccdb2bcb45354cb732e3049d51725f62?rik=epQ2UJq3IVMjdQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fRycKnX9.jpg&ehk=4Zy8sHrBTw6ciPCen1mxMrqJjlTATfsRGkH6GLy62e8%3d&risl=&pid=ImgRaw&r=0")';
           corFundo.style.backgroundSize = '100%'
           raioGeral = 45

        }
        else if(pontos === 10){
           const corFundo = document.querySelector('body')
           corFundo.style.backgroundImage = 'url("https://c.wallhere.com/photos/4a/82/2559x1571_px_forest_nature_photography_Trees-613006.jpg!d")';
           corFundo.style.backgroundSize = '100%'
           raioGeral = 40
        }
        else if(pontos === 15){
            const corFundo = document.querySelector('body')
            corFundo.style.backgroundImage = 'url("https://static.wixstatic.com/media/a5f155_73887b2e7fc3491d92f5e62eafdcce37.jpg")';
            corFundo.style.backgroundSize = '100%'
            raioGeral = 35


            const corPontos = document.querySelector('#contador')
            corPontos.style.color = 'black'
         }


        updatePontuacao()

        atualizacaoVelocidade -= 30
        clearInterval(intervalId)
        intervalId = setInterval(atualizaTela, atualizacaoVelocidade)

        console.log(atualizacaoVelocidade)

        mouseHabilitado = false;
        setTimeout(() => {
            mouseHabilitado = true;
        }, 1200);
    }
}

function updatePontuacao() {
    const contadorDiv = document.querySelector('#contador')
    if (contadorDiv) {
        contadorDiv.innerHTML = `<h2>Pontuação: ${pontos}</h2>`
    } else {
        const contadorDiv = document.createElement('div')
        contadorDiv.classList.add('contador')
        contadorDiv.innerHTML = `<h2>Pontuação: ${pontos}</h2>`
        body.appendChild(contadorDiv)
    }
}

resizeCanvas()
window.addEventListener('resize', resizeCanvas)

tela.onclick = dispara

intervalId = setInterval(atualizaTela, atualizacaoVelocidade)


document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX - customCursor.clientWidth + 'px'
    customCursor.style.top = e.clientY - customCursor.clientHeight / 2 + 'px'
})
