//1. Empezar Jquery.fn....nombre
//2. Siempre agregar ; al final
//3. Siempre agregar return
//4. "this" se refiere al elemento que recibirá este método plugin
//5. Con "this.each" iteramos todo el conjunto de elementos seleccionados
//6. Usar método fn siempre sobre "jquery" para posibles problemas más adelante, con método "noConflict()"
jQuery.fn.parpadear = function() {
    this.each(function(){
        elem = $(this);
        elem.fadeOut(100, function(){
            $(this).fadeIn(100);
        });
    });
    return this;
};
