<template >
    <section class="app-test-sprite">
        <a href="javascript:void(0)" class="icon"></a>
    </section>
</template>

<script type="text/javascript" >
    export default {
        name: "AppViewTestSprite"
    }
</script>

<style type="text/css" lang="less" >
    @import (reference) "../../assets/icon/sprite.less";

    .app-test-sprite {
        width: 100%;
        height: 100%;
        .icon {
            .icon-icon-lock;
            &:hover {
                .icon-icon-unlock;
            }
        }
    }
</style>