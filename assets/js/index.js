$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();

        let input = $("#input").val();

        let validacion = validarInput(input);
        if (validacion == true){
            console.log("correcto");
            respuestaInput(input);
        } 
        else{
            console.log("solo numeros");
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
                let imagen = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections['group-affiliation'];
                let publicado = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let aparicion = data.biography['first-appearance'];
                let altura = data.appearance.height[1];
                let peso = data.appearance.weight[1];
                let alianzas = data.biography.aliases.join(", ");

                console.log(data)
                $(".hero__card").html(`
                <div class="hero__img"><img src="${imagen}"></div>
                <div class="hero__info">
                    <p>Nombre: <span>${nombre}</span></p>
                    <p>Conexiones: <span>${conexiones}</span></p>
                    <p>Publicado por: <span>${publicado}</span></p>
                    <p>Ocupación: <span>${ocupacion}</span></p>
                    <p>Aparición: <span>${aparicion}</span></p>
                    <p>Altura: <span>${altura}</span></p>
                    <p>Peso: <span>${peso}</span></p>
                    <p>Alianzas: <span>${alianzas}</span></p>
                </div>
                </div>
                `);

                console.log(data.powerstats)
                console.log(data.powerstats.combat)
                console.log(data.powerstats.durability)
                console.log(data.powerstats.intelligence)
                console.log(data.powerstats.power)
                console.log(data.powerstats.speed)
                console.log(data.powerstats.strength)
                
                let chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light1", 
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: "Desktop Browser Market Share in 2016"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: [
                            { y: 51.08, label: "Chrome" },
                            { y: 27.34, label: "Internet Explorer" },
                            { y: 10.62, label: "Firefox" },
                            { y: 5.02, label: "Microsoft Edge" },
                            { y: 4.07, label: "Safari" },
                            { y: 1.22, label: "Opera" },
                            { y: 200, label: "Others" }
                        ]
                    }]
                });
                chart.render();
                    
                
            }

        });
    };

});