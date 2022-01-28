import {onBeforeUnmount} from "vue";
import forEach from 'lodash/forEach'

export default {
   created() {
      const watchers = [];
      // Foreach prop, check if there is a sync on it
      Object.entries(this.$options.props || {}).forEach(([prop, opts]) => {
         if (opts.sync) {
            watchers.push(
               this.$watch(
                  prop,
                  val => {this[opts.sync] = val;},
                  {
                     immediate: false
                  }
               ),

               this.$watch(
                  opts.sync,
                  val => {
                     if (val !== this[prop]) {
                        //this.$emit(`update:${prop}`, val);
                     }
                  },
                  {
                     immediate: false
                  }
               )
            );
            if (this[prop] !== undefined || "default" in props) {
               this[opts.sync] = this[prop];
            }
         }
         if (opts.watch) {
            watchers.push(
               this.$watch(prop, (newVal, oldVal) => {
                  opts.watch.bind(this)(newVal, oldVal);
               })
            );
            opts.watch.bind(this)(newVal, oldVal);
         }
      });

      // Before unmount remove the watchers
      onBeforeUnmount(() => {
         forEach(watchers, unwatch => unwatch());
      })
   }
};
