// itc230 week 2 assignment

let albums = [{
    title : "Souvlaki",
    artist : "Slowdive",
    price : 19.99
}, {
    title : "Loveless",
    artist : "My Bloody Valentine",
    price : 24.99
}, {
    title : "Heaven or Las Vegas",
    artist : "Cocteau Twins",
    price : 18.99
}];

// retrieve all items in array
exports.getAll = () => {
    return albums;
}

// retrieve items by album title
exports.get = (title) => {
    return albums.find((item) => {
        return item.title === title;
    });
};

// delete items by album title
exports.delete = (title) => {
    const lengthOld = albums.length;
    albums = albums.filter((item) => {
        return item.title !== title;
    });
    return {
        deleted: lengthOld !== albums.length,
        total: albums.length
    };
};

// add new album to array
exports.add = (newAlbum) => {
    const lengthOld = albums.length;
    let found = this.get(newAlbum.title);
    if (!found) {
        albums.push(newAlbum);
    };
    return {
        added: lengthOld !== albums.length,
        total: albums.length
    };
};

console.log(this.getAll());
