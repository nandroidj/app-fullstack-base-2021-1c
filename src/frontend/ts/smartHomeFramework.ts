class SmartHomeFramework {

    deviceList: Array<Device> = [];
    deviceCardList: Array<DeviceCardForUi> = [];


    getElementById (id: string): HTMLElement {
        return document.getElementById(id);
    }

    getElementByEvent (event: Event): HTMLElement{
        return <HTMLElement>event.target;
    }

    requestGet (
      url: string, 
      listener: GetResponseListener
    ): void {
        
        let request: XMLHttpRequest;
        request = new XMLHttpRequest;

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200)
                    listener.handleGetResponse(
                      request.status, 
                      request.responseText
                    );
                else
                    listener.handleGetResponse(
                      request.status, 
                      null
                    );
            } 
        }

        request.open("GET", url, true);
        request.send(null);
    }

    requestPost (
      url: string, 
      listener: PostResponseListener, 
      data: any
    ): void {
        
        let request: XMLHttpRequest = new XMLHttpRequest;

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200)
                    listener.handlePostResponse(
                      request.status, 
                      request.responseURL, 
                      request.responseText
                    );
                else
                    listener.handlePostResponse(
                      request.status, 
                      request.responseURL, 
                      null
                    );
            } 
        }

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send( JSON.stringify(data) );
    }

    requestDelete (
      url: string, 
      listener: DeleteResponseListener, 
      data: any
    ): void {
        
        let request: XMLHttpRequest = new XMLHttpRequest;

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200)
                    listener.handleDeleteResponse(
                      request.status, 
                      request.responseText
                    );
                else
                    listener.handleDeleteResponse(
                      request.status, 
                      null
                    );
            } 
        }

        request.open("DELETE", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send( JSON.stringify(data) );
    }

    requestPatch (
      url: string, 
      listener: PatchResponseListener, 
      data: any
    ): void {
        
        let request: XMLHttpRequest = new XMLHttpRequest;

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200)
                    listener.handlePatchResponse(
                      request.status, 
                      request.responseText
                    );
                else
                    listener.handlePatchResponse(
                      request.status, 
                      null
                    );
            } 
        }

        request.open("PATCH", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send( JSON.stringify(data) );
    }


    getDeviceById (id: number): Device {
        
        let auxDevice: Device = undefined;

        this.deviceList.map(
          device => { if (device.id === id) auxDevice = device; }
        )

        return auxDevice;
    }


    getDeviceCardById (id: number): DeviceCardForUi {

        let auxDevice: DeviceCardForUi = undefined;

        this.deviceCardList.map(
          uiComponent => { if (uiComponent.device.id === id) auxDevice = uiComponent; }
        )

        return auxDevice;
    }

    removeDeviceById (id: number): void {
        this.deviceList.map(
          device => { if(device.id === id) this.deviceList.splice(device.id, 1) }
        )
    }

    removeUiComponentById (id: number): void {
        this.deviceCardList.map(
          device => { if(device.device.id === id) this.deviceCardList.splice(device.device.id, 1) }
        )
    }
}

interface GetResponseListener {
    handleGetResponse (status: number, response: string): void;
}

interface PostResponseListener {
    handlePostResponse (status: number, url: string, response: string): void;
}

interface DeleteResponseListener {
    handleDeleteResponse (status: number, response: string): void;
}

interface PatchResponseListener {
    handlePatchResponse (status: number, response: string): void;
}
