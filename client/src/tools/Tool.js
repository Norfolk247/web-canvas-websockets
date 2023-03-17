export default class Tool {
    constructor(canvas, socket, id) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext('2d')
        this.fill = true
        this.destroyHandlers()
    }

    destroyHandlers() {
        this.canvas.onmousemove = null
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
    }
    setFill(fill=true) {
        this.fill = fill
    }
    setFillColor(color) {
        this.ctx.fillStyle = color
    }
    setStrokeColor(color) {
        this.ctx.strokeStyle = color
    }
    setLineWidth(width) {
        this.ctx.lineWidth = width
    }
}