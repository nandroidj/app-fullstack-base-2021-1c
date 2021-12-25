const api = require("./api");


/**
 * Agrega al objeto app de express las rutas relacionadas con el módulo
 * de devices
 * @param  app objeto de express
 */
module.exports = (app) => {
 
  /**
     * @route deviceById
     * @description route en caso exitoso, recupera el dispositivo segun el Id, e.o.c., HTTP status 500
  */
  app.get("/devices/:id", [
      api.getDeviceById
  ]);

  /**
   * @route deviceList
   * @description route en caso exitoso, recupera la lista de dispositivos, e.o.c., HTTP status 400
  */
  app.get("/devices", [
      api.getDeviceList
  ]);
 
  /**
   * @route setNewDevice
   * @description route en caso exitoso, crea un nuevo dispositivo, e.o.c., HTTP status 500
  */
  app.post("/devices", [
      api.setNewDevice
  ])

  /**
   * @route setModifyDevice
   * @description route en caso exitoso, modifica el dispositivo segun el Id, e.o.c., HTTP status 400/500
  */
  app.patch("/devices", [
      api.setModifyDevice
  ])


   /**
   * @route setDeleteDevice
   * @description route en caso exitoso, borra el dispositivo segun el Id, e.o.c., HTTP status 400
  */
  app.delete("/devices/:id", [
      api.setDeleteDevice
  ])

  /**
   * @route setDeleteDevice
   * @description route en caso exitoso, borra el dispositivo segun el Id, e.o.c., HTTP status 400
  */
  app.post("/devices/state", [
      api.setDeviceState
  ]);
    
}
