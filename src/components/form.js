class Form{
    constructor(){
        this.form = document.querySelector(".form");
        this.fields = document.querySelectorAll(".form__field");
        this.check = document.querySelector(".check");
        this.monit = document.querySelector('.monit');
        this.monitContent= document.querySelector('.monit__content'); 
        this.errorsField = document.createElement("ul");
  

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
        this.check.addEventListener("change", this.input.bind(this, this.fields[3]) );
        this.fields.forEach(field => {
            field.addEventListener("change", this.input.bind(this, field) );
        })
        
       
    }

    input(field){
        field.classList.remove("error");
    }



    handleSubmit(e){
        e.preventDefault();
        let errors  = [];
        let name = this.fields[0].value;
        let email = this.fields[1].value;
        let text = this.fields[2].value;
        let check = this.check.checked;
        if (!(/^[a-zśłąęćźżńó-]+[ ]+[a-zśłąęćźżńó-]+[ ]*[a-zśłąęćźżńó-]*$/i.test(name))) {
            this.fields[0].classList.add("error");
            errors.push("Proszę poprawne wpisać swoje imię i nazwisko.");
        }

        if (!(/[@][a-z]+[.][a-z]+/i.test(email))){
            this.fields[1].classList.add("error");
            errors.push("Proszę poprawne wpisać swój adres email.");
        }

        if (!text.localeCompare("") ){
            this.fields[2].classList.add("error");
            errors.push("Proszę wpisać treść wiadomości.");
        }
        if (!check){
            this.fields[3].classList.add("error");
            errors.push("Proszę zaznaczyć wymagane zgody.");
        }

        if(errors == ""){
            text = text.replaceAll('?','*$*');
            text = text.replaceAll('#','^!^');
            const texts = text.split("\n") ;
            let data = [name, email, texts];
            let res = 0;
            this.errorsField.innerHTML = "";
            fetch(`/message/${JSON.stringify(data)}`, {
                method: 'POST',
            })
            .then(response => response.json() )
            .then(response => {
                
                setTimeout (()=>{
                    res = response;
                    if(res == "wysłano"){
                        this.check.checked = false;
                        this.fields.forEach(field => {
                            field.value="";
                        })
                       this.monit.style.backgroundColor = "rgba(169,138,81,0.8)";
                       this.monitContent.textContent = "Wiadomość została wysłana";
                       this.monit.classList.add("monit--active");
                       setTimeout(()=>{
                        this.monit.classList.remove("monit--active");
                    }, 5000);
    
                    }else{
                        this.monit.style.backgroundColor = "rgba(265,0,0,0.6)";
                        this.monitContent.textContent = "Błąd. Wiadomość nie została wysłana";
                        this.monit.classList.add("monit--active");
                        setTimeout(()=>{
                            this.monit.classList.remove("monit--active");
                        }, 5000);
                    }
                }, 1500);
    
                 
        
            });
            setTimeout(()=>{
                if(res == 0){
                  
                    this.monit.style.backgroundColor = "rgba(265,0,0,0.8)";
                    this.monitContent.textContent = "Błąd. Wiadomość nie została wysłana";
                    this.monit.classList.add("monit--active");
                    setTimeout(()=>{
                        this.monit.classList.remove("monit--active");
                    }, 5000);
                }  

            }, 5000);
            
        }
         else{
          
            this.errorsField.classList.add("errors");
            this.errorsField.classList.add("form__field");
             this.errorsField.innerHTML = "";
             errors.forEach(error =>{
                 let li = document.createElement("li");
                 li.textContent = error;
                 this.errorsField.appendChild(li)
             })
             this.form.insertBefore(this.errorsField, this.fields[0]);
             window.scrollTo({
                top: this.form.offsetTop,
                behavior: 'smooth'
           });
            
         }

      
    }
}

const form = new Form;