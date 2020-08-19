module.exports = {
    date(timestamp){
        const now = new Date()

        const y = now.getFullYear()
        const m = now.getUTCMonth()
        const d = now.getUTCDay()

        return {
            iso: `${y}-${m}-${d}`
        }
    }
}