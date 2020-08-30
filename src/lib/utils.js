module.exports = {
    date(timestamp){
        const now = new Date(timestamp)

        const y = now.getFullYear()
        const m = `0${now.getMonth() + 1}`.slice(-2)
        const d = `0${now.getDate()}`.slice(-2)

        return {
            iso: `${y}-${m}-${d}`
        }
    }
}