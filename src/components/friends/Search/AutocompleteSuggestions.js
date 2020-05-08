import React from 'react'
import AutocompleteItem from './AutocompleteItem'

export default function AutocompleteSuggestions(props) {

    if(props.matches.length !== 0){
        return (
            <div>
            {props.matches.map(x => {
                return(
                    <div>
                        <AutocompleteItem state={x} />
                    </div>
                )
            })}
            </div>
        )
    }else{
        return(
            <div>
                <p>Nothing matches that value</p>
            </div>
        )
    }

}
