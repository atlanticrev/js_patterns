class PhotoView {

    constructor(model, controller) {
        this.base = document.createElement("div");
        this.photoEl = document.createElement("div");
        this.base.appendChild(this.photoEl);

        model.addEventListener('update', () => this.render());

        this.photoEl.addEventListener('click', () => {
            controller.handleEvent('click', model);
        });
    }

    render () {
        this.photoEl.innerHTML = `<img src="#"/>`;
    }

    show () {
        this.photoEl.classList.add('show');
    }

    hide () {
        this.photoEl.classList.remove('show');
    }

}