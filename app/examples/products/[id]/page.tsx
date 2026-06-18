import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import styles from "../../../page.module.css";
import detail from "./ProductDetail.module.css";

type ProductImage = {
  url: string;
  size: string;
};

type Product = {
  id: string;
  fullDisplayName: string;
  productDescription: string | null;
  productPageURL: string | null;
  price: number | null;
  maximumOrderQuantity: number | null;
  minimumOrderQuantity: number | null;
  productCategory: { id: string | null; name: string | null } | null;
  brand: { name: string; isOwnBrand: boolean } | null;
  productImageUrls: ProductImage[] | null;
  thumbnailImageUrls: ProductImage[] | null;
};

const PRODUCT_QUERY = /* GraphQL */ `
  query Product($id: String!) {
    product(id: $id) {
      id
      fullDisplayName
      productDescription
      productPageURL
      price
      maximumOrderQuantity
      minimumOrderQuantity
      productCategory {
        id
        name
      }
      brand {
        name
        isOwnBrand
      }
      productImageUrls {
        url
        size
      }
      thumbnailImageUrls {
        url
        size
      }
    }
  }
`;

// Fetch a single product by id from our own GraphQL route (server-side).
async function getProduct(id: string): Promise<Product | null> {
  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: PRODUCT_QUERY, variables: { id } }),
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data.product;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const initial = product.fullDisplayName.trim().charAt(0).toUpperCase();
  const heroImage = product.productImageUrls?.[0]?.url;

  return (
    <div className={styles.container}>
      <Link href="/examples/products" className={detail.back}>
        ← Back to products
      </Link>

      <div className={detail.header}>
        {heroImage ? (
          <Image
            className={detail.image}
            src={heroImage}
            alt={product.fullDisplayName}
            width={120}
            height={120}
          />
        ) : (
          <div className={detail.thumb} aria-hidden="true">
            {initial}
          </div>
        )}
        <div>
          <h1 className={detail.title}>{product.fullDisplayName}</h1>
          <p className={detail.subtitle}>
            {[product.brand?.name, product.productCategory?.name]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {product.price != null && (
            <p className={detail.price}>${product.price.toFixed(2)}</p>
          )}
        </div>
      </div>

      {product.productDescription && (
        <p className={detail.description}>{product.productDescription}</p>
      )}

      <dl className={detail.specs}>
        <div className={detail.spec}>
          <dt>Product ID</dt>
          <dd>{product.id}</dd>
        </div>
        <div className={detail.spec}>
          <dt>Min order qty</dt>
          <dd>{product.minimumOrderQuantity ?? "—"}</dd>
        </div>
        <div className={detail.spec}>
          <dt>Max order qty</dt>
          <dd>{product.maximumOrderQuantity ?? "—"}</dd>
        </div>
      </dl>

      {product.productPageURL && (
        <a
          className={detail.link}
          href={product.productPageURL}
          target="_blank"
          rel="noreferrer"
        >
          View on heb.com ↗
        </a>
      )}
    </div>
  );
}
