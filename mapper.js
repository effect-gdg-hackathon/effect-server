exports.effectMapper = {
    map: function(effect) {
        const isAbsolute = effect.imageUrl.startsWith('http')

        return {
            ...effect,
            imageUrl: isAbsolute ? effect.imageUrl : `${process.env.API_URL}${effect.imageUrl}`,
        }
    },
    mapList: function(effects) {
        return effects.map(this.map)
    }
}