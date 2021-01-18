import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPartialMatch,
  getTotalMatch,
  loadDictionary,
} from "../../actions/index";
import "./Game.css";

const letters = (() => {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps.concat(caps.map(letter => letter.toLowerCase()));
})();

export default function Game () {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [userString, setUserString] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getPartialMatch(userString));
    console.log()
  }



  useEffect(() => {
    dispatch(loadDictionary());
  }, []);

  return <>
   <form onSubmit={handleSubmit}>
        <div>
          <label>Search words</label>
          <input
            type="text"
            id="userString"
            value={userString}
            onChange={e => setUserString(e.target.value)}
          />
        </div>
        {state.match?.map(el => <div>
          {el.definition}
        </div>)}
        <button type="submit">AGREGAR</button>
    </form>
  </>;
}
