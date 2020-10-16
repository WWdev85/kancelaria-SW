class Slider{
    constructor(){
        this.changer;
        this.previousImage = 3;
        this.currentImage = 0;
        this.images = document.querySelectorAll(".slider__image");
        this.menu = document.querySelectorAll(".slider__menu");
        this.arrows = document.querySelectorAll(".arrow");
        this.strips = document.querySelectorAll(".strip");
        this.phase = document.querySelectorAll(".slider__bar--phase");
        this.strips.forEach((strip) => {
            strip.addEventListener('click',  this.handleStrip.bind(this));
            }
        );
        this.arrows.forEach((arrow) => {
            arrow.addEventListener('click',  this.handleArrow.bind(this));
            }
        );
        this.autoChange();
    }

    handleStrip(e){
        clearInterval(this.changer);
        this.nextImage(e.target.dataset.id);
        this.changer =setInterval(this.nextImage.bind(this , "add"),5000);
    
    }

    handleArrow(e) {
        clearInterval(this.changer);
        let sign = e.target.dataset.id == 1 ? "add" : "substract";
        this.nextImage(sign);
        this.changer =setInterval(this.nextImage.bind(this , "add"),5000);
    }

    nextIndex(number, sign){  
        
        if (sign == "add"){
            number ++;
            if(number > 3){
                number = 0;
            }
            return number;
        }
        if (sign == "substract"){
            number --;
            if(number < 0){
                number = 3;
            }
            return number;

        }
      
    }



    change(){
    
        this.images[this.previousImage].classList.remove("slider__image--active");
        this.images[this.currentImage].classList.add("slider__image--active");

        this.menu[this.previousImage].classList.remove("slider__menu--active");
        this.menu[this.currentImage].classList.add("slider__menu--active");

        this.phase[this.previousImage].classList.remove("slider__bar--phase--active");
        this.phase[this.currentImage].classList.add("slider__bar--phase--active");

        this.strips[this.previousImage].classList.remove("strip--active");
        this.strips[this.currentImage].classList.add("strip--active");


        this.strips.forEach((strip)=> {
            strip.classList.remove("strip--previous");
        })
        this.strips[this.previousImage].classList.add("strip--previous");
        

    
    }

    nextImage(sign){
        this.previousImage = this.currentImage;
        if(sign == "add" || sign == "substract"){    
            this.currentImage = this.nextIndex(this.currentImage, sign);
        }
        else{
            this.currentImage = sign;
        }
        this.change();
    }

   

    autoChange(){   

        this.changer =setInterval(this.nextImage.bind(this , "add"),5000)
       

    }
}

const slider = new Slider;