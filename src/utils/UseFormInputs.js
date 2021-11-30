export default {
    inheritAttrs: false,
    data() {
        return {
            hasErrors: false,
            default: () => {
                return this.errors.length > 0;
            }
        }
    },
    props: {
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
            default: () => [],
        },
        showErrors: {
            type: Boolean,
            default: true,
        },
        showLeadingErrorIcon: {
            type: Boolean,
            default: true,
        },

        // Layout for the field, above, inline, etc
        layout: {
            type: [String],
            default: 'default',
            required: false,
            validate: (rowStyle) => {
                return ['default', 'content', 'standard', 'naked'].includes(rowStyle)
            },
        },

        // Defines if a form has a field above or bellow
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
        }
    },
    watch: {
        modelValue: {
            handler: function (value, oldValue) {
                // This ensures the state is cleared when the user changes the input
                if (value !== oldValue && value !== '') {
                    this.hasErrors = false;
                }
            }
        },
        errors: {
            immediate: true,
            handler: function (value) {
                this.hasErrors = !!value.length;
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
