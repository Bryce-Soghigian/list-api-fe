import React from "react";
import AutocompleteItem from "./AutocompleteItem";
import "./Search.css";
export default function AutocompleteSuggestions(props) {
  if (props.matches.length !== 0 && props.input !== "") {
    return (
      <div className="autocomplete-container">
        {props.matches.map((x) => {
          return (
            <div>
              <AutocompleteItem state={x} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <p>Please Search A New Term</p>
      </div>
    );
  }
}
