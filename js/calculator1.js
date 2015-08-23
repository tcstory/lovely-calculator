(function () {
    "use strict";
    var $screen = $('#screen');
    var $btnWrapper = $('#btn-wrapper');
    var $btns = $('.btn');
    var $header = $('#header');
    var $about = $('#about');

    var str = '';
    var isClear = false; // 判断上一次有没有点击清除按钮
    var isShow = false; // 判断about窗口有没有弹出
    /**
     * 初始化计算器
     */
    function init() {
        $screen.text('0');
        $btnWrapper.on('click', function (event) {
            if ($(event.target).hasClass('btn')) {
                handleButtonClick($(event.target).attr('data-val'));
            }
            return false;
        });
        $header.on('click', function (event) {
            handleHeaderClick();
            return false;
        });
    }

    /**
     * 处理用户按下的按钮
     * @param whichBtn
     */
    function handleButtonClick(whichBtn) {
        if (isShow) {
            isShow = false;
            $about.hide(200);
            return;
        } else if (whichBtn === '=') {
            isClear = true;
            str = eval(str).toString();
            $screen.text(str);
        } else if (whichBtn === 'clear') {
            isClear = false;
            str = '';
            $screen.text('0');
        } else {
            if (/^\d$/.test(whichBtn) && isClear) {
                isClear = false;
                str = whichBtn;
                $screen.text(str);
            } else if (str.length < 14) {
                isClear = false;
                str = str + whichBtn;
                $screen.text(str);
            } else {
                str = '';
                $screen.text('error');
            }
        }
    }

    /**
     * 当用户点击标题时的事件处理程序
     */
    function handleHeaderClick() {
        isShow = true;
        $about.show(200);
    }

    init();
})();
