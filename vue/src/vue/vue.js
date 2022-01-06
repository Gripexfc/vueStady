class Vue{
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        debugger
        console.log(options,'options')
        obServe(this.$data);
        poxy(this);
    }
}

function poxy(vm) {
    Object.keys(vm.$data).forEach(key=>{
        Object.defineProperty(vm,key,{
            get() {
                return vm.$data[key];
            },
            set(v) {
                console.log(v,'v')
                return vm.$data[key] = v;
            }
        })
    })
}

function defineReactive(obj,key,val) {
    if (typeof val === 'object') {
        obServe(obj);
    }
    Object.defineProperty(obj, key, {
        get() {
            console.log('get')
            return val;
        },
        set(v) {
            console.log('set')
            if (v === val) return;
            return val = v;
        }
    })
}

function obServe(obj) {
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
