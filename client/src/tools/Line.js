import Tool from "./Tool";

export default class Line extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }
    mouseUpHandler() {
        this.mouseDown = false
    }
    mouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(e.pageX-e.target.offsetLeft,e.pageY-e.target.offsetTop)
        }
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.x = e.pageX-e.target.offsetLeft
        this.y = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }
    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }
    draw(x,y) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.x,this.y)
            this.ctx.lineTo(x,y)
            this.ctx.stroke()
        }
    }
}