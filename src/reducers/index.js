import jsonDictionary from "../data/english.json";

const initialState = {
    dictionary: [],
    match: [],
    currentWordData: null,
};

export default function rootReducer(state = initialState, action) {
    if (action.type === "GET_PARTIAL_MATCH") {
        return {
          ...state,
          match: state.dictionary.filter(el => el?.word.includes(action.payload))
        }
    }

    if (action.type === "GET_TOTAL_MATCH") {
      return {
        ...state,
        currentWordData: state.dictionary.find(el => el?.word.toLowerCase() === action.payload.toLowerCase())?.definition || "no se pudo"
      }
    }
    if (action.type === "LOAD_DICTIONARY" && state.dictionary.length === 0) {
      console.log("hola", jsonDictionary)
      return {
        ...state,
        dictionary: jsonDictionary
      }
    }

    return state;
  }
  