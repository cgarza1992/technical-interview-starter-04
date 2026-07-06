import { headers } from "next/headers";
import styles from "../../page.module.css";
import panel from "./ProductsList.module.css";
import ProductSearch from "./ProductSearch";

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
        <ProductSearch products={products} />
      </section>
    </div>
  );
}
