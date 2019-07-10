const cacheClickOutside = "__vueClickOutside__";

export default {
    bind(el, binding, vNode) {
        // Validate binding
        if (typeof binding.value !== "function") {
            const compName = vNode.context.name;
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
            compName && (warn += `Found in component '${compName}'`);

            console.warn(warn);
        }

        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = event => {
            if (bubble || (!el.contains(event.target) && el !== event.target)) {
                binding.value(event);
            }
        };
        el[cacheClickOutside] = handler;

        document.addEventListener("click", handler);
        document.addEventListener("touchstart", handler);
    },
    unbind(el) {
        document.removeEventListener("click", el[cacheClickOutside]);
        document.removeEventListener("touchstart", el[cacheClickOutside]);
        delete el[cacheClickOutside];
    }
};
