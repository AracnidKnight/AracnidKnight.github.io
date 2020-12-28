let estilo_informe;

const delay = ms => new Promise(res => setTimeout(res, ms));

document.oncontextmenu = function() {
    return false;
}

function iniciar(p){
    let figuras = [];
    
    p.setup = () => {
        p.createCanvas(400, 550);
        
        this.bomba = new Rectangulo(p);
        this.bomba.alto = 500;
        this.bomba.ancho = 80;
        this.bomba.x = 50;
        this.bomba.y = 20;
        
        let prof = document.createElement("input");
        prof.style.position = "absolute";
        prof.style.top = (this.bomba.alto) + "px";
        prof.style.left = (this.bomba.ancho + this.bomba.x + 21) + "px";
        prof.style.borderBottom = "1px solid black";
        prof.style.paddingLeft = "5px";
        prof.style.width = "4em";
        document.querySelector("#habilitacion").append(prof);
        
        let largo = document.createElement("input");
        largo.style.position = "absolute";
        largo.style.top = (this.bomba.alto + 23) + "px";
        largo.style.left = (this.bomba.ancho + this.bomba.x + 21) + "px";
        largo.style.borderBottom = "1px solid black";
        largo.style.paddingLeft = "5px";
        largo.style.width = "4em";
        document.querySelector("#habilitacion").append(largo);
    }
    p.draw = () => {
        p.clear();
        p.fill(120);
        p.rect(30, 40, 120, this.bomba.alto + 5);
        
        this.bomba.dibujar();
        for(let figura of figuras){
            figura.dibujar();
        }
        
        if(this.bomba.mouseDentro()){
            p.fill("#DDD");
            p.rect(50, p.mouseY-10, 80, 20);
            let parte = 20/3;
            for(let i=0; i<3; i++){
                p.rect(50, parte*i + p.mouseY-10, 80, parte);
            }
        }
    }
    
    p.mouseClicked = () => {
        if(this.bomba.mouseDentro()){
            let nueva_figura = new Rejilla(p);
            nueva_figura.x = 50;
            nueva_figura.y = p.mouseY - 10;
            nueva_figura.alto = 20;
            nueva_figura.ancho = 80;
            nueva_figura.color = "#DDD";
            figuras.push(nueva_figura);

            let prof = document.createElement("input");
            prof.style.position = "absolute";
            prof.style.top = (nueva_figura.y) + "px";
            prof.style.left = (nueva_figura.x + nueva_figura.ancho + 21) + "px";
            prof.style.borderBottom = "1px solid black";
            prof.style.paddingLeft = "5px";
            prof.style.width = "4em";
            document.querySelector("#habilitacion").append(prof);
            
            let alto = document.createElement("input");
            alto.style.position = "absolute";
            alto.style.top = (nueva_figura.y - nueva_figura.alto) + "px";
            alto.style.left = (nueva_figura.x + nueva_figura.ancho + 21) + "px";
            alto.style.borderBottom = "1px solid black";
            alto.style.paddingLeft = "5px";
            alto.style.width = "4em";
            document.querySelector("#habilitacion").append(alto);
            
            nueva_figura.e_asociados.push(prof);
            nueva_figura.e_asociados.push(alto);
        }
    }
    
    p.mouseReleased = () => {
        if(p.mouseButton == p.RIGHT){
            let i = figuras.length-1;
            while(i >= 0){
                let figura = figuras[i];
                
                if(figura.mouseDentro()){
                    figura.borrar();
                    figuras.splice(i, 1);
                }
                
                i -= 1;
            }
        }
    }
}

window.onload = () => {
    estilo_informe = document.querySelector("#estilo_ocultar");
    estilo_informe.href = "";
    
    new p5(iniciar, "bosquejo");
}

async function imprimir(){
    estilo_informe.href = "index.css";
    await delay(1);
    window.print();
    estilo_informe.href = "";
}

function anadirFila(){
    tabla = document.querySelector("table tbody");
    
    let fila = document.createElement("tr");
    
    let etiqueta = document.createElement("td");
    etiqueta.append(document.createElement("input"));
    let dato = document.createElement("td");
    dato.append(document.createElement("input"));
    fila.append(etiqueta);
    fila.append(dato);
    
    fila.oncontextmenu = () => {
        tabla.removeChild(fila);
    }
    
    tabla.insertBefore(fila, document.querySelector("tr:last-child"));
}











