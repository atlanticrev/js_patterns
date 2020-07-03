class PhotoController {

    constructor (item) {
        this.item = item;
    }

    init () {
        this.item.bind("update", this.proxy(this.render));
        this.item.bind("destroy", this.proxy(this.remove));
    }

    render () {
        // Handle templating
        this.replace($("#photoTemplate").tmpl(this.item));
        return this;
    }

    remove () {
        this.el.remove();
        this.release();
    }

}