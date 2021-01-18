export function getPartialMatch(string) {
    return {payload: string, type: "GET_PARTIAL_MATCH"}
}

export function getTotalMatch(string) {
    return {payload: string, type: "GET_TOTAL_MATCH"}
}

export function loadDictionary() {
    return {type: "LOAD_DICTIONARY"}
}