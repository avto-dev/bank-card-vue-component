<template>
    <div class="secured-helper">
        <svg class="secured-helper__image" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" @mouseleave="showInfo = false" @mouseover="showInfo = true">
            <path :fill="specialColor" fill-rule="evenodd" clip-rule="evenodd" d="M5 1.32569C2.69459 1.32569 0.825688 3.19459 0.825688 5.5C0.825688 7.80541 2.69459 9.67431 5 9.67431C7.30541 9.67431 9.17431 7.80541 9.17431 5.5C9.17431 3.19459 7.30541 1.32569 5 1.32569ZM0 5.5C0 2.73858 2.23858 0.5 5 0.5C7.76142 0.5 10 2.73858 10 5.5C10 8.26142 7.76142 10.5 5 10.5C2.23858 10.5 0 8.26142 0 5.5ZM5 3.88636C5.22801 3.88636 5.41284 4.07119 5.41284 4.2992V8.02842C5.41284 8.25643 5.22801 8.44127 5 8.44127C4.77199 8.44127 4.58716 8.25643 4.58716 8.02842V4.2992C4.58716 4.07119 4.77199 3.88636 5 3.88636Z"/>
            <path :fill="specialColor" d="M4.99996 3.43488C5.2533 3.43488 5.45867 3.2295 5.45867 2.97616C5.45867 2.72282 5.2533 2.51745 4.99996 2.51745C4.74661 2.51745 4.54124 2.72282 4.54124 2.97616C4.54124 3.2295 4.74661 3.43488 4.99996 3.43488Z"/>
        </svg>
        <VueBankCardTooltip :is-show="showInfo" :position="'start'">
            Трехзначный код на обратной стороне карты
        </VueBankCardTooltip>
   </div>
</template>

<script>
import VueBankCardTooltip from "./VueBankCardTooltip";

export default {
    name: "VueBankCardBaseHelper",
    components: {
        VueBankCardTooltip
    },
    props: {
        specialColor: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            showInfo: false
        };
    }
};
</script>

<style lang="scss" scoped>
.secured-helper {
    position: relative;
    &:hover {
        cursor: pointer;
    }
}

.secured-helper__image {
    width: 10px;
    height: 10px;
    margin-right: 5px;
}
</style>
