class Utility {
    static getExpiryDetails = (expiresIn) => {
        var today = new Date();
        var afterAddWithToday = new Date();
        afterAddWithToday.setSeconds(afterAddWithToday.getSeconds() + (expiresIn-900));
        //afterAddWithToday.setSeconds(afterAddWithToday.getSeconds() + 20);
        //console.log("todaytodaytoday===>",today)
        //console.log("afterAddWithToday===>",afterAddWithToday)
        let data = {};
        data["loggedInTime"] = today
        data["expiryTime"] = afterAddWithToday
        data["expiryInterval"] = expiresIn
        return data;
    }
}
export default Utility;