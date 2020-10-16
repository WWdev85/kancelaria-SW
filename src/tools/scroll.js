class Scroll{
    constructor(){
        this.icons = document.querySelectorAll('.icon');
        this.logo = document.querySelector('.logo');
        this.header = document.querySelector('.header');
        this.nav = document.querySelector('.navigation');
        this.icons.forEach(icon => {icon.addEventListener("click", this.handleMenuClick.bind(this))});

        this.offset = 55;
        this.arrowUp = document.querySelector('.scrollUp');
        this.logo = document.querySelector('.logo');
        this.sections = document.querySelectorAll('section');
        this.links = document.querySelectorAll('.link');

     
        document.addEventListener("scroll", this.handleScroll.bind(this));
        this.arrowUp.addEventListener("click", this.scroll.bind(this, 0));
        this.logo.addEventListener("click", this.scroll.bind(this, 0));
        this.links.forEach((link) =>  {
            link.addEventListener("click", this.handleLinkClick.bind(this))
            });
    
   
    }
    handleMenuClick(){
        this.header.classList.toggle('header--active');
        this.logo.classList.toggle('logo--active');
        this.nav.classList.toggle('navigation--active');
        this.icons.forEach(icon => {icon.classList.toggle("icon--hidden")} );
    }


    handleLinkClick(e){
        
       
       
        let width = window.innerWidth;
        if (width < 1024){
            this.handleMenuClick();
        }
        if (width < 581){
            this.offset = 55;
            }else if(width < 781){
                this.offset = 85;
                }else if(width < 1024){
                    this.offset = 100;
                    }else {
                        this.offset = 0;
                    }
        this.scroll(e.target.dataset.id);
        this.links[e.target.dataset.id - 1].classList.add("link--active");
    }

    scroll(section){
        this.links.forEach((link) => {
            link.classList.remove("link--active");
        })
        window.scrollTo({
            top: this.sections[section].offsetTop - this.offset ,
            behavior: 'smooth'
       });

    }

    handleScroll(){
        if(scrollY > 200){
            this.arrowUp.style.opacity = "1";
        
        }
        else{

            this.arrowUp.style.opacity = "0"; 
        }

        if(scrollY < this.sections[1].offsetTop - this.offset - 200){
            this.links.forEach((link) => {
                link.classList.remove("link--active");
            })
            }
            else if(scrollY < this.sections[2].offsetTop - this.offset - 200){
                this.links.forEach((link) => {
                    link.classList.remove("link--active");
                })
                this.links[0].classList.add("link--active");
                }
                else if(scrollY < this.sections[3].offsetTop - this.offset - 200){
                    this.links.forEach((link) => {
                        link.classList.remove("link--active");
                    })
                    this.links[1].classList.add("link--active");
                    }else if(scrollY < this.sections[4].offsetTop - this.offset - 200){
                        this.links.forEach((link) => {
                            link.classList.remove("link--active");
                        })
                        this.links[2].classList.add("link--active");
                        }else if(scrollY < this.sections[5].offsetTop - this.offset - 350){
                            this.links.forEach((link) => {
                                link.classList.remove("link--active");
                            })
                            this.links[3].classList.add("link--active");
                            }else{
                                this.links.forEach((link) => {
                                    link.classList.remove("link--active");
                                })
                                this.links[4].classList.add("link--active");

                            }

    }
}

let scroll = new Scroll;