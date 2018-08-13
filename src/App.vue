<template>
    <div id="app" class="fillcontain">
        <transition name="bounce">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
    created () {
        let OriginTitile = document.title, titleTime;
        // document.addEventListener('visibilitychange', function () {
        //     if (document.hidden) {
        //         document.title = '死鬼去哪里了！';
        //         clearTimeout(titleTime);
        //     } else {
        //         document.title = '(つェ⊂)咦!又好了!';
        //         titleTime = setTimeout(function () {
        //             document.title = OriginTitile;
        //         }, 2000);
        //     }
        // });
    }
}
</script>

<style lang="less">
@import './style/common';
@import './style/table';
.bounce-enter-active {
    animation: bounce-enter .5s;
    -webkit-animation: bounce-enter .5s;
}

.bounce-leave-active {
    animation: bounce-leave .2s;
    -webkit-animation: bounce-leave .2s;
}

@keyframes bounce-enter {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes bounce-leave {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.95);
    }
    100% {
        transform: scale(0);
    }
}
</style>
