const getDivesGroupedPerYear = (dives) => {
    return dives.reduce((previous, current) => {
        if (!previous[current.date.getFullYear()]) {
            previous[current.date.getFullYear()] = []
        }
        previous[current.date.getFullYear()].push(current)
        return previous
    }, {})
}

export { getDivesGroupedPerYear }