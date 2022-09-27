function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barreira(reverse = false) {
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')

    this.elemento.appendChild(reverse ? corpo : borda)
    this.elemento.appendChild(reverse? borda : corpo)

    this.setAltura = (altura) => {
        corpo.style.height = `${altura}px`}
}

/* const b =  new Barreira(true)
b.setAltura(200)
document.querySelector('[wm-flappy]').appendChild(b.elemento) */

function ParDeBarreiras(altura, abertura, x){
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sorterAltura = () =>{
        const alturaSuperio = Math.random() * (altura-abertura)
        const alturaIferior = altura - abertura - alturaSuperio

        this.superior.setAltura(alturaSuperio)
        this.inferior.setAltura(alturaIferior)
     }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sorterAltura()
    this.setX(x)

}


/* const b = new ParDeBarreiras(500, 200, 200)
document.querySelector('[wm-flappy]').appendChild(b.elemento) */

function Barreiras(altura, largura, abertura, espaco, noticicarPonto){
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco*2),
        new ParDeBarreiras(altura, abertura, largura + espaco*3)
    ]

    const desloca = 3
    this.animar = ()=>{
        this.pares.forEach(par => {
            par.setX(par.getX() - desloca)

            if(par.getX() < -par.getLargura()){
                par.setX(par.getX() + espaco * this.pares.length)
                par.sorterAltura()
            }

            const meio = largura/2
            const cruzou = par.getX() + desloca >= meio 
            && par.getX() < meio 

            if(cruzou) noticicarPonto() 

        })
    }
}

const barreiras = new Barreiras(500, 900, 200, 300)

const areaDoJogo = document.querySelector('[wm-flappy]')

barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

setInterval(()=>{
     barreiras.animar()
},20)