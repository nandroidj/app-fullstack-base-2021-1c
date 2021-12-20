class SmartHomeFramework {
    
    deviceList: Array<Device> = [];

    deivceCardList: Array<DeviceCard> = [];


    getElementById (id: string): HTMLElement {
        return document.getElementById(id);
    }

    getElementByEvent (ev: Event): HTMLElement{
        return <HTMLElement>ev.target;
    }

    getDeviceById (id: number): Device {

        let ret: Device = undefined;

        this.deviceList.forEach( device => 
          {
            if (device.id === id)
                ret = device;
          }
        )

        return ret;
    }

    getDeviceCardById (id: number): DeviceCard {
       
        let ret: DeviceCard = undefined;

        this.deivceCardList.forEach( deviceCard => 
          {
            if (deviceCard.device.id === id)  ret = deviceCard;
          }
        )

        return ret;
    }

    deleteDeviceById (id: number): void {

      this.deviceList.map( device => {
          if ( device.id === id ) this.deviceList.splice(device.id, 1)
        }
      )
    }

    deleteDeviceCardById (id: number): void {
     
      this.deivceCardList.map(deviceCard => {
          if (deviceCard.device.id === id) this.deivceCardList.splice(deviceCard.device.id, 1);
        }
      )
    }


    requestGET (
      url: string, 
      listener: GETResponseListener
    ): void {
     
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
    
            if (xhr.readyState == 4) {
                if (xhr.status == 200)  listener.handleGETResponse(xhr.status, xhr.responseText);
                else  listener.handleGETResponse(xhr.status, null);
            } 
        }

        xhr.open("GET", url, true);
        xhr.send(null);
    }


    requestPOST (
      url: string, 
      listener: POSTResponseListener, 
      data: any
    ): void {
        
        let xhr: XMLHttpRequest = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200)  listener.handlePOSTResponse(xhr.status, xhr.responseURL, xhr.responseText);
                else  listener.handlePOSTResponse(xhr.status, xhr.responseURL, null);
            } 
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }

    requestPATCH (
      url: string, 
      listener: PATCHResponseListener, 
      data: any
    ): void {
    
        let xhr: XMLHttpRequest = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200)  listener.handlePATCHResponse(xhr.status, xhr.responseText);
                else  listener.handlePATCHResponse(xhr.status, null);
            } 
        }

        xhr.open("PATCH", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }


    requestDELETE (
      url: string, 
      listener: DELETEResponseListener, 
      data: any
    ): void {
    
        let xhr: XMLHttpRequest = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200)  listener.handleDELETEResponse(xhr.status, xhr.responseText);
                else  listener.handleDELETEResponse(xhr.status, null);
            } 
        }

        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
}


interface GETResponseListener {
    handleGETResponse (
      status: number, 
      response: string
    ): void;
}

interface POSTResponseListener {
    handlePOSTResponse (
      status: number, 
      url: string, 
      response: string
    ): void;
}

interface PATCHResponseListener {
    handlePATCHResponse (
      status: number, 
      response: string
    ): void;
}

interface DELETEResponseListener {
    handleDELETEResponse (
      status: number, 
      response: string
    ): void;
}
