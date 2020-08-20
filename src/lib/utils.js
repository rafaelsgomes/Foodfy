module.exports = {
    date(timestamp){
        const now = new Date(timestamp)

        const y = now.getFullYear()
        const m = `0${now.getUTCMonth() + 1}`.slice(-2)
        const d = `0${now.getUTCDate()}`.slice(-2)

        return {
            iso: `${y}-${m}-${d}`
        }
    }
}