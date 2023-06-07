class MqOverlay {
  constructor(sizes, autoHide) {
    const defaultSizes = {
      'screen-xs': 360,
      'screen-sm': 768,
      'screen-md': 1024,
      'screen-lg': 1200,
      'screen-xl': 1440,
    };

    this.sizes = sizes || defaultSizes;
    this.autoHide = autoHide || false;
    
    
    this.overlay = document.createElement("mq-overlay");
    this.overlay.classList.add("mq-overlay");
    this.overlay.setAttribute("text", "");
    this.overlay.setAttribute("width", "");

    this.button = document.createElement("button");
    this.button.classList.add("mq-overlay-button");
    this.button.setAttribute("title", this.autoHide ? "Auto hide off": "Auto hide on");
    this.button.addEventListener("click", this.toggleOverlay);
    this.overlay.appendChild(this.button);
    
    this.close = document.createElement("button");
    this.close.classList.add("mq-overlay-close");
    this.close.innerHTML = "x";
    this.close.setAttribute("title", "Remove");
    this.close.addEventListener("click", this.removeOverlay);
    this.overlay.appendChild(this.close);
    
    document.body.appendChild(this.overlay);

    
    var css = document.createElement("style");
    css.type = "text/css";
    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));
    document.head.appendChild(css);
    
    this.render();
    window.addEventListener("resize", this.render);

    //debounce resize
    // let resizeTimer;
    // window.addEventListener("resize", () => {
    //   clearTimeout(resizeTimer);
    //   resizeTimer = setTimeout(this.handleResize, 50);
    // })

    if (this.autoHide) {
      this.trackMouse(true);
      this.toggleHidden(true);
    }
  }

  trackMouse = (value) => {
    if (value) document.addEventListener("mousemove", this.handleMouseMove);
    else document.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseMove = e => {
    const x = e.clientX;
    const y = e.clientY;

    if (x > window.innerWidth - 300 && y > window.innerHeight - 30) {
      this.toggleHidden(false);
    } else {
      this.toggleHidden(true);
    }
  }

  toggleHidden = (value) => {
    this.overlay.classList.toggle("hidden", value);
  }

  removeOverlay = () => {
    this.overlay.remove();
    window.removeEventListener("resize", this.render);
    document.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleResize = () => {
    this.render();
  };

  render = () => {
    const w = window.innerWidth;
    const a = Object.keys(this.sizes)
    let i = a.findIndex(key => this.sizes[key] > w);
    if (i === -1) i = a.length;
    
    const s = a[i-1];
    this.toggleHidden(!s);
    if (s) {
      this.overlay.setAttribute("text", s);
      this.overlay.setAttribute("width", this.sizes[s]);
    }
  };

  toggleOverlay = () => {
    this.autoHide = !this.autoHide;
    this.trackMouse(this.autoHide);
    this.toggleHidden(this.autoHide);
    this.button.setAttribute("title", this.autoHide ? "Auto hide off": "Auto hide on");
  };
}

export default MqOverlay;

const styles = `
.mq-overlay {
  position: fixed;
  z-index: 999999;
  bottom: 0;
  right: 0;
  width: auto;
  height: auto;
  padding: 3px 30px 3px 10px;
  border: 1px solid rgb(200, 200, 200, 1);
  background-color: rgb(200, 200, 200, 0.5);
  opacity: 0.3;
  pointer-events: none;
  font-family: monospace;
  font-weight: 300;
  font-size: 12px;
}

.mq-overlay::after {
  content: attr(text) " ≥ " attr(width) "px";
}

.mq-overlay.hidden {
  visibility: hidden;
}

.mq-overlay-button {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  background: transparent;
  appearance: none;
  border: none;
  cursor: pointer;
}

.mq-overlay-close {
  pointer-events: auto;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  background: transparent;
  border: none;
  border-left: 1px solid rgb(200, 200, 200, 1);
}
.mq-overlay-close:hover {
  background: rgb(200, 200, 200, 1);
}
`;
