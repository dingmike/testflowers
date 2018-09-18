import dva from 'dva';
import './index.less';
// import createBrowserHistory from 'history/createBrowserHistory';
import { Toast } from 'antd-mobile';
// 1. Initialize
const app = dva({
  onError(e) {
    console.log(e)
    Toast.fail(e.message,3)
  },
  // history : createBrowserHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/layout').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');