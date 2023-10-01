import React from 'react';
import { toast } from 'react-toastify';
import renderHTML from 'react-render-html';
import moment from 'moment';
import io from 'socket.io-client';
import Config from './Config';
import EventEmitter from './EventEmitter';

class Utility {

    static newSocketConnection = (user_id, org_id) => {
        const socket = io(Config.socketURL, {
            reconnection: true,            // Enable reconnection
            reconnectionAttempts: Infinity, // Try to reconnect forever
            reconnectionDelay: 1000,       // Delay between reconnection attempts in milliseconds
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        // Event listener for when the socket disconnects
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Event listener for when the socket successfully reconnects
        socket.on('reconnect', (attemptNumber) => {
            console.log(`Reconnected to server after ${attemptNumber} attempts`);
        });

        // Event listener for when the socket reconnect attempt fails
        socket.on('reconnect_failed', () => {
            console.log('Reconnection failed. No more attempts.');
        });

        socket.emit('react_auth', { user_id: user_id, org_id: org_id });
        socket.on('chat_message', (data) => {
            EventEmitter.emit("receivedMessage", [data.message])
        });

        const listener = EventEmitter.addListener("sendMessage", (sendData) => {
            //console.log("sendData======", sendData);
            socket.emit('receive_react', sendData);
        })

        const dislistener = EventEmitter.addListener("disconnected", (data) => {
            //console.log("sendData======", sendData);
            socket.disconnect();
        })
        return () => {
            listener.remove();
            dislistener.remove();
        }



    }




    static toastNotifications = (message, title, type, autoclose = true, companyLogo = "", component = <></>) => {
        let errorToastId = "";
        let warningToastId = "";
        let callbackToastId = "";
        if (type === "success") {
            var _autoclose = 5000;
            if (autoclose == false) {
                _autoclose = autoclose
            }
            toast.success(
                <div className="tostify-inner-box">
                    <div className="iconbox">
                        <div className="alert_img">&nbsp;</div>
                    </div>
                    <div className="titleanddescriptionbox">
                        <h1>{title}</h1>
                        <div className="alert_box">
                            <div className="message_dec">{renderHTML(message)}</div>
                        </div>
                    </div>
                </div>, {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: _autoclose,
                transition: toast.slide,
                hideProgressBar: false
            });
        } else if (type === "reminder") {
            var _autoclose = 5000;
            if (autoclose == false) {
                _autoclose = autoclose
            }
            toast.success(
                <div>
                    <h1>{title}</h1>
                    <div className="alert_box">
                        <div className="alert_img_reminder">&nbsp;</div>
                        <div className="message_dec">{renderHTML(message)}</div>
                    </div>
                </div>, {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: _autoclose,
                transition: toast.slide,
                hideProgressBar: false
            });
        } else if (type === "info") {
            var _autoclose = 5000;
            if (autoclose == false) {
                _autoclose = autoclose
            }
            toast.success(
                <div>
                    <h1 className="info_title_text">{title}</h1>
                    <div className="alert_box">
                        <div className="alert_img_info"><img src={companyLogo} alt="No image" /></div>
                        <div className="message_dec">{renderHTML(message)}</div>
                    </div>
                </div>, {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: _autoclose,
                transition: toast.slide,
                hideProgressBar: false
            });
        } else if (type === "error") {
            errorToastId = message;
            if (!toast.isActive(errorToastId)) {
                toast.error(
                    // <div className="warning_message_box">
                    //     <h1 className="error_title">{title}</h1>
                    //     <div className="message_descriptipn error_title_dec">{renderHTML(message)}</div>
                    // </div>, {
                    <div className="tostify-inner-box">
                        <div className="iconbox">
                            <div className="alert_img_warning">&nbsp;</div>
                        </div>
                        <div className="titleanddescriptionbox">
                            <h1>{title}</h1>
                            <div className="alert_box">
                                <div className="message_dec">{renderHTML(message)}</div>
                            </div>
                        </div>
                    </div>, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: false,
                    transition: toast.slide,
                    hideProgressBar: true,
                    toastId: errorToastId
                });
            }

        } else if (type === "warning") {
            warningToastId = message;
            var _autoclose = 3000;
            if (autoclose == false) {
                _autoclose = autoclose
            }
            if (!toast.isActive(warningToastId)) {
                toast.warning(
                    // <div>
                    //     <h1 className="warning_title">{title}</h1>
                    //     <div className="message_descriptipn">{renderHTML(message)}</div>
                    // </div>, {
                    <div className="tostify-inner-box">
                        <div className="iconbox">
                            <div className="alert_img_warning">&nbsp;</div>
                        </div>
                        <div className="titleanddescriptionbox">
                            <h1>{title}</h1>
                            <div className="alert_box">
                                <div className="message_dec">{renderHTML(message)}</div>
                            </div>
                        </div>
                    </div>, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: _autoclose,
                    transition: toast.slide,
                    hideProgressBar: false,
                    toastId: warningToastId
                });
            }
        } else if (type === "longError") {
            errorToastId = message;
            if (!toast.isActive(errorToastId)) {
                toast.error(
                    <div className="warning_message_box_long">
                        <h1 className="error_title">{title}</h1>
                        <div className="message_descriptipn error_title_dec">{renderHTML(message)}</div>
                    </div>, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: false,
                    transition: toast.slide,
                    hideProgressBar: true,
                    toastId: errorToastId
                });
            }

        } else if (type === "callback") {
            callbackToastId = message;
            if (!toast.isActive(callbackToastId)) {
                toast(component, {
                    position: toast.POSITION.TOP_LEFT,
                    transition: toast.slide,
                    toastId: callbackToastId,
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    closeButton: false
                });
            }
        }



    }

    static allRoute = () => {
        let routesUrl = [

        ];
        return routesUrl;
    }

    static toastNotificationsDismissAll = () => {
        toast.dismiss();
    }

    static displayNameFormat = (first_name = "", last_name = "") => {
        //let concatname = last_name + " " + first_name
        let concatname = first_name + " " + last_name
        return concatname
    }

    //role wise permission and userwise permission
    static roleWisePermission = (userId, visitorId, roleName) => {
        let permission = false;
        if (roleName == 'app_admin') {
            permission = true;
        } else {
            if (userId == visitorId) {
                permission = true;
            }
        }

        return permission;
    }

    static durationFormat = (num) => {
        //let num = "1.00";
        //let num="0.50";
        let returnNumber = "";
        let durationCount = num.split('.');
        if (num == "0.50") {
            let nextDuration = durationCount[1].split("");
            returnNumber = "0." + nextDuration[0];
        } else {
            returnNumber = durationCount[0];
        }
        return returnNumber
    }

    /*static convertToISTAndUTC(date, type) {
        if (type == 'UTC') {
            return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        } else {
            return new Date(utcDate.getTime() + (330 * 60000));
        }
    }*/


    static customDatePicker = () => {
        const myCustomLocale = {
            // months list by order
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],

            // week days by order
            weekDays: [
                {
                    name: 'Monday',
                    short: 'M',
                },
                {
                    name: 'Tuesday',
                    short: 'T',
                },
                {
                    name: 'Wednesday',
                    short: 'W',
                },
                {
                    name: 'Thursday',
                    short: 'T',
                },
                {
                    name: 'Friday',
                    short: 'F',
                },
                {
                    name: 'Saturday',
                    short: 'S',
                    isWeekend: true,
                },
                {
                    name: 'Sunday', // used for accessibility 
                    short: 'S', // displayed at the top of days' rows
                    isWeekend: true, // is it a formal weekend or not?
                }
            ],

            // just play around with this number between 0 and 6
            weekStartingIndex: 0,

            // return a { year: number, month: number, day: number } object
            getToday(gregorainTodayObject) {
                return gregorainTodayObject;
            },

            // return a native JavaScript date here
            toNativeDate(date) {
                return new Date(date.year, date.month - 1, date.day - 1);
            },

            // return a number for date's month length
            getMonthLength(date) {
                return new Date(date.year, date.month, 0).getDate();
            },

            // return a transformed digit to your locale
            transformDigit(digit) {
                return digit;
            },

            // texts in the date picker
            nextMonth: 'Next Month',
            previousMonth: 'Previous Month',
            openMonthSelector: 'Open Month Selector',
            openYearSelector: 'Open Year Selector',
            closeMonthSelector: 'Close Month Selector',
            closeYearSelector: 'Close Year Selector',
            defaultPlaceholder: 'Select...',

            // for input range value
            from: 'from',
            to: 'to',


            // used for input value when multi dates are selected
            digitSeparator: ',',

            // if your provide -2 for example, year will be 2 digited
            yearLetterSkip: 0,

            // is your language rtl or ltr?
            isRtl: false,
        }
        return myCustomLocale;
    }

    static currentMonthFirstDayLastDayFormat = () => {
        const currentDate = moment();
        const firstDayOfMonth = currentDate.clone().startOf('month');
        const lastDayOfMonth = currentDate.clone().endOf('month');
        const firstDayOfMonthString = firstDayOfMonth.format('YYYY-MM-DD');
        const lastDayOfMonthString = lastDayOfMonth.format('YYYY-MM-DD');
        let returnCurrentMonthFirstDayLastDay = {
            start_date: firstDayOfMonthString,
            end_date: lastDayOfMonthString,
        }
        return returnCurrentMonthFirstDayLastDay
    }
}


export default Utility;