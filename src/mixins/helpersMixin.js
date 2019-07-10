export default {
    methods: {
        /**
         * Check is field empty
         * @param { String } fieldRefName - Ref name of field element
         * @returns { Boolean }
         */
        isFieldEmpty(fieldRefName) {
            return !this.$v[fieldRefName].required;
        },
        /**
         * Check is field full
         * @param { String } fieldRefName - Ref name of field element
         * @returns { Boolean }
         */
        isFieldFull(fieldRefName) {
            return this.$v[fieldRefName].length;
        },
        /**
         * Get index of item in array
         * @param { Object } item
         * @param { Array } array
         * @returns { Number }
         */
        itemIndex(item, array) {
            return array.map(obj => obj.ref).indexOf(item);
        },
        /**
         * Check is item first in array
         * @param { Object } item
         * @param { Array } array
         * @returns { Boolean }
         */
        isItemFirst(item, array) {
            return this.itemIndex(item, array) === 0;
        },
        /**
         * Check is item last in array
         * @param { Object } item
         * @param { Array } array
         * @returns { Boolean }
         */
        isItemLast(item, array) {
            return this.itemIndex(item, array) === array.length - 1;
        }
    }
};
