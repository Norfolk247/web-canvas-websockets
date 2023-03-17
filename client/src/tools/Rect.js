import Tool from "./Tool";

export default class Rect extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }
    mouseUpHandler() {
        this.mouseDown = false
    }
    mouseMoveHandler(e) {
        if(this.mouseDown) {
            let width = e.pageX - e.target.offsetLeft - this.x
            let height = e.pageY - e.target.offsetTop - this.y
            this.draw(this.x,this.y,width,height)
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
    draw(x,y,w,h) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x,y,w,h)
            if (this.fill) {this.ctx.fill()}
            this.ctx.stroke()
        }
    }
}