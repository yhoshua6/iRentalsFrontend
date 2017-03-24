/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .service("toastServices", toastServices);

  toastServices.$inject = ["$mdToast"];
  function toastServices($mdToast) {
    var toastScope = this;

    toastScope.toastIt = function(status, prefix) {
      switch (status) {
        case 200:
        case 201:
        case 204:
          show(getIconsAndMessages(prefix + "_success"));
        break;
        case 401:
          show(getIconsAndMessages(prefix + "_failure"));
        break;
        default:
          show(getIconsAndMessages("server_error"));
        break;
      }
    }

    function show(options) {
      toastScope.icon = options.icon;
      toastScope.message = options.message;
      $mdToast.show({
        templateUrl: "../../views/toasts/message_template.html",
        hideDelay: 2500,
        position: "top right",
        controller: "toastCtrl",
        controllerAs:"toastCtrl"
      });
    };

    function getIconsAndMessages(performedAction) {
      var toastElement = {};
      switch (performedAction) {
        case "session_success":
          toastElement.icon = "verified_user";
          toastElement.message = "Iniciaste sesion!";
        break;

        case "session_failure":
          toastElement.icon = "highlight_off";
          toastElement.message = "Usuario/Contraseña invalidos";
        break;

        case "create_record_success":
          toastElement.icon = "create";
          toastElement.message = "Se creó correctamente el registro.";
        break;

        case "create_record_failure":
          toastElement.icon = "remove_circle_outline";
          toastElement.message = "No estas autorizado para crear un nuevo registro.";
        break;

        case "update_field_success":
          toastElement.icon = "loop";
          toastElement.message = "Se actualizó correctamente el campo.";
        break;

        case "update_field_failure":
          toastElement.icon = "error_outline";
          toastElement.message = "No estas autorizado para actualizar el campo.";
        break;

        case "delete_record_success":
          toastElement.icon = "delete_sweep";
          toastElement.message = "Se borró correctamente el registro.";
        break;

        case "delete_record_failure":
          toastElement.icon = "report";
          toastElement.message = "No estas autorizado para borrar el registro.";
        break;

        case "file_upload_success":
          toastElement.icon = "file_upload";
          toastElement.message = "Se subió el archivo correctamente.";
          break;

        case "file_get_success":
          toastElement.icon = "file_upload";
          toastElement.message = "get archivo success.";
          break;

        case "file_get_failure":
          toastElement.icon = "file_upload";
          toastElement.message = "get archivo failure.";
          break;

        case "file_upload_failure":
          toastElement.icon = "error_outline";
          toastElement.message = "No se pudo subir el archivo al servidor.";
          break;

        default:
          toastElement.icon = "report_problem";
          toastElement.message = "Hubo un error con el servidor. Si los errores persisten contacte al administrador.";
      }

      return toastElement;
    };

  }
})();
