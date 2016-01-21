function InputFoucs() {
    this.sid = '_InputFoucs';
    this.init();
}

InputFoucs.prototype = {
    constructor: InputFoucs,
    init: function() { ///初始化
        var _this = this,
            _id = 'InputFoucStyle';
        if(!document.getElementById(_id)){
            var style = document.createElement('style'),
                _cssText = "." + _this.sid + "{position:fixed;z-index:9999;width:100%;height:100%;top:0;left:0;background:#f1f1f1;display:none;box-sizing:border-box;padding:10px;} \n." + _this.sid + " ._ipt{width:75%;height:40px;line-height:40px;outline:none;border:1px solid #ccc;background:white;box-sizing:border-box;padding:0 10px;float:left;}\n." + _this.sid + " ._btn{width:20%;height:40px;line-height:40px;background:#ff7f2f;color:white;border:none;float:right;}";
            style.type = "text/css";
            style.styleSheet ? style.styleSheet.cssText = _cssText : style.innerHTML = _cssText
            style.id = _id;
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        _this.creatView();
        _this.reload();
    },
    reload: function() { //动态添加文档后调用此方法
        var _this = this,
            _ipt = document.getElementsByTagName('input'),
            len = _ipt.length,
            _arr = [];
        if (len == 0) {
            return;
        }
        for (var i = 0; i < len; i++) {
            if (_ipt[i].getAttribute('data-focus') == 'true') {
                _ipt[i].onfocus = (function(index) {
                    return function() {
                        _this.popto(this);
                    }
                })(i);
            }
        }
    },
    creatView: function() { //创建显示元素
        var _this = this;
        if (!document.getElementById(this.sid)) {
            var _div = document.createElement('div'),
                _input = document.createElement('input'),
                _btn = document.createElement('input');
            _btn.value = '确定';
            _input.className = '_ipt';
            _btn.type = "button";
            _btn.className = '_btn'
            _div.id = _this.sid;
            _div.className = _this.sid;
            _this.warpBox = _div;
            _this._element = _input;
            _this._btn = _btn;
            _div.appendChild(_input);
            _div.appendChild(_btn);
            document.body.appendChild(_div);
        }
    },
    popto: function(element) {
        var _this = this;
        _this.warpBox.style.display = "block";
        _this._element.value = element.value;
        _this._element.type = element.type;
        _this._element.setAttribute('placeholder', element.getAttribute('placeholder') || '');
        _this._element.focus();
        _this._element.onblur = function() {
            _this.warpBox.style.display = "none";
            element.value = this.value.replace(/\s/g, '');
            this.value = "";
        }
        _this._element.onkeydown = function(e) {
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                this.blur();
            }
        }
        _this._btn.onclick = function() {
            _this._element.blur();
        }
    }
}
export default InputFoucs;
