const method = require("./method");


/**
 * @title getDeviceById
 * @description getter deviceById ? http 200 : http 400
 * @param {request: Object}
 * @returns {response: Object} 
*/
exports.getDeviceById = async (request, response) => {
    try {
      let device = await method.getDeviceById( parseInt(request.params.id) );
      
      response
        .status(200)
        .send(device);
    
    } catch (error) {
        response
          .status(400)
          .send(
            { errores: ["Device Id not found."] }
          );
    }
}


/**
 * @title getDeviceList 
 * @description getter deviceList ? http 200 : http 500
 * @param {request: Object}
 * @returns {response: Object} 
*/
exports.getDeviceList = async (request, response) => {
    try {
      let deviceList = await method.getDeviceList();

      response
        .status(200)
        .send(deviceList);

    } catch (error) {
      response
        .status(500)
        .send();
    }
}


/**
 * @title setNewDevice
 * @description setter device ? http 200 : http 500
 * @param {request: Object}
 * @returns {response: Object} 
*/
exports.setNewDevice = async (request, response) => {
    try {
      let device = await method.setNewDevice(request.body);
  
      response
        .status(200)
        .send(device);
    
    } catch (error) {
      response
        .status(500)
        .send();
    }
}


/**
 * @title setModifyDevice
 * @description setter device ? http 200 : http 400/500
 * @param {request: Object}
 * @returns {response: Object} 
*/
exports.setModifyDevice = async (request, response) => {
    try {
        let device = await method.setModifyDevice(request.body);
        
        response
          .status(200)
          .send(device);
    } catch (error) {
        if (error == "Device do not exist.")
            response
              .status(400)
              .send(
                { errores: ["Device not found."] }
              );
        else 
            response
              .status(500)
              .send();
    }
}


/**
 * @title setDeleteDevice
 * @description setter device ? http 200 : http 400
 * @param {request: Object}
 * @returns {response: Object} 
*/
exports.setDeleteDevice = async (request, response) => {
    try {
        letdeletedDevice = await method.setDeleteDevice( parseInt(request.params.id) );
        
        response
          .status(200)
          .send( deletedDevice );
    }
    catch (error) {
        response
          .status(400)
          .send(
            { errores: ["Device Id not found."] }
          );
    }
}


/**
 * @title setDeviceState
 * @description setter device ? http 200 : http 400
 * @param {request: Object}
 * @returns {response: Object} 
*/
exports.setDeviceState = async (request, response) => {
    try {
        let deviceSet = await method.setDeviceState(request.body);
        
        response
          .status(200)
          .send(deviceSet);
    }
    catch (error) {
        response
          .status(400)
          .send(
            { errores: ["Device Id not found."] }
          );
    }
}

