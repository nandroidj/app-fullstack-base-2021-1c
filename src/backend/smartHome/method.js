const deviceList = require("./devices.json");


/** type Device = {
 *  id: number
 *  name: string
 *  description: string
 *  state: boolean
 *  type: boolean
 * }
**/


/**
 * @title getDeviceById 
 * @description getter que solicita la informacion de un dispositivo a partir de su identificador 
 * @param {deviceId: number}
 * @returns {Promise<Device>} 
*/
exports.getDeviceById = (id) => 
  new Promise (
    (resolve, reject) => {

        let deviceMatch = deviceList.filter( 
          device => device.id === id
        )

      if (deviceMatch.length > 0)
        resolve(deviceMatch[0]);
      else
        reject();
    }
  );


/**
 * @title getDeviceList
 * @description getter que solicita el listado de dispositivos al archivo devices.json 
 * @param {*} 
 * @returns {Promise<List<Device>>} 
*/
exports.getDeviceList = () => 
  new Promise(
    (resolve, reject) => {
      resolve(deviceList);
    }
  )


/**
 * @title setNewDevice
 * @description setter recibe los campos del tipo Device y retorna una promesa.
 * @param {Device} 
 * @returns {Promise<void>} 
*/
exports.setNewDevice = (data) => 
  new Promise (
    (resolve, reject) => {
        
        let device = {
            id: Date.now(),
            name: data.name,
            description: data.description,
            type: data.type,
            state: 0.0 
        }

        deviceList.push(device);

        resolve(device);
    }
  );


/**
 * @title setModifyDevice
 * @description setter solicita los campos del tipo Device y retorna una promesa.
 * @param {Device} 
 * @returns {Promise<void>} 
*/
exports.setModifyDevice = (data) => 
  new Promise (
    async (resolve, reject) => {

        try {
           
          let device = await this.getDeviceById(parseInt(data.id));

            device.name = data.name;
            device.description = data.description;
            device.state = data.state;

            resolve(device)
        }
        catch (error) {
            reject("No existe el dispositivo")
        }
    }
  );


/**
 * @title setDeleteDevice
 * @description setter solicita el identificador del dispositivo y retorna una promesa.
 * @param {Id: number} 
 * @returns {Promise<void>} 
*/
exports.setDeleteDevice = (id) => 
  new Promise (
    (resolve, reject) => {
    
      let deleteState = false;

        for ( let i = 0; i < deviceList.length; i++ ) {
            if (deviceList[i].id === id) {
                deviceList.splice(i, 1);
                deleteState = true;
                break;
            }
        }

        if (deleteState)
            resolve ({id: id});
        else
            reject();
    }
  );


/**
 * @title setDeviceState
 * @description setter pide el Id y el estado del dispositivo a modificar, y devuelve una promesa.
 * @param {id, state} 
 * @returns {Promise<void>} 
*/
exports.setDeviceState = (data) => 
  new Promise (
    (resolve, reject) => {
     
      let deviceMatch = deviceList.filter(
        device => device.id === data.id
      );

      if (deviceMatch.length > 0) {

          deviceMatch[0].state = data.state;
          
          resolve(deviceMatch[0]);
      }
      else
          reject();
    }
  );

