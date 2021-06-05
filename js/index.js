window.onload = function() {
    // loading
    let loading = document.querySelector('#loading');
    // 单纯人物的bg
    let charImg = document.querySelector('#char');
    // 背景图bg
    let bgImg = document.querySelector('#bg');
    
    // 加载完成后，将loading取消
    loading.classList.add('site-loading-hide');
    // loading动画结束之后
    loading.addEventListener('transitionend', function() {
        // inview 展示
        inViewTransition();
        // plate 展示
        plateTransition();
        // storytitle 展示
        stortyTitleTransition();
        // storytext 展示
        storyTextTransition();
        // character title 展示
        chaTitleTransition();
        // character 展示
        chaNavTransition();
        // 纯背景图 展示
        // charImg.classList.add('show');
    })
    // charImg.addEventListener('transitionend', function() {
    //     bgImg.classList.add('show');
    // })

    // 监听滚动条滚动
    window.addEventListener('scroll', () => {
        // inview 展示
        inViewTransition();
        // plate 展示
        plateTransition();
        // storyTitle 展示
        stortyTitleTransition();
        // storyText 展示
        storyTextTransition();
        // character title 展示
        chaTitleTransition();
        // character nav 展示
        chaNavTransition();
    })

    // 控制 inView 模块的淡入淡出
    function inViewTransition() {
        let eleFather = getEle('#articleInner');
        let eleChilds = getEleAll('#articleInner .in-view');
        const LIMIT = Math.ceil(eleFather.clientHeight / 4);
        for (let i = 0; i < eleChilds.length; i++) {
            elementInOut({
                childEle: eleChilds[i],
                cla: 'show-block',
                fatherEle: eleFather,
                limit: LIMIT
            })
        }
    }

    // 控制 plate 模块的淡入淡出
    function plateTransition() {
        // 获取palte模块
        let plateFather = document.querySelector('#plate');
        let plateChilds = document.querySelectorAll('#plate li');
        const LIMIT = Math.ceil(plate.offsetHeight / 4);
        for (let i = 0; i < plateChilds.length; i++) {
            elementInOut({
                childEle: plateChilds[i],
                cla: 'in-view-show',
                fatherEle: plateFather,
                delayCla: 'plate-delay',
                fadeCla: 'in-view-hide',
                limit: LIMIT
            })
        }
    }

    // 控制 story标题 模块的淡入淡出
    function stortyTitleTransition() {
        let storyTitle = getEle('#storyTitle');
        let english = getEle('#storyTitle .eng');
        let chinese = getEle('#storyTitle .chinese');
        const LIMIT = Math.ceil(storyTitle.offsetHeight / 3);
        // 英文大字
        elementInOut({
            childEle: english,
            cla: 'text-center',
            limit: LIMIT,
            fatherEle: storyTitle
        });
        // 中文小字
        elementInOut({
            childEle: chinese,
            cla: 'text-center',
            limit: LIMIT,
            fatherEle: storyTitle
        });
    }

    // 控制 srory内容 模块的淡入淡出
    function storyTextTransition() {
        // 简介content
        let storyText = getEleAll('.story-text > p');
        for(let i = 0; i < storyText.length; i++) {
            elementInOut({
                childEle: storyText[i],
                cla: 'show-block'
            });
        }
    }

    // 控制 character 模块的淡入淡出
    function chaTitleTransition() {
        let chaTitle = getEle('#chaTitle');
        let english = getEle('#chaTitle .eng');
        let chinese = getEle('#chaTitle .chinese');
        const LIMIT = Math.ceil(chaTitle.offsetHeight / 3);
        // 英文大字
        elementInOut({
            childEle: english,
            cla: 'text-center',
            limit: LIMIT,
            fatherEle: chaTitle
        });
        // 中文小字
        elementInOut({
            childEle: chinese,
            cla: 'text-center',
            limit: LIMIT,
            fatherEle: chaTitle
        });
    }

    // 控制 character nav 模块的淡入淡出
    function chaNavTransition() {
        let charNav = getEle('#charNav');
        let charNavLi = getEleAll('#charNav ul li div');
        for (i = 0; i < charNavLi.length; i++) {
            elementInOut({
                childEle: charNavLi[i],
                cla: 'show-block',
                fatherEle: charNav,
                delayCla: 'delay',
                fadeCla: 'hide-block'
            });
        }
    }

    // 控制元素的淡入淡出 -- 公共方法
    /**
     *
     * childEle: 当前要被添加动画的元素
     * cla： 当前添加的动画class
     * fatherEle： 当前要被添加动画的元素的父元素（考虑到某些要被添加动画效果的元素一开始不占位）
     * delayCla： 当前元素触发动画效果的延迟时间的class
     * fadeCla： 当前元素淡出时的动画class（一般淡入跟淡出所用的时间以及动画函数不太一致，淡出要快一些）
     * limit: 当前元素淡入淡出的距离
     *
     *  **/
    function elementInOut(animeData) {
        // 如果当前参数不是规定类型的参数，抛错提示
        try {
            if (Object.prototype.toString.call(animeData) !== '[object Object]') {
                throw new Error('该函数参数应为对象');
            }
        } catch(error) {
            console.log('error ->', error)
        }
        let { childEle, cla, fatherEle, delayCla, fadeCla, limit } =  animeData;
        // 当前屏幕高度
        let screenClientHeight = document.documentElement.clientHeight;
        console.log('screenClientHeight ->', screenClientHeight)
        // 滚动条的滚动距离
        let scrollTop = document.documentElement.scrollTop;
        // 计算滚动条的当前位置
        let currentHeight = screenClientHeight + scrollTop;
        // 模块在淡入或者淡出时剩余的高度
        const FADELIMIT = limit || 50;
        // 判断淡入淡出的基准是 当前元素的父元素 还是 当前元素
        let limitEle = fatherEle ? fatherEle : childEle;

        /*

        向下滑动-淡入 与 向上滑动-淡出 用的是同一个逻辑：
            当前滚动条的滚动距离 小于 要处理元素距离浏览器顶部的距离

        向下滑动-淡出 与 向上滑动-淡入 用的是同一个逻辑：
            当前滚动条的滚动距离 大于 要处理元素距离浏览器顶部的距离
            假设当前要处理的元素是 一条线，当前滚动条要 完全覆盖这条线 则需要：当前屏幕高度 + 滚动条滚动距离（滚动条距离当前元素距离 + 当前屏幕高度）

        */

        // 向下滑动 - 淡入
        if ( (scrollTop < limitEle.offsetTop) && currentHeight > limitEle.offsetTop + FADELIMIT) {
            !hasClass(childEle, cla) && childEle.classList.add(cla);
            // 判断是否存在需要延迟的class
            delayCla && !hasClass(childEle, delayCla) &&  childEle.classList.add(delayCla);
            // 判断是否存在需要重绘当前元素淡出动画的class
            fadeCla && hasClass(childEle, fadeCla) &&  childEle.classList.remove(fadeCla);
        }
        // 向下滑动 - 淡出
        if ( (scrollTop > limitEle.offsetTop) && scrollTop > limitEle.offsetTop + limitEle.clientHeight - FADELIMIT) {
            hasClass(childEle, cla) && childEle.classList.remove(cla);
            delayCla && hasClass(childEle, delayCla) && childEle.classList.remove(delayCla);
            fadeCla && !hasClass(childEle, fadeCla) &&  childEle.classList.add(fadeCla);
        }
        // 向上滑动 - 淡入
        if ( (scrollTop > limitEle.offsetTop) && scrollTop < limitEle.offsetTop + limitEle.clientHeight - FADELIMIT) {
            !hasClass(childEle, cla) && childEle.classList.add(cla);
            delayCla && !hasClass(childEle, delayCla) && childEle.classList.add(delayCla);
            fadeCla && hasClass(childEle, fadeCla) &&  childEle.classList.remove(fadeCla);
        }
        // 向上滑动 - 淡出
        if ( (scrollTop < limitEle.offsetTop) && currentHeight < limitEle.offsetTop + FADELIMIT) {
            hasClass(childEle, cla) && childEle.classList.remove(cla);
            delayCla && hasClass(childEle, delayCla) && childEle.classList.remove(delayCla);
            fadeCla && !hasClass(childEle, fadeCla) &&  childEle.classList.add(fadeCla);
        }
    }

    // 获取相应id的元素
    function getEle(id) {
        return document.querySelector(id);
    }

    function getEleAll(ele) {
        return document.querySelectorAll(ele);
    }

    // 检测元素中是否含有某个class
    function hasClass(elem, cls) {
        cls = cls || '';
        if(cls.replace(/\s/g, '').length == 0) return false;
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    }
}