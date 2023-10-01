class ProfileUtility {
    static validate_Phone_Number = (value) => {
        var number = value;
        var filter = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        if (filter.test(number)) {
            return true;
        }
        else {
            return false;
        }
    }
}
export default ProfileUtility;