<template>
    <button
        class="vbc-btn"
        :class="{ 'vbc-btn--disabled': disable }"
        title="Удалить данные карты"
        @click.stop="$emit('delete-card', $event)"
    >
        <svg
            width="15"
            height="17"
            viewBox="0 0 15 17"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.609 3.139h-3.362v-.83A1.47 1.47 0 008.795.856h-3.28a1.47 1.47 0 00-1.452 1.453v.83H.785a.638.638 0 00-.623.622c0 .332.29.623.623.623h.747v11.163A1.47 1.47 0 002.984 17h8.425a1.47 1.47 0 001.453-1.453V4.384h.788c.332 0 .623-.29.623-.623 0-.332-.332-.622-.664-.622zm-8.3-.83c0-.125.082-.208.207-.208h3.279c.124 0 .207.083.207.208v.83H5.308v-.83zm6.266 13.238c0 .125-.083.208-.207.208H2.943c-.125 0-.208-.083-.208-.208V4.384h8.84v11.163z"
            />
            <path
                d="M4.686 4.305a.638.638 0 00-.623.623v7.47c0 .332.29.623.623.623.332 0 .622-.291.622-.623v-7.47a.611.611 0 00-.622-.623zM7.134 4.305a.638.638 0 00-.622.623v7.47c0 .332.29.623.622.623s.623-.291.623-.623v-7.47c0-.374-.249-.623-.623-.623zM9.002 4.928v7.47c0 .332.29.623.623.623.332 0 .622-.291.622-.623v-7.47a.638.638 0 00-.622-.623.611.611 0 00-.623.623z"
            />
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
        }
    }
};
</script>

<style scoped lang="scss">
$base-color: #343434;
$invalid-color: #ff0624;
$disabled-color: #e5e9ed;

.vbc-btn {
    display: flex;
    width: 43px;
    height: 100%;
    padding: 0;
    border: 0;
    border-left: 1px solid #e5e5e5;
    outline: none;
    background-color: transparent;
    cursor: pointer;

    svg {
        display: block;
        width: 15px;
        height: 15px;
        margin: auto;
        fill: lighten($invalid-color, 5%);
        transition: fill 0.3s;
    }

    &:hover,
    &:focus {
        svg {
            fill: darken($invalid-color, 5%);
        }
    }

    &--disabled {
        svg {
            fill: $disabled-color;
        }

        &:hover,
        &:focus {
            svg {
                fill: $disabled-color;
            }
        }
    }
}
</style>
