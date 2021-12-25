
class DeviceCardForUi {

    public device: Device;
    public htmlString: string;

    constructor (device: Device) {
        this.device = device;
        this.getHtmlString()
    }

    getHtmlString (): void {
   
      switch (this.device.type) {

        case 0: {
          this.htmlString =
            `<div 
                id="card_${this.device.id}"
                class="col s6 m4 l3 xl3" 
             >
                <div 
                  class="card deep-purple darken-4"
                >
                  <div class="card-content white-text">
                      
                      <div class="card_title">
                        ${this.device.name}
                      </div>

                      <div class="card_description">
                        ${this.device.description}
                      </div>

                      <div 
                        class="switch card_controller"
                        style="text-align: center;"
                      >
                          <label>
                              Apagado

                              <input 
                                id="switch_${this.device.id}" ${(this.device.state) ? "checked" : ""}
                                type="checkbox" 
                              >
                              <span class="lever"></span>
                              
                              Encendido
                          </label>
                      </div>
                  </div>

                  <div 
                    style="margin: 10px; text-align: center;"
                  >
                      <a 
                        id="modify_${this.device.id}"
                        class="waves-effect waves-light btn light-grey darken-2"
                        style="border-radius: 8px;"
                      >
                        Modificar Dispositivo
                      </a>
                  </div>

                  <div 
                    style="border-radius: 10px; margin: 10px; text-align: center; padding: 10px;"
                  >
                      <a 
                        id="delete_${this.device.id}"
                        class="waves-effect waves-light btn light-grey darken-2"
                        style="border-radius: 8px;"
                      >
                        Eliminar Dispositivo
                      </a>
                  </div>
                </div>
            </div>`

          break;
        }

        case 1: {
          this.htmlString =
            `<div 
              id="card_${this.device.id}"
              class="col s6 m4 l3 xl3" 
            >
                <div class="card deep-purple darken-4">
                  <div class="card-content white-text">
                      <div class="card_title">
                        ${this.device.name}
                      </div>
                      
                      <div class="card_description">
                        ${this.device.description}
                      </div>

                      <div 
                        class="range-field card_controller"
                        style="text-align: center;"
                      >
                          <input 
                            id="slider_${this.device.id}" 
                            type="range" 
                            min="0" 
                            max="100" 
                            value="${this.device.state * 100}"
                          />
                      </div>
                  </div>

                  <div 
                    style="margin: 10px; text-align: center;"
                  >
                    <a 
                      id="modify_${this.device.id}"
                      class="waves-effect waves-light btn light-grey darken-2" 
                      style="border-radius: 8px;"
                    >
                      Modificar Dispositivo
                    </a>
                  </div>

                  <div 
                    style="border-radius: 8px; padding: 10px; text-align: center;"
                  >
                    <a 
                      id="delete_${this.device.id}"
                      class="waves-effect waves-light btn light-grey darken-2"
                      style="border-radius: 8px;"
                    >
                      Eliminar Dispositivo
                    </a>
                  </div>
                </div>
              </div>
            </div>`

          break;
        }
      }
    }

    append (parent: HTMLElement): void {
      parent.innerHTML += this.htmlString;

      M.Dropdown.init(
        document.querySelectorAll('.dropdown-trigger'), 
        {}
      );
    }

    modifyDevice (newDevice: Device): void {
        this.device = newDevice;
        this.getHtmlString();

        document.getElementById("card_" + this.device.id).outerHTML = this.htmlString;
    }
}
