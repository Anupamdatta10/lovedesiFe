class HomeUtility {
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

    static validate_Phone_Number_without_plus = (value) => {
        var number = value;
        // var filter = /^[1-9]{1}[0-9]{3,14}$/;
        var filter = /^(\+?\d{1,2}[ -]?)?(\(\+?\d{2,3}\)|\+?\d{2,3})?[ -]?\d{8,15}[ -]?\d{3,4}$/;
        // var filter =  /^91\d{10}$/;     
        if (filter.test(number)) {
            return true;
        }
        else {
            return false;
        }
    }

    static extractFileExtension = (fileName) => {
        // console.log('file_name---------------->', fileName);
        const lastDotIndex = fileName.lastIndexOf(".");
        // console.log('file_name---------------->', lastDotIndex);
        // console.log('file_name------dddddd---------->', fileName.substring(lastDotIndex + 1).toLowerCase());
        var fileNameExtension = ""
        if (lastDotIndex !== -1) {
            fileNameExtension = fileName.substring(lastDotIndex + 1).toLowerCase();
        }
        return fileNameExtension;
    }

    static validate_email = (value) => {
        var number = value;
        var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (filter.test(number)) {
            return true;
        }
        else {
            return false;
        }
    }

    static validateStringOnly = (value) => {
        var number = value;
        var filter = /^[a-zA-Z\s]*$/;
        if (filter.test(number)) {
            return true;
        }
        else {
            return false;
        }
    }

    static isNumeric(num) {
        return !isNaN(num)
    }

    static bankAccountNumberValidation = (value) => {

        let valid = true;
        let number = this.isNumeric(value);
        if (number && value.length > 4) {
            valid = true;
        } else {
            valid = false;
        }


        return valid;
    }

    static formatApiResponse = (data) => {
        let response = {}
        Object.keys(data).map((item, idx) => {
            response[item] = data[item]
        })
        return response
    }
}
export default HomeUtility;