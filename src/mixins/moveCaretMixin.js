export default {
  watch: {
    cardNumber() {
      this.moveCaretTo("forward", "cardNumber");
    },
    expDateMonth() {
      this.moveCaretTo("forward", "expDateMonth");
    },
    expDateYear() {
      this.moveCaretTo("forward", "expDateYear");
    },
    cvv() {
      this.moveCaretTo("forward", "cvv");
    }
  },
  methods: {
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
      } else if (direction === "back") {
        lengthCondition = this[current].length === 0;
        orderItemCondition = this.isItemFirst(current, this.fields);
        goToItemIndex = this.itemIndex(current, this.fields) - 1;
      }

      if (lengthCondition && !orderItemCondition) {
        const currentItem = this.fields.find(field => field.ref === current);
        const goToItem = this.fields[goToItemIndex];

        currentItem.collapsible && (this[`${current}Collapsed`] = true);
        goToItem.collapsible && (this[`${goToItem.ref}Collapsed`] = false);

        this.focusOnField(goToItem.ref);
      }
    }
  }
};
