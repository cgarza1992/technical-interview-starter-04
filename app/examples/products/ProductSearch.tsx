"use client"
import Image from "next/image";
import Link from "next/link";
import panel from "./ProductsList.module.css";

type Product = {
  id: string;
  fullDisplayName: string;
  price: number | null;
  productCategory: { name: string } | null;
  brand: { name: string; isOwnBrand: boolean } | null;
  thumbnailImageUrls: { url: string }[] | null;
};

export default function ProductSearch({products}: { products: Product[] }) {



    return (
        <ul className={panel.list}>
          {products.map((product) => {
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
    );
}