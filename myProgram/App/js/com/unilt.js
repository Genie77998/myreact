/**
 * author:wj77998
 */
const obj = 'insurancefinal'
const _ord = "insureOrderList"
const config = {
    mode: 0, //模式：0 测试 /1 预发 /2 生产
    hostUrls: [
        "http://192.168.10.3:39080",
        "http://121.40.72.129:8080",
        "http://121.41.118.32"
    ]
}

;(function() {
    var globalData = store('globalData');
    if (!globalData) {
        store('globalData', {});
    }
})()

function store(itemName, obj) {
    if (obj) {
        if (typeof obj == 'object') {
            obj = JSON.stringify(obj);
            localStorage.setItem(itemName, obj);
        }
    } else {
        var data = localStorage.getItem(itemName);
        return JSON.parse(data);
    }
}

const storage = {
    getItem: function(itemName) {
        return store(itemName);
    },
    setItem: function(itemName, obj) {
        store(itemName, obj);
    },
    clearItem: function(itemName) {
        localStorage.removeItem(itemName);
    },
    setCityData: function(obj) {
        this.setItem('cityData', obj);
    },
    getCityData: function() {
        return this.getItem('cityData') || {};
    },
    getGlobalData: function() {
        return this.getItem('globalData') || {};
    },
    storeInfo: function(key, value) {
        var globalData = this.getGlobalData();
        globalData[key] = value;
        this.setItem('globalData', globalData);
    },
    removeInfo: function(key) {
        var globalData = this.getGlobalData();
        delete globalData[key];
        this.setItem('globalData', globalData);
    }
}

