var CRONO = (function(){
   var t, crono,cambiar_button,inicializar_button ;
   var init = function(){
     crono = document.getElementById("crono");
   };
   var mostrar = function()  {
     crono.innerHTML = (+crono.innerHTML + 0.1).toFixed(1);
   };
   var arrancar = function() {
     t=setInterval(mostrar, 100);
   };
   var parar = function()    {
     clearInterval(t);  t=undefined;
   };
   var cambiar = function()  {
     if (!t) arrancar();
     else parar();
   };
   var inicializar = function(){
     crono.innerHTML = "0.0";
   };
   return {
     init: init,
     cambiar: cambiar,
     inicializar: inicializar
   }
})();
