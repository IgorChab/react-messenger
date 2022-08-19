module.exports = class UserDto {
    username
    email;
    id;
    isActivated;
    profilePhoto;

    constructor(model){
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.username = model.username;
        this.profilePhoto = model.profilePhoto
    }
}