const common = {
    HOST_URL: config.hostUrls[config.mode],
    phoneReg: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
    idCardNameReg: /^[\u2E80-\u9FFF]{2,}$/,
    idCardReg: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
    priceReg: /^\d{1,4}(\.\d{1,2})?$/g,
    emailReg: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    appId: '10000018',
    format: function(s1, s2) {
        var o = {},
            dfmt = 'yyyy-MM-dd hh:mm:ss',
            date = new Date(),
            fmt = '';
        if (typeof s1 == 'object' && s1.constructor == Date) {
            date = s1;
            fmt = s2 || dfmt;
        } else {
            fmt = s1 || dfmt;
        };
        o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        } else {
            return new Date().getFullYear();
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    showMsg: function(msg, callback) {
        callback = typeof callback != 'undefined' && callback.constructor == Function ? callback : new Function();
        if (!msg) {
            return;
        }
        $('._errmsg').remove();
        var _box = $('<div class="_errmsg">');
        $('body').append(
            _box.append(
                $('<div class="mask">')
            ).append(
                $('<div class="contents">').append(
                    $('<p>').html(msg)
                )
            )
        );
        _box.on({
            click: function() {
                _box.remove();
                callback();
            }
        });
        return this;
    },
    addOrder: function(id, time) {
        var ord = storage.getItem(_ord) || [];
        if (ord.length == 0) {
            ord.push({
                id: id,
                time: time
            });
            storage.setItem(_ord, ord);
        } else {
            var _r = this.indexOrder(id);
            if (typeof _r != 'number' || _r == -1) {
                ord.push({
                    id: id,
                    time: time
                });
                storage.setItem(_ord, ord);
            }
        }
    },
    checkOrder: function(id, callback) {
        var ord = storage.getItem(_ord) || [],
            time = '',
            _r = this.indexOrder(id);
        if (typeof _r == 'number' && _r >= 0) {
            time = ord[_r].time;
            typeof callback != 'undefined' && callback.constructor == Function && callback(id, time, _r);
        }
    },
    delOrder: function(id) {
        var r = this.indexOrder(id),
            ord = storage.getItem(_ord) || [];
        if (typeof r == 'number' && r >= 0) {
            ord.splice(r, 1);
            storage.setItem(_ord, ord);
        }
    },
    indexOrder: function(id) {
        var ord = storage.getItem(_ord) || [],
            _arr = [];
        if (ord.length == 0) {
            return false;
        }
        for (var t = 0; t < ord.length; t++) {
            _arr.push(ord[t].id);
        }
        return _arr.indexOf(id);
    },
    removeItem: function(item) {
        var _re = this.getObj();
        if (item in _re) {
            delete _re[item];
            this.setObj(_re);
        }
    },
    getObj: function(item) {
        var _re = storage.getGlobalData()[obj] || {};
        if (item) {
            if (typeof _re[item] != 'undefined') {
                return _re[item];
            } else {
                return undefined;
            }
        } else {
            return _re;
        }
    },
    setObj: function(a, b) {
        var _re = this.getObj();
        if (!a) {
            storage.removeInfo(obj);
        } else {
            if (typeof a == 'object') {
                storage.storeInfo(obj, a);
            } else {
                _re[a] = b;
                storage.storeInfo(obj, _re);
            }
        }
    },
    setUid: function() {
        this.setObj('uid', storage.getUid());
    },
    listFn: function(data) {
        var _re = {
            basic: [],
            mass: [],
            luxury: []
        };
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == '0') {
                _re.basic.push(data[i]);
            } else if (data[i].type == '1') {
                _re.mass.push(data[i]);
            } else if (data[i].type == '2') {
                _re.luxury.push(data[i]);
            }
        }
        return [_re.basic, _re.mass, _re.luxury];
    },
    companyList: function() {
        var obj = this.getObj('companyInfo'),
            re = ['太平洋车险', '太保车险', '人保车险', '阳光车险', '天平车险', '华安车险', '永诚车险'],
            _arr = [];
        for (var s = 0; s < re.length; s++) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].name == re[s]) {
                    _arr.push(obj[i]);
                    obj.splice(i, 1);
                }
            }
        }
        for (var t = 0; t < obj.length; t++) {
            //if(obj[t].name != '太平车险'){
            _arr.push(obj[t]);
            //}
        }
        if (_arr.length > 0) {
            this.setObj("companyInfo", _arr);
        }
    },
    filterBankCode: function(bankName) {
        var _bankCode = [{
                backName: "工商银行",
                bankCode: "ICBC"
            }, {
                backName: "农业银行",
                bankCode: "ABC"
            }, {
                backName: "中国银行",
                bankCode: "BOC"
            }, {
                backName: "建设银行",
                bankCode: "CCB"
            }, {
                backName: "招商银行",
                bankCode: "CMB"
            }, {
                backName: "交通银行",
                bankCode: "BCOM"
            }, {
                backName: "上海浦东发展银行",
                bankCode: "CITIC"
            }, {
                backName: "兴业银行",
                bankCode: "CIB"
            }, {
                backName: "民生银行",
                bankCode: "CMBC"
            }, {
                backName: "平安银行",
                bankCode: "PAB"
            }, {
                backName: "广发银行",
                bankCode: "GDB"
            }, {
                backName: "邮储银行",
                bankCode: "PSBC"
            }, {
                backName: "光大银行",
                bankCode: "CEB"
            }, {
                backName: "华夏银行",
                bankCode: "HXB"
            }, {
                backName: "宁波银行",
                bankCode: "NBCB"
            }, {
                backName: "上海银行",
                bankCode: "SHB"
            }, {
                backName: "国家开发银行",
                bankCode: "CDB"
            }, {
                backName: "汇丰银行",
                bankCode: "HSBC"
            }],
            s = 0,
            len = _bankCode.length,
            code = '';
        for (var s = 0; s < len; s++) {
            if (_bankCode[s].backName == bankName) {
                code = _bankCode[s].bankCode;
            }
        }
        return code;
    },
    filterBank: function(list) {
        list = list || [];
        var payeco = {
                "01": ["工商银行", "建设银行", "农业银行", "深圳发展银行", "招商银行", "中信银行", "光大银行", "华夏银行", "兴业银行", "广发银行", "中国邮政储蓄银行", "广州银行", "平安银行"],
                "02": ["中国银行", "广发银行", "光大银行", "民生银行", "兴业银行", "北京银行", "工商银行", "建设银行", "上海浦东发展银行", "中信银行", "平安银行"]
            },
            bestpay = {
                "01": ["建设银行", "中国银行", "招商银行", "广发银行", "民生银行", "中信银行", "上海浦东发展银行", "平安银行", "上海银行", "工商银行", "农业银行", "中国邮政储蓄银行", "兴业银行", "光大银行", "交通银行", "北京银行", "兰州银行", "东莞银行", "广州银行", "广州农商银行", "东莞农商银行"],
                "02": ["建设银行", "中国银行", "招商银行", "广发银行", "民生银行", "中信银行", "上海浦东发展银行", "平安银行", "上海银行"]
            },
            _arr1 = [],
            _arr2 = [],
            i = 0,
            len = list.length;
        if (len > 0) {
            for (i; i < len; i++) {
                var item = list[i]
                if (item.bankCardType === '02') {
                    if (payeco['02'].indexOf(item.bankName) > -1) {
                        _arr1.push(item);
                    }
                    if (bestpay['02'].indexOf(item.bankName) > -1) {
                        _arr2.push(item);
                    }
                }
                if (item.bankCardType === '01') {
                    if (payeco['01'].indexOf(item.bankName) > -1) {
                        _arr1.push(item);
                    }
                    if (bestpay['01'].indexOf(item.bankName) > -1) {
                        _arr2.push(item);
                    }
                }
            }
        }
        return {
            'payeco': _arr1,
            'bestpay': _arr2
        }
    },
    ygCarInfoArr: function(obj) {
        var _arr = [],
            me = this;
        for (var i = 0; i < obj.length; i++) {
            var _obje = obj[i]['Definition'],
                lens = _obje.length,
                _obj = {};
            for (var s = 0; s < lens; s++) {
                _obj[_obje[s].name.toString()] = _obje[s]['value'];
            }
            _arr.push(_obj)
        }
        return _arr;
    }
}
const tool = {
    /**
     * @method getQueryString
     * @description 获取地址栏参数
     * @param url
     * @returns {object} 参数集合
     */
    getQueryString: function(url) {
        if (url) {
            url = url.substr(url.indexOf("?") + 1);
        }
        var result = {},
            queryString = url || location.search.substring(1),
            re = /([^&=]+)=([^&]*)/g,
            m;

        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return result;
    },
    /**
     * @method isEmpty
     * @description 判断对象是否为空
     * @param o
     * @returns {boolean} true or false
     */
    isEmpty: function(o) {
        if (o) {
            var flag = true;
            for (var key in o) {
                flag = false;
            }
            return flag;
        } else {
            return true;
        }
    },
    /**
     * @deprecated
     * @method convertNumber
     * @description 保留两位小数
     * @param n
     * @returns {number}
     */
    convertNumber: function(n) {
        n = n.toString();
        var isDecimal = n.indexOf('.') >= 0;
        if (isDecimal) {
            var int = n.split('.')[0],
                dec = (n - int);
            if (n.split('.')[1].length > 2) {
                dec = dec.toFixed(2);
            }
            n = Number(int) + Number(dec);
        }
        return Number(n);
    },
    /**
     * @method getFormDataAsObj
     * @description 获取表单数据
     * @param $form
     * @returns {object} 以对象形式返回
     */
    getFormDataAsObj: function($form) {
        var obj = {},
            arr = $form.serializeArray();
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i].name] = arr[i].value;
        }
        return obj;
    }
}

export {
    common , storage , tool
}
