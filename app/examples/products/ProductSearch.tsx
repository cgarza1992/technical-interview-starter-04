"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import panel from "./ProductsList.module.css";
import SearchBar from "@/components/SearchBar";

type Product = {
  id: string;
  fullDisplayName: string;
  price: number | null;
  productCategory: { name: string } | null;
  brand: { name: string; isOwnBrand: boolean } | null;
  thumbnailImageUrls: { url: string }[] | null;
};

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($search: String) {
    products(search: $search) {
      id fullDisplayName price
      productCategory { name }
      brand { name isOwnBrand }
      thumbnailImageUrls { url }
    }
  }
`;


export default function ProductSearch({products}: { products: Product[] }) {
    const [query, setQuery] = useState("");
    const [results, setResults ] = useState<Product[]>( products ); // Seed from the props.
    const [isLive, setIsLive] = useState(true);

    useEffect( () => {
        const controller = new AbortController();
        const timeout = setTimeout( async () => {
            try {
                const res = await fetch("/api/graphql", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: PRODUCTS_QUERY, variables: { search: query } }),
                    signal: controller.signal,
                });

                const json = await res.json();

                setResults(json.data.products);
            } catch (err ) {
                if(err instanceof DOMException && err.name === "AbortError" ) return; // Expected on cancel.
                throw err; // Real error for everything else.
            }
        }, 300);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        }
    }, [query] );

    return (
        <div>
            <div className={panel.toggle} role="group" aria-label="Search mode">
                <button
                    type="button"
                    className={`${panel.toggleButton} ${isLive ? panel.toggleActive : ""}`}
                    onClick={() => setIsLive(true)}
                    aria-pressed={isLive}
                >
                    Live
                </button>
                <button
                    type="button"
                    className={`${panel.toggleButton} ${!isLive ? panel.toggleActive : ""}`}
                    onClick={() => setIsLive(false)}
                    aria-pressed={!isLive}
                >
                    Submit
                </button>
            </div>
            <SearchBar live={isLive} onSearch={(q) => setQuery(q)} placeholder="Search products..." />
            <ul className={panel.list}>
            {results.map((product) => {
                const thumbnail = product.thumbnailImageUrls?.[0]?.url;
                return (
                <li key={product.id}>
                    <Link
                    href={`/examples/products/${product.id}`}
                    className={panel.item}
                    >
                    {thumbnail ? (
                        <Image
                        className={panel.thumb}
                        src={thumbnail}
                        alt={product.fullDisplayName}
                        width={56}
                        height={56}
                        />
                    ) : (
                        <span className={panel.thumb} aria-hidden="true" />
                    )}
                    <span className={panel.info}>
                        <span className={panel.name}>
                        {product.fullDisplayName}
                        </span>
                        <span className={panel.meta}>
                        {product.productCategory?.name ?? "Uncategorized"}
                        {product.brand?.name ? ` · ${product.brand.name}` : ""}
                        </span>
                    </span>
                    <span className={panel.price}>
                        {product.price != null
                        ? `$${product.price.toFixed(2)}`
                        : "—"}
                    </span>
                    </Link>
                </li>
                );
            })}
            </ul>
        </div>

    );
}