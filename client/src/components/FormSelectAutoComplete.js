import { useState, useEffect, useRef } from "react"


const AutoComplete = ({ labelText, name, list, handleChange }) => {
    const [value, setValue] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)

    const suggestions = list.filter(option => option.toLowerCase().includes(value.toLowerCase()))
    
    const autocompleteRef = useRef()


    useEffect(() => {
        const handleClick = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    const handleSuggestionClick = (suggetion) => {
        setValue(suggetion)

        setShowSuggestions(false)
    }

    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>{labelText || name}</label>

            <input
                value={value}
                onChange={handleChange}
                placeholder="Search"
                onFocus={() => setShowSuggestions(true)}
                className='form-input'
            />
            {showSuggestions && (
                <ul className='form-label'>
                    {suggestions.map(suggestion => (
                        <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}


export default AutoComplete