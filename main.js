//Service worker
if('serviceWorker' in navigator){
    console.log("Si existe service worker en el navegador");

    navigator.serviceWorker.register('./sw.js')
                           .then(res => console.log("service worker cargado correctamente", res))
                           .catch(err => console.log("service worker no fue cargado", err));
}
else{
    console.log("No existe service workere ne le navegador");
}


//Scroll suavizado
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault();
        $("html,body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        
        return false;
    });   
});