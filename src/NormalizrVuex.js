const arrayToObject = (fields) => fields.reduce((prev, key) => {
    prev[key] = key
    return prev
}, {})

const isIdFunction = (idResolver) => typeof idResolver === 'function'

export const normalizrFactory = (stateProp, entity, idResolver,  module) => (fields) => {
    const fieldsObject = Array.isArray(fields) ? arrayToObject(fields) : fields
    return Object.keys(fieldsObject).reduce((prev, key) => {
        const property = fieldsObject[key]
        prev[key] = {
            get () {
                const state = !module ? this.$store.state : this.$store.state[module]
                const idx = isIdFunction(idResolver) ? idResolver(this) : state[idResolver]
                if (!idx) { return }
                return state[stateProp].entities[entity][idx][property]
            },
            set (value) {
                const isFn = isIdFunction(idResolver)
                const payload = {
                    module,
                    stateProp,
                    entity,
                    property,
                    id: isFn ? idResolver(this) : idResolver,
                    isFn,
                    value
                }
                this.$store.commit('normalizrMutate', payload)
            }
        }
        return prev
    }, {})
}

export const normalizrMutate = (state, payload) => {
    const { stateProp, entity, property, id, value, module, isFn } = payload
    const destState = !module ? state : state[module]
    const idx = isFn ? id : destState[id]
    destState[stateProp].entities[entity][idx][property] = value
  }

