import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import styles from "../../page.module.css";
import panel from "./ProductsList.module.css";

type Product = {
  id: string;
  fullDisplayName: string;
  price: number | null;
  productCategory: { name: string } | null;
  brand: { name: string; isOwnBrand: boolean } | null;
  thumbnailImageUrls: { url: string }[] | null;
};

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products {
    products {
      id
      fullDisplayName
      price
      productCategory {
        name
      }
      brand {
        name
        isOwnBrand
      }
      thumbnailImageUrls {
        url
      }
    }
  }
`;

// Build an absolute URL to our own GraphQL route. On the server, fetch() needs
// an absolute URL, so derive the origin from the incoming request headers.
async function getProducts(): Promise<Product[]> {
  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
    // Always fetch fresh data at request time for this example.
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.content}>
        <p>
          A taco-night catalog fetched from the local GraphQL API{" "}
          <strong>on the server</strong>, at render time. Select any product to
          open its <strong>Product Detail Page (PDP)</strong>, which fetches a
          single product by <code>id</code>.
        </p>
      </div>

      <section className={panel.panel}>
        <h2 className={panel.heading}>Taco ingredients</h2>
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
      </section>
    </div>
  );
}
