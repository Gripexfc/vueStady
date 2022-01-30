
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
    //递归处理响应
    obServe(val);
    Object.defineProperty(obj, key, {
        get() {
            console.log('get')
            return val;
        },
        set(v) {
            console.log('set')
            if (v === val) return;
            // upData()
            return val = v;
        }
    })
}

function obServe(obj) {
    if (typeof val !== 'object' && obj == null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        //数组处理
    } else {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }
}

class Vue{
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        console.log(options,'options')
        obServe(this.$data);
        poxy(this);
        new Compile(this.$options.el);
    }
}

class Compile {
    constructor(el) {
        this.$el = document.querySelector(el);
        this.compile(this.$el);
    }

    compile(el) {
        el.childNodes.forEach(node => {
            if (this.isElement(node)) {
                this.compileElement(node);
                //递归节点
                if (node.childNodes && node.childNodes.length > 0) {
                    this.compile(node);
                }
            } else if(this.isInter(node)) {

            }
        })
    }

    isElement(node) {
        return node.nodeType === 1;
    }

    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileElement(node) {
        // node.att
        Array.from(node.attributes).forEach(attr => {
            const attrName = attr.name;
            const exp = attr.value;
            if (this.isDir(attrName)) {

            }
        })
    }

    isDir(name) {
        console.log(name.startsWith('v-'),'name.startsWith()')
        return name.startsWith('v-');
    }


}




class Watcher {

}

class Dep {
    constructor() {

    }

    depAdd() {

    }
    notify() {

    }
}


