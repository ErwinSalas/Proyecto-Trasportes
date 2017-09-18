
function checkUserType(path) {
  var user = JSON.parse( localStorage.getItem('session.owner') );

  if(user == null){
    signOut()
  }
  if((user.userType == "Customer" && path != "users") || (user.userType == "Admin" && path != "admin")){
    signOut();
  }
}

var closeSideBar=function () {
  var $window = $(window);
  console.log($window.width());
  if($window.width()<=1000){
    var $body = $('body');
    var $overlay = $('.overlay');
    $body.toggleClass('overlay-open');
    if ($body.hasClass('overlay-open')) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
  }

};
// ===== CONSTANTES ========================================

/**
 * Meses del calendario gregoriano en español.
 * @type {string[]} Meses.
 */
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
/**
 * URL raíz de la base de datos.
 * @type {string}
 */
//const FIREBASE_PATH = "https://sideappprueba.firebaseio.com";
/**
 * Clave de encriptación.
 * @type {string}
 */
//const ENCRYPTION_KEY = "AB82A2D2-B032-41A7-A87F-0AFBD55E4339";
/**
 * Última actualización local de mensajes.
 * @type {string} Identificador de elemento de almacenamiento local.
 */
//const LS_LOCAL_LAST_UPDATE = "messages.localLastUpdate";
/**
 * Mensajes almacenados localmente.
 * @type {string} Identificador de elemento de almacenamiento local.
 */
//const LS_LOCAL_MESSAGES = "messages.all";

/**
 * Recordar sesión.
 * @type {string} Determina si se debe recordar la sesión.
 */
//const LS_REMEMBER_SESSION = "rememberSession";

// =========================================================

/**
 * Dirección raíz del API.
 * @type {string}
 */
//const API_ROOT = "http://172.19.32.10:1901"
const API_ROOT = "http://transportec-api.azurewebsites.net";
const IMG_ROOT_F = "http://transportec.s3.amazonaws.com/resources/fleet/";
const IMG_ROOT_D = "http://transportec.s3.amazonaws.com/resources/driver/";

/**
 * Formatea una cadena de texto en base a los parámetros proporcionados.
 * Tomado de: http://stackoverflow.com/a/4256130/3288599
 * @returns {String} Cadena de texto con formato aplicado.
 */
String.prototype.format = function() {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

/**
 * Aplica formato a una fecha.
 * @param dt Fecha.
 * @returns {String} Fecha con formato aplicado.
 */
function getFormattedDate(dt) {
  return "{0} de {1} de {2}, {3}:{4} {5}".format(
    dt.getDate(), months[dt.getMonth()], dt.getFullYear(),
    dt.getHours() >= 12 ? dt.getHours() - 12 : dt.getHours(), dt.getMinutes(), dt.getHours() >= 12 ? "PM" : "AM"
  );
}

/**
 * Convierte una fecha a formato para enviar solicitud al servidor.
 * @param datetime Objeto de fecha y hora.
 * @returns {String} Fecha formateada.
 */
function dateToUrlParameter(datetime) {
    return "{0}-{1}-{2}-{3}-{4}".format(
        datetime.getFullYear(),
        datetime.getMonth() + 1,
        datetime.getDate(),
        datetime.getHours(),
        datetime.getMinutes());
}

function datetimeToUrlParameter(date, time) {
    console.log(time);
    return "{0}-{1}".format(date, time.replace(':', '-'));
}

/**
 * Genera una fecha en formato ISO8601 a partir de una fecha y una hora.
 * @param date Fecha.
 * @param time Hora.
 * @returns {String} Fecha y hora fusionada en formato ISO8601.
 */
function datetimeToISO8601(date, time) {
  return "{0}T{1}".format(date, time);
}
function signOut(){
  localStorage.clear();
  window.location.href = ('../index.html');

}
