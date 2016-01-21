import cityList from './city-list'
import md5 from '../lib/md5.min'
import {storage} from './unilt'

const convertRequestURL = function(url) {
    let converted_url
    if (__PROD__) {
        converted_url = "http://app.qichekb.com/" + url
    } else {
        converted_url = "http://192.168.10.53/" + url
    }
    return converted_url
}
const convertParams = function(params) {
    let appkey
    let secret
    if (__PROD__) {
        appkey = 'ba0a57838f';
        secret = '763f6ef3b392637b';
    } else {
        appkey = '60000';
        secret = 'LWLPg7pU4cwrcyy8PwDeGuaY0BHUoX';
    }
    var time = +new Date();
    var sign = appkey + secret + time;
    var o = {
        appkey: appkey,
        time: time
    };
    if (params) {
        sign += JSON.stringify(params);
        o.params = JSON.stringify(params);
    }
    o.sign = md5(sign);
    return o
}
const DZ_COM = {
    addMask: function(target) {
        if (!target) {
            target = $('body');
        }
        var mask = $('<div class="mask" id="mask">');
        target.append(mask);
    },
    removeMask: function(target) {
        if (!target) {
            target = $('body');
        }
        target.find('#mask').remove();
    },
    /**
     * @method confirm
     * @description 确认提示框
     * @param options
     * @param options.title {string} 标题，默认值'提示'
     * @param options.content {string} 文本内容，默认值'无'
     * @param options.yesFn {function} 确认按钮回调函数
     * @param options.noFn {function} 取消按钮回调函数
     */
    confirm: function(options) {
        var me = this,
            noBtn = options.noBtn ? options.noBtn : '取消',
            yesBtn = options.yesBtn ? options.yesBtn : '确定',
            $body = $('body'),
            $confirmBox = $('<div class="win-confirm" id="winConfirm">');
        $confirmBox.append(
            $('<div class="title">').html(options.title || '提示'),
            $('<div class="content body2">').html(options.content),
            $('<div class="btns">').append(
                $('<input type="button" class="btn btn-no" id="btnNo" value="' + noBtn + '">'),
                $('<input type="button" class="btn btn-yes" id="btnYes" value="' + yesBtn + '">')
            )
        );

        me.addMask();
        $body.append($confirmBox);

        $('#btnNo').click(function() {
            me.removeMask();
            $confirmBox.remove();
            if (options.noFn) {
                options.noFn();
            }
        });

        $('#btnYes').click(function() {
            if (options.yesFn) {
                options.yesFn();
            }
            me.removeMask();
            $confirmBox.remove();
        });
    },
    login: function(callback) {
        Daze.login(function(resp) {
            console.log(resp)

            if (Number(resp.isSuccess)) {
                var pid = Number(resp.pid),
                    uid = Number(resp.uid),
                    userId = Number(resp.userId);
                if (pid) {
                    storage.storeInfo('pid', pid);
                }
                if (uid) {
                    storage.storeInfo('uid', uid);
                }
                if (userId) {
                    storage.storeInfo('userId', userId);
                }
                if (callback) {
                    callback(resp);
                }
            }
        });
    },
    setImg: function(img, containerW, containerH) {
        var imgW = img[0].naturalWidth,
            imgH = img[0].naturalHeight;

        var w = 0,
            h = 0,
            top = 0,
            left = 0;
        if (imgW / containerW < imgH / containerH) {
            w = containerW;
            h = imgH / imgW * w;
            top = -(h - containerH) / 2;
        } else {
            h = containerH;
            w = imgW / imgH * containerH;
            left = -(w - containerW) / 2;
        }
        img.css({
            width: w,
            height: h,
            marginTop: top,
            marginLeft: left
        });
    },

    /**
     * @method getSystem
     * @description 获取系统类型
     * @returns {string} android/ios
     */
    getSystem: function() {
        var system = '';

        if (!Daze.dazeClientVersion) {
            return system;
        }

        if (Daze.dazeClientVersion.indexOf('android') >= 0) {
            system = 'android';
        } else if (Daze.dazeClientVersion.indexOf('iOS') >= 0) {
            system = 'ios';
        }

        return system;
    },
    /**
     * @method getVersion
     * @description 获取版本号
     * @returns {*}
     */
    getVersion: function() {
        if (Daze.dazeClientVersion) {
            return Daze.dazeClientVersion.split('_').slice(-1)[0];
        } else {
            return '';
        }
    },
    /**
     * @method compareVersion
     * @description 版本比较
     * @param latestVersion 固定版本值
     * @returns {boolean} 当前版本与固定版本比较，>= 则返回 true ，否则返回 false
     */
    compareVersion: function(latestVersion) {
        var result
        var self = this
        var system = self.getSystem()
        if (!latestVersion) {
            return false;
        }

        if (system == 'android') {
            console.log(self.getVersion())
            if (self.getVersion() < latestVersion) {
                result = false
            } else {
                result = true
            }
        } else if (system == 'ios') {
            var curVersion = Daze.dazeClientVersion.split('_').slice(-1)[0];
            var latestVersionArray = latestVersion.split('.');
            var curVersionArray = curVersion.split('.');
            var len = latestVersionArray.length;
            result = true;

            for (var i = 0; i < len; i++) {
                if (curVersionArray[i] < latestVersionArray[i]) {
                    result = false;
                    break;
                } else if (curVersionArray[i] > latestVersionArray[i]) {
                    break;
                }
            }
        }

        console.log(result)

        return result;
    },
    getCurCity: function(callback) {
        var self = this

        function getValidVersion() {
            var system = self.getSystem(),
                latestVersion = '';
            if (system == 'android') {
                latestVersion = '3900';
            } else if (system == 'ios') {
                latestVersion = '3.8.0';
            }

            return self.compareVersion(latestVersion);
        }

        if (getValidVersion()) {
            console.log('新版本')
            var currentCity = {}
            currentCity.id = tool.getQueryString().cityId || ''
            currentCity.city = currentCity.name = tool.getQueryString().cityName
            if (currentCity.id == '' || currentCity.id == '{{cityId}}') {
                $.ajax({
                    type: "post",
                    url: "http://ip.taobao.com/service/getIpInfo.php?ip=myip",
                    dataType: "json",
                    success: function(data) {
                        if (data.code == 0) {
                            currentCity.city = currentCity.name = data.data.city;
                            $.each(cityList, function(key, item) {
                                if (currentCity.city.indexOf(item.name) >= 0) {
                                    currentCity.id = item.id
                                    return false
                                }
                            })
                            console.log('ip获取：' + currentCity.id + currentCity.name + currentCity.city)
                        };
                        allSet()

                        console.log(storage.getCurCity())

                    },
                    error: function() {
                        Daze.showMsg('请求数据失败！')
                    }
                })
            } else {
                allSet()
            }

            function allSet() {
                $.each(cityList, function(key, item) {
                    if (currentCity.id == item.id) {
                        currentCity.province = item.province
                        return false
                    }
                })
                storage.storeInfo('curCity', currentCity);
                callback && callback()
            }

        } else {
            console.log('老版本')
            callback()
        }
    }
}

export {
    convertRequestURL,
    convertParams,
    DZ_COM
}
