"use client"
import { useState } from "react";
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
    const [results, setResults ] = useState<Product[]>( products ); // Seed from the props.

    /**
     * Runs a product search against the GraphQL API and replaces the visible list.
     * Filtering happens on the server via the `search` argument — this just swaps in
     * whatever the resolver returns (no client-side filtering).
     *
     * @param query - the user's search text, sent as the GraphQL `search` variable
     */
    async function handleSearch(query: string) {

    const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: PRODUCTS_QUERY, variables: { search: query } }),
    });

    const json = await res.json();

    setResults(json.data.products);
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch} placeholder="Search products..." />
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