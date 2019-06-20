// Modules to control application life and create native browser window
const {app, BrowserWindow, Notification} = require('electron')
const path = require('path');
const notifier = require('node-notifier');
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // mainWindow.loadFile('index.html')
  mainWindow.loadFile('notification.html');
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


/*官方文档notification*/
function createNotificationByOfficial() {
  let notification = new Notification({
      title: 'Hello-World',
      body: '恩恩',
      icon:　'./images/1.jpg',
  });
  notification.show();
}


/*node-notifier*/
function createNotificationByNotifier() {
  const title = '进击的巨人'
  const url = 'http://m.cosdao.com/comic1/12300/b-0-4.html'
  const options = {
    dir: 'ltr', // ltr rtl auto
    badge: '../src/assets/1.jpg',
    lang: 'zh-CN',
    body: '《进击的巨人》（进撃の巨人），是日本漫画家谏山创创作的少年漫画作品，于2009年在讲谈社旗下的漫画杂志《别册少年Magazine》上开始连载。',
    // icon: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',
    // image: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',
    icon: path.join(__dirname, 'images/1.jpg'),
    // image: require('./assets/2.jpg'),
    requireInteraction: false, //是否需要用户操作
    data: [url],
  };
  notifier.notify(
    {
      title: title,
      message: options.body,
      icon: options.icon, // Absolute path (doesn't work on balloons)
      sound: true, // Only Notification Center or Windows Toasters
      wait: true // Wait with callback, until user action is taken against notification
    },
    function(err, response) {
      // Response is response from notification
      console.log(err);
      console.log(response);
    }
  );

  notifier.on('click', function(notifierObject, options) {
    // Triggers if `wait: true` and user clicks notification
    mainWindow.loadFile(url);
  });

  notifier.on('timeout', function(notifierObject, options) {
    // Triggers if `wait: true` and notification closes
  });
}

app.on('ready', readyinit)

function readyinit() {
  createWindow();
  // createNotificationByOfficial();
  createNotificationByNotifier();
}

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
