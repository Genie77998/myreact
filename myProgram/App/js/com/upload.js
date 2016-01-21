import {common} from './unilt'

function PhotoShow(obj){
	obj = obj || {};
	this.btn = obj.btn || '.itemxsz';
	this.box = obj.box || '#mainBox';
	this.placeholder = obj.placeholder || 'input[type=text]'; 
	this.callback = obj.callback || new Function();
	this.reClass = obj.reClass || '';
	this.init();
}

PhotoShow.prototype = {
    constructor : PhotoShow,
	init : function(){
		var _this = this;
		_this.creatView().creatTipView();
		_this.bindEvent();
		$(_this.box).on({
			click : function(){
				var _click = $(this).attr('data-click'),
					_show = $(this).attr('data-showBtn'),
					url = $(this).attr('data-url'),
					dir = $(this).attr('data-dir'),
					_that = this;
					_this.item = _that;
				if(_click != 'true'){
					if(url){
						_this.setTips(url,dir || '');
					}
					_this.upload(this);
				}else{
					var src = $(_that).find('img').attr('src');
					if(_show == null || _show == 'true'){
						_this.setImg(src).showBtn().show();
					}else{
						_this.setImg(src).hideBtn().show();
					}
				}
			}
		},_this.btn);
	},
	bindEvent : function(){
		var _this = this;
		this.tipDiv[0].onclick = function(){
			$(this).addClass('hidden');
		}
		this.closeBtn.onclick = function(){
			_this.hide();
		}
		this.uploadBtn.onclick = function(){
			var _url = $(_this.item).attr('data-url'),
				_dir = $(_this.item).attr('data-dir');
			if(_url){
				_this.setTips(_url,_dir || '');
			}
			_this.hide().upload(_this.item);
		}
		this.maskBtn.onclick =function(){
			_this.hide();
		}
		/*$(window).on('resize',function(){
			_this.autoView();
		});*/
		return this;
	},
	creatView : function(){
		var style = document.createElement('style'),
			_div = $('<div id="reUpload" class="reUpload hidden"><div class="mask"></div><div class="content"><div class="imgBox"><img src="images/loading.gif"></div><div class="action"><input type="button" class="btn" value="重新上传"></div></div></div>'),
            _cssText = '.reUpload{position:fixed;width:100%;height:100%;top:0;left:0;text-align:center;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;z-index:1}.reUpload .content{position:absolute;width:100%;height:100%;padding:4px 16px;box-sizing:border-box;border-radius:10px;box-sizing:border-box}.reUpload .mask{z-index:-1;}.reUpload .content .imgBox{width:100%;height:100%;position:relative;z-index:1;padding:10px 0;text-align:center;box-sizing:border-box}.reUpload .content .imgBox img{max-width:100%;max-height:100%;margin:auto;position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.reUpload .content .action{padding:10px 42px 0;z-index:2;position:absolute;bottom:25px;left:0;width:100%;box-sizing:border-box}.reUpload .content .action .btn{border-radius:36px;height:36px;line-height:36px;color:white;background:#ff7e2e}.tipDiv{text-align:center;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0, 0, 0, 0.6);padding:10px;box-sizing:border-box;}.tipDiv img{max-width:100%;max-height:100%;}.tipDiv p{padding-top:10px;line-height:18px;font-size:14px;color:#fff;}';
            style.type = "text/css";
            style.styleSheet ? style.styleSheet.cssText = _cssText : style.innerHTML = _cssText
            document.getElementsByTagName('head')[0].appendChild(style);
            this.warpDiv = _div;
            this.closeBtn = _div.find('.imgBox')[0];
            this.maskBtn = _div.find('.mask')[0];
            this.uploadBtn = _div.find('.btn')[0];
			$('body').append(_div);
			return this;
	},
	creatTipView : function(){
		var _div = $('<div id="reUploadTipDiv" class="tipDiv hidden"><img src="images/loading.gif"><p></p></div>');
            this.tipDiv = _div;
			$('body').append(_div);
			return this;
	},
	hide : function(){
		this.warpDiv.addClass('hidden');
		return this;
	},
	setTips : function(url,dir){
		var _img = this.tipDiv.find('img')[0],
			_dir = this.tipDiv.find('p')[0];
			_img.src = url;
			//console.log(_img,url);
			_dir.innerHTML = dir;
			this.tipDiv.removeClass('hidden');
		return this;
	},
	hideTips : function(){
		this.tipDiv.addClass('hidden');
		return this;
	},
	show : function(){
		this.autoView();
		return this;
	},
	hideBtn : function(){
		this.warpDiv.find('.action').addClass('hidden');
		this.warpDiv.find('.content').css({
			paddingBottom:10
		});
		//this.warpDiv.find('.content').height(260);
		return this;
	},
	showBtn : function(){
		this.warpDiv.find('.action').removeClass('hidden');
		this.warpDiv.find('.content').css({
			paddingBottom:80
		})
		//this.warpDiv.find('.content').height(310);
		return this;
	},
	autoView : function(){
		var _box = this.warpDiv.find('.content');
		this.warpDiv.removeClass('hidden').find('.content').css({
            marginTop : (function(){
                var _h = _box.height();
                return -_h*0.5
            }()),
            top : (function(){
                var _h = $(window).height();
                return _h*0.5
            }()),
            marginLeft : (function(){
                var _w = _box.width();
                return -_w*0.5
            }()),
            left : (function(){
                var _W = $(window).width();
                return _W*0.5
            }())
        });
        return this;
	},
	setImg : function(url){
		this.warpDiv.find('img').attr('src',url);
		return this;
	},
	upload : function(a){
		var _this = this,
			me = $(a),
			$img = me.find('img'),
			$ipt = me.find(_this.placeholder);
			$input = me.find('input[type=hidden]');
		if(typeof Daze != 'undefined' && typeof Daze.photo != 'undefined'){
			Daze.photo({
	            type: 6
	        }, function(o) {
	        	_this.hideTips();
	            if (!o.url) {
	                return false;
	            }
	            _this.callback(a);
	            $img.attr('src', o.url);
	            me.attr('data-click', 'true');
	            $ipt.text('已上传').val('已上传').removeClass(_this.reClass);
	            $input.val(o.url);
	            _this.setImg(o.url);
	            common.setObj($input.attr('name'), o.url);
	            //console.log(common.getObj($input.attr('name')),$input.attr('name'));
	        });
		}
		return this;
	}
}

export default PhotoShow;
