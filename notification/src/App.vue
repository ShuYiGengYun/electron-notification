<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button  @click="sendNotification">测试通知</button>
    <button @click="sendNotificationByTag">测试通知tag</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    checkNotificationPermission() {
      // 先检查浏览器是否支持;
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
        return false;
        //  检查用户是否同意
      } else if (Notification.permission === 'granted') {
        return true;
        //  向用户申请权限;
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          return permission === 'granted';
        })
      }
    },
    sendNotification() {
      if (!this.checkNotificationPermission()){
        return false;
      }
      const title = '进击的巨人'
      const options = {
        dir: 'ltr', // ltr rtl auto
        badge: '../src/assets/1.jpg',
        lang: 'zh-CN',
        body: '《进击的巨人》（进撃の巨人），是日本漫画家谏山创创作的少年漫画作品，于2009年在讲谈社旗下的漫画杂志《别册少年Magazine》上开始连载。',
        // icon: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',
        // image: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',
        icon: require('./assets/1.jpg'),
        // image: require('./assets/2.jpg'),
        requireInteraction: false, //是否需要用户操作
      };
      /*即将支持的属性*/
      /*{
        silent: false,
        noscreen: false,
        sticky: false,
      }
      */
      /*
      * 移动端调试Notification小米浏览器(V10.8.1),UC浏览器(V12.5.0.1030)不支持
      * 谷歌浏览器(不支持发送或者接收通知)
      * */
      const notification = new Notification(title, options);
      this.bindEvents(notification);
    },
    bindEvents(notification) {
      const events = ['click', 'show', 'error', 'close'];
      events.forEach(function (event, index) {
        notification[`on${event}`] = function () {
          console.log(notification);
          if (index === 0) {
            window.open('http://m.cosdao.com/comic1/12300/b-0-4.html')
          }
        }
      })
    },
    /*tag属性*/
    sendNotificationByTag() {
      if (!this.checkNotificationPermission()) {
        return false;
      }
      for (var i = 0; i <　10; i++) {
        var notification = new Notification(`Hi ! ${i}`, {
          tag: 'soManyNotification',
        });
      }
    },
    notificationTag() {
      if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission(function (status) {
          if (Notification !== status) {
            Notification.permission = status;
          }
        })
      }
      if (window.Notification && Notification.permission === 'granted') {
        for (var i = 0; i < 10; i ++) {
          var notification = new Notification("Hi !" + i, {
            tag: 'soManyNotification',
          });
        }
      }
    },
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
