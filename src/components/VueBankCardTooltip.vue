<template>
    <transition name="slide">
        <div
            v-if="isShow"
            :class="['card__tooltip', `card__tooltip--${position}`]"
        >
            <span class="card__tooltip-message">
                <slot></slot>
            </span>
        </div>
    </transition>
</template>

<script>
export default {
    name: "VueBankCardTooltip",
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: "left"
        }
    }
};
</script>

<style lang="scss" scoped>
$base-font-family: "PT Sans", Arial, sans-serif;

.card {
    &__tooltip {
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 0;
        margin-top: 7px;
        padding: 4px 8px;
        background-color: #fff;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

        &::before {
            content: "";
            position: absolute;
            bottom: 100%;
            left: 15px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 4px 5px 4px;
            border-color: transparent transparent #fff transparent;
        }

        &-message {
            font-family: $base-font-family;
            font-size: 12px;
            line-height: 16px;
            white-space: nowrap;
            color: #000;
        }

        &--left {
            left: 0;

            &::before {
                left: 15px;
            }
        }

        &--right {
            left: auto;
            right: 0;

            &::before {
                left: auto;
                right: 15px;
            }
        }
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
