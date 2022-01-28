import SyncProps from "@/utils/SyncProps";
export default {
    inheritAttrs: false,
    emits: [
      'update:modelValue',
      'update:errors',
      'labelClick'
    ],
    data() {
        return {
            internalValue: null,
            internalErrors: null,
        }
    },
    mixins: [
      SyncProps
    ],
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object, Array],
            default: null,
            sync : 'internalValue'
        },
        label: {
            type: [String, Number],
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        nameSeed: {
            type: String,
            default: '',
            required: false,
        },
        help: {
            type: String,
            default: ''
        },
        errors: {
            type: [Array, String],
            default: null,
            sync: 'internalErrors',
        },
        showErrors: {
            type: Boolean,
            default: true,
        },
        showLeadingErrorIcon: {
            type: Boolean,
            default: true,
        },
        layout: {
            type: [String],
            default: 'default',
            required: false,
            validate: (rowStyle) => {
                return ['default', 'content', 'standard', 'naked'].includes(rowStyle)
            },
        },
        grouped: {
            type: [String],
            default: null,
            required: false,
            validate: (grouped) => {
                return ['bellow', 'above'].includes(grouped)
            },
        }
    },
    computed: {
        classesForButtonHasGroupAbove() {
            if(!this.grouped){
                return 'rounded-lg';
            }
            return this.grouped === 'above' ? 'rounded-none rounded-b-md focus:z-10' : ''
        },
        classesForButtonHasGroupBellow() {
            if(!this.grouped){
              return 'rounded-lg';
            }
            return this.grouped === 'bellow' ? 'rounded-none rounded-t-md focus:z-10' : ''
        },
        hasErrors(){
          return !!this.internalErrors?.length
        }
    },
    watch: {
        internalValue: {
            immediate: false,
            handler: function (value, oldValue) {
                console.log('changed', value, oldValue)
                // This ensures the state is cleared when the user changes the input
                if(oldValue !== null && value !== oldValue){
                  this.internalErrors = null;
                }

                this.$emit('update:modelValue', value)
            }
        },
    },
    methods: {
        onClickLabel(){
            this.$refs.input.focus()
        },
        uuid(seed = ''){
            return (Math.random() + 1).toString(36).substring(7) + '_' + this.nameSeed || seed;
        }
    }
}
