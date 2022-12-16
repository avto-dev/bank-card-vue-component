<template>
    <button
        class="vbc-btn"
        :class="{ 'vbc-btn--disabled': disable, 'vbc-btn--focused': disable }"
        title="Удалить данные карты"
        @click.stop="$emit('delete-card', $event)"
    >
        <svg xmlns="http://www.w3.org/2000/svg"
             width="15"
             height="17"
             viewBox="0 0 15 17"
        >
            <path d="M8 .5c1.6 0 2.7.8 3 2.4h3.8a.7.7 0 0 1 .1 1.3H14l-1 9.4c-.2 1-1 1.8-2 1.9H5.1c-1.1 0-2-.8-2.2-2L2 4.3h-.8A.7.7 0 0 1 1 3h4H5C5.3 1.3 6.4.5 8 .5Zm4.6 3.8H3.4l1 9.1c0 .4.3.7.6.7h5.8c.4 0 .8-.3.8-.7l1-9.2ZM8 5.3c.3 0 .6.3.7.7v6.2a.7.7 0 0 1-1.4 0V6.1c0-.4.3-.7.7-.7Zm2.6 0c.3.1.6.4.6.7l-.4 6.2a.7.7 0 0 1-1.3 0L9.9 6c0-.4.3-.6.7-.6ZM6 6V6l.4 6.2a.7.7 0 0 1-1.3.1L4.8 6A.7.7 0 0 1 6 5.9ZM8 2c-1 0-1.4.3-1.6 1h3.2c-.2-.7-.7-1-1.6-1Z"/>
        </svg>
    </button>
</template>

<script>
export default {
    name: "VueBankCardSmallBtnDel",
    props: {
        disable: {
            type: Boolean,
            default: false
        },
        focused: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped lang="scss">
$base-color: #343434;
$invalid-color: #ff0624;
$disabled-color: #b7c7dc;

.vbc-btn {
    display: flex;
    width: 43px;
    height: 100%;
    padding: 0;
    border: 0;
    border-left: 1px solid #b7c7dc;
    outline: none;
    background-color: transparent;
    cursor: pointer;

    svg {
        display: block;
        width: 15px;
        height: 15px;
        margin: auto;
        fill: #ff5959;
    }

    &:hover,
    &:focus {
        svg {
            fill: #f93232;
        }
    }

    &--disabled {
        svg {
            fill: $disabled-color;
        }

        &:hover,
        &:focus {
            cursor: default;
            svg {
                fill: $disabled-color;
            }
        }
    }
}
</style>
