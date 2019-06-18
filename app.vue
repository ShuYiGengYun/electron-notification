<template>
    <div id="app">
        <img src="./assets/logo.png">
        <button @click="showNotification">showNotification</button>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            showNotification() {
                const title = '进击的巨人'
                const options = {
                    dir: 'rtl', // ltr rtl auto
                    lang: 'en',
                    body: '通知额外显示的字符',
                    icon: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png'
                };
                /*即将支持的属性*/
                /*{
                  silent: false,
                  noscreen: false,
                  sticky: false,
                }
                */
                /*
                * 移动端调试
                * */

                /*
                * tag的使用
                * */



                /*https://github.com/KDE/snoretoast*/


                this.sendNotification(title, options)
            },
            sendNotification(title, options) {
                notifyMe(title, options);
                function notifyMe(title, options) {
                    // 先检查浏览器是否支持
                    if (!("Notification" in window)) {
                        alert("This browser does not support desktop notification");
                    }

                    // 检查用户是否同意接受通知
                    else if (Notification.permission === "granted") {
                        // If it's okay let's create a notification
                        var notification = new Notification(title, options);
                    }

                    // 否则我们需要向用户获取权限
                    else if (Notification.permission !== 'denied') {
                        Notification.requestPermission(function (permission) {
                            // 如果用户同意，就可以向他们发送通知
                            if (permission === "granted") {
                                var notification = new Notification(title, options);
                            }
                        });
                    }
                    notification.onclick = function () {
                        window.open('http://www.40sp.net/play/64333-1-1.html')
                    }
                    notification.onshow = function () {
                        console.log('show');
                    }
                    notification.onerror = function () {
                        console.log('error');
                    }
                    notification.onclose = function () {
                        console.log('close');
                    }
                }
            }
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
