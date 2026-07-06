"use client"

import { useState } from "react"
import styles from "./SearchBar.module.css"

type SearchBarProps = {
    onSearch: (query: string) => void   // parent decides what "search" does
    placeholder?: string // Default text shown.
    live?: boolean // when true, fire onSearch on every keystroke
}

/**
 * Reusable, controlled search input. Owns the text value internally and reports
 * the query up to the parent via `onSearch`. The parent decides what "search" does.
 *
 * Two modes:
 * - **Submit** (default): emits only on Enter / the Search button.
 * - **Live** (`live`): also emits on every keystroke. Pair with a debounce in the
 *   parent, or you'll fire a request per character.
 *
 * @example
 * // live, debounced by the parent
 * <SearchBar live onSearch={setQuery} placeholder="Search products..." />
 */
export default function SearchBar({ onSearch, placeholder = "Search...", live = false }: SearchBarProps) {
    const [query, setQuery] = useState<string>("")   // controlled input: React owns the value

    /**
     * Fires on every keystroke. Pushes the current text into state (keeping the
     * input controlled) and, when `live` is on, emits it to the parent so search
     * can run as you type.
     *
     * Emits `value` (the fresh event value), NOT `query` — `query` is still the
     * previous render's snapshot at this point, so it would lag one character.
     *
     * @param e - input change event; `e.target.value` is the current text
     */
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value; // current text in the input
        setQuery(value);
        if(live) onSearch(value); // emit immediately; ProductSearch debounces
    }

    /**
     * Fires when the form is submitted (Enter or the Search button). Prevents the
     * browser's default full-page reload, then emits the trimmed query to the
     * parent. This is the only path search runs on when `live` is off.
     *
     * @param e - form submit event; typed as SyntheticEvent since we only need preventDefault
     */
    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()                   // stop the form from reloading the page
        onSearch(query.trim())               // hand the cleaned query up to the parent
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={query}                // value from state => controlled
                onChange={handleChange}      // every keystroke updates state
                placeholder={placeholder}
                className={styles.input}
            />
            <button type="submit" className={styles.button}>Search</button>
        </form>
    )
}
