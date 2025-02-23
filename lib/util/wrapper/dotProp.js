import {getProperty, setProperty, hasProperty, deleteProperty, escapePath, deepKeys} from 'dot-prop';

class dotProp {

    set(obj, path, val) {
        return  setProperty(obj, path, val)
    }

    get(obj, path) {
         return getProperty(obj, path)
    }

    has(obj, path) {
        return hasProperty(obj, path)
   }

   delete(object, path) {
        return deleteProperty(object, path)
   }

   escape(paht) {
        return escapePath(path)
   }

   deep(object) {
        return deepKeys(object)
   }
}

export default dotProp;