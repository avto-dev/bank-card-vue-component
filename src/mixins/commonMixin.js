import { camelToKebab } from "@/utils/helpers";

export default {
    props: {
        isNew: Boolean,
        cardInfo: {
            type: Object,
            default: null
        },
        number: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        errors: Object,
        isReset: Boolean,
        isFocus: Boolean,
        imagesBasePath: String
    },
    data() {
        return {
            cardNumber: this.number,
            cardHolderName: this.name,
            expDateMonth: this.month,
            expDateYear: this.year,
            cvv: this.code,
            reseting: false,
            isCvvSecured: false
        };
    },
    watch: {
        isReset(value) {
            value && this.resetForm();
        }
    },
    computed: {
        /**
         * Collapsing completely filled number
         * @returns { String }
         */
        numberCollapsed() {
            if (this.isFieldFull("cardNumber")) {
                const mask = "•••• ";
                const number = this.cardNumber.slice(-4);
                return mask + number;
            } else {
                return "";
            }
        }
    },
    methods: {
        /**
         * Set focus on text field
         * @param { String } refName - Ref name of text field element
         */
        focusOnField(refName) {
            this.$nextTick(() => {
                this.$refs[refName] && this.$refs[refName].focus();
            });
        },
        /**
         * Autocomplete a date (month or year) after blur on half-filled field
         * @param { Object } e - Event
         */
        autocompleteDate(e) {
            if (e.target.value.length === 1) {
                e.preventDefault();
                const field = e.target.dataset.cp;
                const value = "0" + e.target.value;

                this[field] = value;
                this.$emit(`input-${camelToKebab(field)}`, value);
            }
        },
        /**
         * Filter errors from outside by type of field
         * @param { String } type - Type of error
         * @returns { String } - Message of suitable error
         */
        errorFiltered(type) {
            let errorFiltered = "";
            Object.entries(this.errors).forEach(([key, value]) => {
                type === key && (errorFiltered = value);
            });
            return errorFiltered;
        },
        /**
         * Clear internal and external errors
         * @params {String} type - Name of field
         */
        clearErrors(type) {
            this.$v[type].$reset();
            const errors = this.errors;
            errors[type] && delete errors[type];
            this.$emit("clear-errors", errors);
        },
        /**
         * Reset all fields in form
         */
        resetForm() {
            this.reseting = true;
            for (const field of this.fields) {
                this[field.ref] = "";
                this.$emit(`input-${camelToKebab(field.ref)}`, "");
            }
            this.$parent.isSmall && (this.cardNumberCollapsed = false);
            this.$emit("reset", false);
            this.$nextTick(() => {
                this.reseting = false;
            });
        },
        /**
         * Moving caret to the next or previous field
         * @param { String } direction - Direction of moving
         * @param { String } current - Key of element in model and data
         */
        moveCaretTo(direction, current) {
            let lengthCondition, orderItemCondition, goToItemIndex;

            if (direction === "forward") {
                lengthCondition = this.isFieldFull(current);
                orderItemCondition = this.isItemLast(current, this.fields);
                goToItemIndex = this.itemIndex(current, this.fields) + 1;
            } else if (direction === "backward") {
                lengthCondition = this[current].length === 0;
                orderItemCondition = this.isItemFirst(current, this.fields);
                goToItemIndex = this.itemIndex(current, this.fields) - 1;
            }

            if (lengthCondition && !orderItemCondition) {
                const currentItem = this.fields.find(
                    field => field.ref === current
                );
                const goToItem = this.fields[goToItemIndex];

                currentItem.collapsible && (this[`${current}Collapsed`] = true);
                goToItem.collapsible &&
                    (this[`${goToItem.ref}Collapsed`] = false);

                this.focusOnField(goToItem.ref);
            }
        },
        /**
         * Handle @input event on input
         * @param { Object } event
         * @param { String } type - Unique name of field
         */
        onInput(event, type) {
            if (event.isTrusted) return;
            this[type] = event.target.value;
            this.$emit(`input-${camelToKebab(type)}`, event.target.value);
            !this.reseting && this.moveCaretTo("forward", type);
        },
        /**
         * Handle @focus event on input
         * @param { Object } event
         * @param { String } type - Unique name of field
         */
        onFocus(event, type) {
            this.clearErrors(type);
            type === "cvv" && (this.isCvvSecured = false);
        },
        /**
         * Handle @blur event on input
         * @param { Object } event
         * @param { String } type - Unique name of field
         */
        onBlur(event, type) {
            (type === "expDateMonth" || type === "expDateYear") &&
                this.autocompleteDate(event);
            this.$v[type].$touch();
            type === "cvv" && (this.isCvvSecured = true);
        },
        /**
         * Handle @keydown.delete event on input
         * @param { Object } event
         * @param { String } type - Unique name of field
         */
        onDel(event, type) {
            this.moveCaretTo("backward", type);
        }
    }
};
