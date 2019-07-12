import { camelToKebab } from "@/utils/helpers";

export default {
    props: {
        errors: Object,
        isReset: Boolean,
        imagesBasePath: String
    },
    data() {
        return {
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
                const mask = "**** ";
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
            delete errors[type];
            this.$emit("clear-errors", errors);
        },
        /**
         * Reset all fields in form
         */
        resetForm() {
            for (const field of this.fields) {
                const value = field.ref;
                this.$emit(`input-${camelToKebab(value)}`, "");
            }
            this.isSmall && (this.cardNumberCollapsed = false);
            this.$emit("reset", false);
        }
    }
};
