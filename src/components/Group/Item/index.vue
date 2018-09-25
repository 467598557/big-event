<template >
    <section class="app-componet-group" v-if="group">
        <AppComponentEventItem :key="event.id" v-for="event in group.events" :event="event"></AppComponentEventItem>
    </section>
</template>

<script type="text/javascript" >
    import AppComponentEventItem from 'src/components/Event/item';
    export default {
        name: "AppComponetGroupItem",
        props: {
            group: {
                type: Object,
                default: null
            }
        },
        components: {
            AppComponentEventItem
        },
    }
</script>

<style type="text/css" lang="less" >
    .app-componet-group {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        /*background: rgba(0, 0, 0, 0.5);*/
    }
</style>
