# html 地理定位

通过`navigator.geoLocation`可以获取用户定位，这个定位需要用户允许才能获取

## API

```js
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function () {
            console.log("获取位置成功");
        },
        function () {
            console.log("获取位置失败");
        }
    );
} else {
    alert("该浏览器不支持获取地理位置。");
}
```

getCurrentPosition 第一个参数是成功的回调函数，第二个参数是失败的回调参数
执行以上代码后，浏览器会提示用户是否允许获取位置，如果拒绝了获取位置，就会进入失败的回调

### 成功的回调

```js
function success(position) {
    console.log("当前纬度：" + position.latitude);
    console.log("当前经度：" + position.longitude);
    console.log("位置精度：" + position.accuracy);
    console.log("当前海拔：" + position.altitude);
    console.log("当前海拔精度：" + position.altitudeAccuracy);
    console.log("方向" + position.heading);
    console.log("移动速度" + position.speed);
    console.log("响应的日期时间：" + position.timestamp);
}
```

### 失败的回调

```js
function fail(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("用户拒绝对获取地理位置的请求。");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("位置信息是不可用的。");
            break;
        case error.TIMEOUT:
            console.error("请求用户地理位置超时。");
            break;
        case error.UNKNOWN_ERROR:
            console.error("未知错误。");
        default: 
            console.error("获取位置信息失败");
    }
}
```

### 持续获取位置信息

通过 `watchPosition` 方法，可以持续获取用户的地理位置：

```javascript
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        function (x, y) {
            console.log("获取位置成功", x);
        },
        function (error) {
            console.log("获取位置失败");
            switch (error.code) {
            }
        },
        {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: Infinity,
        }
    );
} else {
    alert("该浏览器不支持获取地理位置。");
}
```

watchPosition接受的参数和geoLocation类似，参数一是成功的回调，参数二是失败的回调，重点是参数三，这是watchPosition的配置：

```json
{
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: Infinity,
}
```

可设置项仅此上面三项：
- enableHighAccuracy：是否启用高精度，默认false，启用高精度会用到GPS等高精度硬件，导致电量消耗加快
- timeout：获取定位超时时间，如果超过这个时间没有获取到位置，则进行error回调，默认值Infinity
- maximumAge：接受缓存位置的时间，默认0，不接受位置缓存

当你调用了watchPosition后，会获取一次位置，等位置发生改变后，才会重新响应回调（对此我未进行测试）

当你想主动停止位置监听时，可以使用 `navigator.geolocation.clearWatch(id);` 取消位置信息监听
如同停止计时器一样，调用此API需要一个id，这个id会在调用watchPosition时返回:

```javascript
if (navigator.geolocation) {
    var wp = navigator.geolocation.watchPosition(
        function (x, y) {
            console.log("获取位置成功", x);
        },
        function (error) {
            console.log("获取位置失败");
            switch (error.code) {
            }
        },
        {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: Infinity,
        }
    );
} else {
    alert("该浏览器不支持获取地理位置。");
}

navigator.geolocation.clearWatch(wp);
```
## 兼容性

所有主流浏览器都支持geoLocation，但各家浏览器定位的效果和成功几率参差不齐。
