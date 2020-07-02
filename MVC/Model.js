class Photo {

    constructor (config) {
        this.src = config.src;
        this.caption = config.caption;
        this.viewed = config.viewed;
    }

    init () {

    }

}

class PhotoCollection {

    constructor() {
        this.model = Photo;
        this.listOfPhotos = [];
    }

    viewed () {
        return this.listOfPhotos.filter(photo => photo.viewed);
    }

    unviewed () {
        return this.listOfPhotos.filter(photo => !photo.viewed);
    }

}