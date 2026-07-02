import { createSchema } from "graphql-yoga";
import { departments, products } from "./mockData";

// The mock data stores image URLs as plain strings. The GraphQL `Image` type
// exposes a `url` and a `size`, so map each raw URL into that shape here.
const toImages = (urls: string[] | null | undefined, size: string) =>
  (urls ?? []).map((url) => ({ url, size }));

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Department {
      id: ID!
      name: String!
      aisle: Int!
    }

    "A single product/sku"
    type Product {
      id: String!
      productCategory: ProductCategory
      productPageURL: String
      maximumOrderQuantity: Float
      minimumOrderQuantity: Float
      productImageUrls: [Image]
      thumbnailImageUrls: [Image]
      brand: Brand
      fullDisplayName: String!
      productDescription: String
      price: Float
    }

    "A grouping of related Products"
    type ProductCategory {
      id: String
      name: String
    }

    "Brand name and own brand status"
    type Brand {
      name: String!
      isOwnBrand: Boolean!
    }

    "Image url with size information"
    type Image {
      url: String!
      size: ImageSize!
    }

    "Size of image"
    enum ImageSize {
      SMALL
      MEDIUM
      LARGE
    }

    type Query {
      hello: String!
      departments: [Department!]!
      department(id: ID!): Department
      products(search: String): [Product!]!
      product(id: String!): Product
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Hello from GraphQL Yoga!",
      departments: () => departments,
      department: (_parent: unknown, args: { id: string }) =>
        departments.find((d) => d.id === args.id) ?? null,
      products: ( _parent: unknown, args: {search: string}) => products.filter(
        (product) => {
          args.search ? product.fullDisplayName.includes(args.search) : true;
        }
      ),
      
      product: (_parent: unknown, args: { id: string }) =>
        products.find((p) => p.id === args.id) ?? null,
    },
    Product: {
      productImageUrls: (product: { productImageUrls?: string[] | null }) =>
        toImages(product.productImageUrls, "LARGE"),
      thumbnailImageUrls: (product: { thumbnailImageUrls?: string[] | null }) =>
        toImages(product.thumbnailImageUrls, "SMALL"),
    },
  },
});
