declare var M;


class 
  Main  
implements 
  EventListenerObject, 
  GetResponseListener, 
  PostResponseListener, 
  DeleteResponseListener, 
  PatchResponseListener 
{
    smartHomeFramework: SmartHomeFramework;
    deviceToModify: Device;

    main () {

        this.smartHomeFramework = new SmartHomeFramework();

        this.smartHomeFramework.requestGet("/devices", this);
        
        document.getElementById("main_container_devices").addEventListener("click", this);
    }


    handleEvent (event: Event): void {
        
        let element = <HTMLInputElement>this.smartHomeFramework.getElementByEvent(event);


        if (event.type === "click") {
          
            if (element.id === "newDevice") {
                
              let nameInput = <HTMLInputElement>this.smartHomeFramework.getElementById("modal_new_device_name");
              let descriptionInput = <HTMLInputElement>this.smartHomeFramework.getElementById("modal_new_device_description");
              let typeInput = <HTMLSelectElement>this.smartHomeFramework.getElementById("modal_new_device_type");

              nameInput.value = "";
              descriptionInput.value = "";
              typeInput.value = "0";

              M.FormSelect.init(
                document.querySelectorAll('select'), 
                {}
              );

              M.Modal.getInstance(
                <any>document.getElementById("modal_new_device")
              ).open();
            
            } else if (element.id === "modal_new_device_create") {
                // Se hizo click en el botón Crear del modal de nuevo dispositivo

                // Se obtienen los valores de cada uno de los campos
                let name = (<HTMLInputElement>this.smartHomeFramework.getElementById("modal_new_device_name")).value;
                let description = (<HTMLInputElement>this.smartHomeFramework.getElementById("modal_new_device_description")).value;
                let type = parseInt((<HTMLSelectElement>this.smartHomeFramework.getElementById("modal_new_device_type")).value);
                let icon = (<HTMLSelectElement>this.smartHomeFramework.getElementById("modal_new_device_icon")).value;

                if (name !== "" && description !== "") {
                    this.smartHomeFramework.requestPost(
                      "/devices", 
                      this,
                      {
                        name: name,
                        description: description,
                        type: type,
                        icon: icon
                      }
                    );
                }
            
            } else if (element.id === "modal_modify_device_modify") {
                                
                let name = (<HTMLInputElement>this.smartHomeFramework.getElementById("modal_modify_device_name")).value;
                let description = (<HTMLInputElement>this.smartHomeFramework.getElementById("modal_modify_device_description")).value;

                if (name !== "" && description !== "") {
                    this.smartHomeFramework.requestPatch(
                      "/devices", 
                      this, 
                      {
                        id: this.deviceToModify.id,
                        name: name,
                        description: description,
                        type: this.deviceToModify.type,
                        state: this.deviceToModify.state
                      }
                    );
                }

            } else {
                
                if (element.id.includes("_")) {

                    let elems = element.id.split("_");
                    let action = elems[0];
                    let deviceId = parseInt(elems[1]);
                    let device = this.smartHomeFramework.getDeviceById(deviceId);
        
                    if (action === "modify") {
                        
                      this.deviceToModify = device;

                      let nameInput = <HTMLInputElement>this.smartHomeFramework.getElementById("modal_modify_device_name");
                      let descriptionInput = <HTMLInputElement>this.smartHomeFramework.getElementById("modal_modify_device_description");
                      
                      nameInput.value = device.name;
                      descriptionInput.value = device.description;

                      M.FormSelect.init(
                        document.querySelectorAll('select'), 
                        {}
                      );

                      M.Modal.getInstance(
                        <any>document.getElementById("modal_modify_device")
                      ).open();
                        
                    } else if (action === "delete") {
                        this.smartHomeFramework.requestDelete(
                          "/devices/" + deviceId, 
                          this, 
                          {}
                        );

                    } else if (action === "switch") {

                        device.state = (element.checked)? 1 : 0;
    
                        this.smartHomeFramework.requestPost(
                          "/devices/state", 
                          this,
                          {"id": deviceId, "state": device.state}
                        );

                    } else if (action === "slider") {

                        device.state = parseInt(element.value)/100;
    
                        this.smartHomeFramework.requestPost(
                          "/devices/state", 
                          this, 
                          {"id": deviceId, "state": device.state}
                        );
                    }
                }
            }
        }
    }

    handleGetResponse(
      status: number,
      response: string
    ): void {
        if (status == 200) {

            this.smartHomeFramework.deviceList = JSON.parse(response);
            this.smartHomeFramework.deviceList.map( 
              device => {  
                let newCard = new DeviceCardForUi(device);

                this.smartHomeFramework.deviceCardList.push(newCard);

                newCard.append(
                  document.getElementById("main_container_devices_list")
                );
              }
            );
            
        }
    }

    handlePostResponse (
      status: number, 
      url: string, 
      response: string
    ): void {

        if (url.endsWith("devices")){
            
            let newDevice: Device = JSON.parse(response);
            let newCard: DeviceCardForUi = new DeviceCardForUi(newDevice);

            this.smartHomeFramework.deviceList.push(newDevice);
            this.smartHomeFramework.deviceCardList.push(newCard);

            newCard.append(
              document.getElementById("main_container_devices_list")
            );
        }
    }

    handleDeleteResponse (
      status: number,
      response: string
    ): void {
        if (status == 200) {

            let parsedResponse = JSON.parse(response);
            this.smartHomeFramework.removeDeviceById(parsedResponse.id);
            this.smartHomeFramework.removeUiComponentById(parsedResponse.id);

            document.getElementById("card_" + parsedResponse.id)
                    .remove();
        }
    }

    handlePatchResponse (
      status: number, 
      response: string
    ): void {
        if (status == 200) {
            
            let modifiedDevice: Device = JSON.parse(response);
            
            let originalDevice = this.smartHomeFramework.getDeviceById(modifiedDevice.id);

            originalDevice.name = modifiedDevice.name;
            originalDevice.description = modifiedDevice.description;

            this.smartHomeFramework
                .getDeviceCardById(originalDevice.id)
                .modifyDevice(originalDevice);
        }
    }
}


window.onload = function () {
    let main : Main = new Main();

    main.main();
    
    M.Modal.init(
      document.querySelectorAll('.modal'), 
      {}
    );

    M.FormSelect.init(
      document.querySelectorAll('select'),
      {}
    );
}
