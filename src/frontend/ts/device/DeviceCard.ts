declare var M;


class DeviceCard {

    public htmlString: string;
    public device: Device;

    constructor (device: Device) {
        this.getHtmlString()
        this.device = device;
    }

    
    append (parent: HTMLElement): void {
    
        parent.innerHTML += this.htmlString;

        // Se inicializa el dropdown de las cards
        let dropdown = document.querySelectorAll('.dropdown-trigger');
        let instance = M.Dropdown.init(dropdown, {});
    }


    modifyDevice (newDevice: Device): void {
        
        this.device = newDevice;
        this.getHtmlString();

        document.getElementById("card_" + this.device.id).outerHTML = this.htmlString;
    }


    getHtmlString (): void {
        
      if ( this.device.type == 0 ) {

        this.htmlString = 
         
         `<div 
            id="card_${this.device.id}"
            class="col s6 m6 6 x6" 
          >
            <div 
              class="card deep-blue darken-3"
            >
              <div class="card-content white-text">
                <div 
                  id='dropdown_${this.device.id}' 
                  data-target='dropdown_content_${this.device.id}'
                  class='card_dots dropdown-trigger' 
                >
                    <img src="static/images/dots_white.png">
                </div>

                <div class="card_icon">
                  <i class = "material-icons medium">home</i>  
                </div>
                    
                    <div class="card_title">
                      ${this.device.name}
                    </div>
                    
                    <div class="card_description">
                      ${this.device.detail}
                    </div>

                    <div class="switch card_control">
                        <label>
                            OFF
                            <input 
                              type="checkbox" 
                              id="switch_${this.device.id}" 
                                ${(this.device.state)? "checked": ""}
                            >
                            <span class="lever"></span>
                            ON
                        </label>
                    </div>
                </div>
            </div>

                <ul 
                  id='dropdown_content_${this.device.id}' 
                  class='dropdown-content indigo lighten-4'
                >
                    <li>
                      <a id="modify_${this.device.id}">
                        Modificar
                      </a>
                    </li>

                    <li>
                      <a id="delete_${this.device.id}">
                        Eliminar
                      </a>
                    </li>
                </ul>
            </div>`
        
      } else if (this.device.type == 1) {
            this.htmlString = 
            `<div 
              id="card_${this.device.id}"
              class="col s6 m6 6 x6" 
            >
              <div class="card deep-purple darken-3">
                <div class="card-content white-text">
                  <div 
                    id='dropdown_${this.device.id}' 
                    data-target='dropdown_content_${this.device.id}'
                    class='card_dots dropdown-trigger' 
                  >
                    <img src="static/images/dots_white.png">
                  </div>

                  <div class="card_icon">
                    <i class = "material-icons medium">home</i>  
                  </div>
                        
                  <div class="card_title">
                    ${this.device.name}
                  </div>
                  
                  <div class="card_description">
                    ${this.device.detail}
                  </div>

                  <div class="range-field card_control">
                    <input 
                      type="range"
                      id="slider_${this.device.id}"
                      value="${this.device.state * 100}"
                      min="0" 
                      max="100" 
                    />
                  </div>
                </div>
              </div>

              <ul 
                id='dropdown_content_${this.device.id}' 
                class='dropdown-content indigo lighten-4'
              >
                <li>
                  <a id="modify_${this.device.id}">Modificar</a>
                </li>
                    
                <li>
                  <a id="delete_${this.device.id}">Eliminar</a>
                </li>
              </ul>
          </div>`
        }
    }
}
