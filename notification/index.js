/**
 *Created by Shinelon on 2019/6/16
 */

const { Notification } = require('electron');
if (!Notification.isSupported()) {
    return false;
}
const myNotification = new Notification({
    title: 'HelloWorld',
    subTitle: 'SubTitle',
    body: 'This is Body',
    silent: false,
    icon: ''
});
myNotification.show();

myNotification.onclick = function() {
    alert(1)
}