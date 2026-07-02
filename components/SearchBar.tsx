"use client"

import { useState } from "react"

type SearchBarProps = {
    onSearch: (query: string) => void   // parent decides what "search" does
    placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = "Search..." }: SearchBarProps) {
    const [query, setQuery] = useState("")   // controlled input: React owns the value

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)             // e.target.value = current text in the input
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()                   // stop the form from reloading the page
        onSearch(query.trim())               // hand the cleaned query up to the parent
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}                // value from state => controlled
                onChange={handleChange}      // every keystroke updates state
                placeholder={placeholder}
            />
            <button type="submit">Search</button>
        </form>
    )
}
