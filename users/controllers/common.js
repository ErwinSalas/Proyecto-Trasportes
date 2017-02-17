/**
 * common.js
 * Código común.
 */

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
const FIREBASE_PATH = "https://sideappprueba.firebaseio.com";
/**
 * Clave de encriptación.
 * @type {string}
 */
const ENCRYPTION_KEY = "AB82A2D2-B032-41A7-A87F-0AFBD55E4339";
/**
 * Última actualización local de mensajes.
 * @type {string} Identificador de elemento de almacenamiento local.
 */
const LS_LOCAL_LAST_UPDATE = "messages.localLastUpdate";
/**
 * Mensajes almacenados localmente.
 * @type {string} Identificador de elemento de almacenamiento local.
 */
const LS_LOCAL_MESSAGES = "messages.all";

/**
 * Recordar sesión.
 * @type {string} Determina si se debe recordar la sesión.
 */
const LS_REMEMBER_SESSION = "rememberSession";

// =========================================================


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
 * Encripta una cadena de texto con AES.
 * @param plainText Texto plano.
 * @param key Clave de encriptación.
 * @returns {*|string} Retorna una cadena de texto encriptada.
 */
function encryptText(plainText, key) {
  var encrypted = CryptoJS.AES.encrypt(plainText, key);
  return encrypted.toString();
}

/**
 * Desencripta una cadena de texto procesada con AES.
 * @param encryptedText Cadena de texto encriptada en AES.
 * @param key Clave para desencriptar.
 * @returns {*|string} Cadena de texto plano.
 */
function decryptText(encryptedText, key) {
  var decrypted = CryptoJS.AES.decrypt(encryptedText, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
