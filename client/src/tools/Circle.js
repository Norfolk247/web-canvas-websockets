import Tool from "./Tool";

export default class Circle extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }
    mouseUpHandler() {
        this.mouseDown = false
    }
    mouseMoveHandler(e) {
        if(this.mouseDown) {
            let width = Math.abs(this.x-e.pageX+e.target.offsetLeft)
            let height = Math.abs(this.y-e.pageY + e.target.offsetTop)
            let radius = Math.sqrt(width**2+height**2)
            this.draw(this.x,this.y,radius)
        }
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.x = e.pageX - e.target.offsetLeft
        this.y = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }
    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }
    draw(x,y,r) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x,y,r,0,2*Math.PI)
            if (this.fill) {this.ctx.fill()}
            this.ctx.stroke()
        }
    }
}