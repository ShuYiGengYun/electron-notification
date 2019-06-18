const { app, BrowserWindow, Notification } = require('electron')
const notifier = require('node-notifier');
const path = require('path');


// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win

function readyInit() {
    createWindow();
    // createNotification();
    createNotificationByNotifier();
}

function createWindow () {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 加载index.html文件
    // win.loadFile('index.html')
    win.loadFile('notification.html')

    // 打开开发者工具
    win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
}

/**
 * 通知
 * @returns {boolean}
 */
function createNotification() {
    if (!Notification.isSupported()) {
        return false;
    }
    const myNotification = new Notification({
        title: 'HelloWorld',
        body: '哈哈哈'
    });
    myNotification.show();
}

/**
 * notifier
 */
function createNotificationByNotifier() {
   notifier.notify({
       title: '进击的巨人',
       message: '刚毅且温柔的女汉子|三笠·阿克曼',
       // icon: 'https://imgsrc.baidu.com/baike/pic/item/77094b36acaf2edd7747e997831001e93901931e.jpg',
       icon: path.join(__dirname, '/image/1.jpg'),
       sound: true,
       wait: false,
   }, function (error, response) {
       console.log(response);
       console.log(error);
   });
   notifier.on('click', function () {
       console.log(1);
   })
   notifier.on('timeout', function () {
       console.log(2);
   })
}


// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', readyInit)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。