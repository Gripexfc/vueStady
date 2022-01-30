
function poxy(vm) {
    //代理
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
    const dep = new Dep();
    //递归处理响应
    obServe(val);
    Object.defineProperty(obj, key, {
        get() {
            Dep.target && dep.depAdd(Dep.target)
            return val;
        },
        set(v) {
            if (v === val) return;
            dep.notify();
            return val = v;
        }
    })
}

function obServe(obj) {
    console.log(typeof obj,'typeof obj')
    if (typeof obj !== 'object' || obj == null) {
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
        new Compile(this.$options.el,this);
    }
}

class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;
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
                this.compileText(node);
            }
        })
    }

    updata(node, exp, dir) {
        //找到对应更新函数
        const fn = this[dir + 'Updata'];
        fn(node, this.$vm[exp]);

        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val)
        })
    }

    textUpdata(node, exp) {
        // v-text
        node.textContent = exp;
    }

    htmlUpdata(node, exp) {
        // v-html
        node.innerHTML = exp;
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
                const dir = attrName.substring(2);
                this.updata(node, exp, dir);
                console.log(attrName.substring(2),'attrName.subString(2);')
            }
        })
    }

    compileText(node) {
        // {{}}
        this.updata(node, RegExp.$1, 'text')
    }

    isDir(name) {
        console.log(name.startsWith('v-'),'name.startsWith()')
        return name.startsWith('v-');
    }
}




class Watcher {
    constructor(vm, key, watcher) {
        this.watcher = watcher;
        this.key = key;
        this.$vm = vm;

        // debugger
        Dep.target = this;
        this.$vm[this.key];
        Dep.target = null;
    }

    updata() {
        this.watcher.call(this.vm, this.$vm[this.key]);
    }
}

class Dep {
    constructor() {
        this.dep = [];
    }

    depAdd(target) {
        this.dep.push(target);
    }
    notify() {
        this.dep.forEach(watcher => {
            watcher.updata();
        })
    }
}


