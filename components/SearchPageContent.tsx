"use client"

import { useState, type ReactNode } from "react"
import SearchBar from "./SearchBar"

type SearchPageContentProps<T> = {
    items: T[]                                   // server-fetched data, passed in as a prop
    filter: (item: T, query: string) => boolean  // caller decides what "matches" means
    renderItem: (item: T) => ReactNode           // caller decides how each row looks
    getKey: (item: T) => string                  // stable key for the list
    title?: string
}

// Generic search page: holds the query state, filters the incoming items, and
// renders them. Knows nothing about the data shape — that's the caller's job.
export default function SearchPageContent<T>({
    items,
    filter,
    renderItem,
    getKey,
    title = "Search",
}: SearchPageContentProps<T>) {
    const [query, setQuery] = useState("")

    // Empty query => everything shows.
    const results = query ? items.filter((item) => filter(item, query)) : items

    return (
        <main style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem" }}>
            <h1>{title}</h1>

            {/* onSearch fires on submit; store the query so the list re-filters */}
            <SearchBar onSearch={setQuery} placeholder="Search..." />

            <p style={{ color: "#666", fontSize: 14 }}>
                {results.length} of {items.length} results
            </p>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {results.map((item) => (
                    <li key={getKey(item)} style={{ borderBottom: "1px solid #eee", padding: "1rem 0" }}>
                        {renderItem(item)}
                    </li>
                ))}

                {results.length === 0 && <li>No results match “{query}”.</li>}
            </ul>
        </main>
    )
}
