// Formulario y respuesta API con JQUERY
$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        document.getElementById("soloNumeros").innerHTML = "";

        let input = $("#input").val();

        let validacion = validarInput(input);
        if (validacion == true){
            
            respuestaInput(input);
        } 
        else{
            document.getElementById("soloNumeros").innerHTML = "Ingrese solo números"
           
        }  
    });

    //Declarando la función resultado para validar solo numeros
    function validarInput(input){
        let validacion = true;
        patron = /[0-9]/gim;

        if(patron.test(input) == false){
            let validacion = false
            return validacion
        }
        return validacion
    }

    //Declarando la función de solicitud y pintado de la información
    function respuestaInput(input){
        let url_Base = "https://www.superheroapi.com/api.php/";
        let token = "10227714366907498/";
        let id_hero = input;

        $.ajax({
            url: `${url_Base}${token}${id_hero}`,
            type: "GET",
            dataType:"json",
            async: true,
            success: function(data){
                //Guardar variables a mostrar en CardHeroe
                let imagen = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections['group-affiliation'];
                let publicado = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let aparicion = data.biography['first-appearance'];
                let altura = data.appearance.height[1];
                let peso = data.appearance.weight[1];
                let alianzas = data.biography.aliases.join(", ");
                console.log(imagen)

                //Crear elemento DOM .hero__card para pintar información del héroe
                $(".hero__card").html("");
                $(".hero__card").html(`
                <div class="hero__img"><img src="${imagen}"></div>
                <div class="hero__info">
                    <p class="hero__caract">Nombre: <span>${nombre}</span></p>
                    <p class="hero__caract">Conexiones: <span>${conexiones}</span></p>
                    <p class="hero__caract">Publicado por: <span>${publicado}</span></p>
                    <p class="hero__caract">Ocupación: <span>${ocupacion}</span></p>
                    <p class="hero__caract">Aparición: <span>${aparicion}</span></p>
                    <p class="hero__caract">Altura: <span>${altura}</span></p>
                    <p class="hero__caract">Peso: <span>${peso}</span></p>
                    <p class="hero__caract">Alianzas: <span>${alianzas}</span></p>
                </div>
                </div>
                `);
                //Buscar si existen estadísticas de poder
                let dps = data.powerstats;
                if (dps.combat == "null" && dps.durability == "null" && dps.intelligence == "null" && dps.power == "null" && dps.speed == "null" && dps.strength == "null"){
                    $("#chartContainer").html("No hay estadísticas de poder del héroe")
                }
                else{
                    //Ejecutar función de estadístifcas, si es que las hay
                    estadisticas()
                }
                
                function estadisticas(){
                    //Rescatar estadísticas
                    $("#chartContainer").html("");
                    let combate = dps.combat;
                    let durabilidad = dps.durability;
                    let inteligencia = dps.intelligence;
                    let poder = dps.power;
                    let velocidad = dps.speed;
                    let fuerza = dps.strength;
                    //Pintar estadísticas con CANVASJS
                    let chart = new CanvasJS.Chart("chartContainer", {
                        //theme: "transparent",
                        
                        theme: "light1",
                        animationDuration: 1000,
                        interactivityEnabled: true,
                        backgroundColor: "transparent",
                        exportEnabled: false,
                        animationEnabled: true,
                        title: {
                            text: `Estadísticas de poder`,
                            fontColor: "white",
                        },
                        legend: {
                            fontColor: "white"
                        },
                        data: [{
                            indexLabelFontColor: "white",
                            indexLabelLineColor: "white",
                            cursor: "pointer",
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y} ptos",
                            dataPoints: [
                                { y: combate, label: "Combate" },
                                { y: durabilidad, label: "Durabilidad" },
                                { y: inteligencia, label: "Inteligencia" },
                                { y: poder, label: "Poder" },
                                { y: velocidad, label: "Velocidad" },
                                { y: fuerza, label: "Fuerza" },
                            ]
                        }]
                    });
                    chart.render();
                };    
            }
        });
    };
});


//JS NORMAL


//Funcion de Números aleatorios
function aleatorio(){
    let numeroAleatorio = Math.ceil(Math.random() * 731);
    return(numeroAleatorio)
}
//Botón resetear cartas
let botonAleatorio = document.getElementById("resetear");
botonAleatorio.addEventListener("click", resetearCartas);

//Request
function resetearCartas(){
    //Limpiar ambos contenedores de img y volver a crear div-articles, porq en la función respuesta input se elimina el contenido 
    let cardContainer = document.getElementById("cardContainer");
    let chart = document.getElementById("chartContainer");
    cardContainer.textContent = "";
    chart.textContent = "";
    cardContainer.innerHTML = `<div class="container__cards">
    <article id="article1"></article>
    <article id="article2"></article>
    <article id="article3"></article>
    </div>`;
    chart.innerHTML = `<div class="container__cards">
    <article id="article4"></article>
    <article id="article5"></article>
    <article id="article6"></article>
    </div>`
    //Realiza 6 peticiones para refrescar la sección de cartas 
    
    for(let i = 1; i < 7; i++){
        //Se llama a la funcion "aleatorio" para asignar un nuevo número. entre el 1 y 732
        let nAleatorio = aleatorio();
        //Cambia la url según el numero aleatorio
        let url= `https://www.superheroapi.com/api.php/10227714366907498/${nAleatorio}`;
        //crear objeto
        const api = new XMLHttpRequest();
        //métodos objeto XMLHTTP
        api.open("GET", url, true);

        api.send();

        api.onreadystatechange = function (){
            //comprobar estado 200 y 4
            if (this.status == 200 && this.readyState == 4){
                //Transformar string a objeto
                let datos = JSON.parse(this.responseText);
                let imagen = datos.image.url;
                let article = document.getElementById(`article${i}`);
                article.innerHTML = "";
                article.innerHTML = `<img src="${imagen}" class="img">`;

            };
        };
    };
};
//PLUGINS
$(document).ready(function(){
    $("#submit").click((function(){
        $("#submit").parpadear();
    }));
    $("#resetear").click((function(){
        $("#resetear").parpadear();
    }));
    

});
    

