class Figura{
    constructor(p){
        this.p = p;
        this.x = 0;
        this.y = 0;
        
        this.e_asociados = [];
    }
    
    dibujar(){}
    
    mouseDentro(){}
    
    borrar(){
        while(this.e_asociados.length != 0){
            let elemento = this.e_asociados.pop();
            elemento.parentElement.removeChild(elemento);
        }
    }
}

class Rectangulo extends Figura{
    constructor(p){
        super(p);
        
        this.ancho = 20;
        this.alto = 20;
        this.color = "#FFF";
    }
    
    dibujar(){
        this.p.fill(this.color);
        this.p.rect(this.x, this.y, this.ancho, this.alto);
    }
    
    mouseDentro(){
        return(
            this.p.mouseX > this.x && this.p.mouseX < this.x+this.ancho &&
            this.p.mouseY > this.y && this.p.mouseY < this.y+this.alto
        );
    }
}

class Rejilla extends Rectangulo{
    constructor(p){
        super(p);
    }
    
    dibujar(){
        super.dibujar();
        this.p.fill(this.color);
        this.p.rect(this.x, this.y, this.ancho, this.alto);
        
        let parte = this.alto/3;
        for(let i=0; i<3; i++){
            this.p.rect(this.x, parte*i + this.y, this.ancho, parte);
        }
    }
}