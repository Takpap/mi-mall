const STORAGE_KEY = 'mall'
export default {
    getItem(key, module_name) {
        if (module_name) {
            let val = this.getItem(key)
            return val[module_name]
        }
        return this.getStorage[key]
    },
    setItem(key, value, module_name) {
        // if (module_name) {
        //     let val = this.getItem(key)
        //     val[key] = value
        // }
        let val = this.getStorage()
        val[key] = value
        sessionStorage.setItem(STORAGE_KEY, val)
    },
    getStorage() {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')

    },
    clear(key, module_name) {
        let = this.getStorage()
        if (module_name) {
            delete val[module_name][key]
        } else {
            delete val[key]
        }
        this.setItem(val)
    }

}