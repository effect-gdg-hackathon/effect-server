exports.effectMapper = {
    map: function(effect) {
        let imageUrl = effect.imageUrl
        if (!imageUrl) {
            const idx = effect.postId % 4
            imageUrl = `/images/default-${idx}.jpeg`
        }

        const isAbsolute = imageUrl.startsWith('http')

        return {
            ...effect,
            imageUrl: isAbsolute ? imageUrl : `${process.env.API_URL}${imageUrl}`,
        }
    },
    mapList: function(effects) {
        return effects.map(this.map)
    }
}