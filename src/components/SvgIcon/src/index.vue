<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
    const requireAll = requireContext => requireContext.keys().map(requireContext);
    const req = require.context('./../../../assets/icon/svg/', false, /\.svg$/);
    console.log(req.keys());
    requireAll(req);

    export default {
        name: 'SvgIcon',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String
            }
        },
        computed: {
            iconName() {
                return `#svg-icon-${this.iconClass}`
            },
            svgClass() {
                return `svg-icon ${this.className || ""}`;
            }
        }
    }
</script>

<style lang="less" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: middle;
        fill: currentColor;
        overflow: hidden;
        font-size: 40px;
    }
</style>
