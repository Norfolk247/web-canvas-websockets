import Brush from "./Brush";

export default class Eraser extends Brush {
    mouseDownHandler(e) {
        super.mouseDownHandler(e);
        this.prevColor = this.ctx.strokeStyle
        this.ctx.strokeStyle = 'white'
    }
    mouseUpHandler() {
        super.mouseUpHandler();
        console.log(this.prevColor,this.ctx.strokeStyle)
        this.ctx.strokeStyle = this.prevColor
    }
}