// In-memory sample data so the endpoint returns something interesting out of the box.
export const departments = [
  { id: "1", name: "Produce", aisle: 1 },
  { id: "2", name: "Bakery", aisle: 4 },
  { id: "3", name: "Dairy", aisle: 7 },
];

// Taco-night products. URLs are real heb.com product pages (provided/verified by the
// user); names + SKU ids come straight from those URLs. Categories, order quantities,
// and descriptions are illustrative example values — heb.com blocks automated scraping,
// so they were not pulled from the live site. Image URLs and real live prices are populated.
export const products = [
  {
    id: "411475",
    fullDisplayName: "H-E-B Bakery Butter Flour Tortillas",
    productDescription:
      "Soft, fresh-baked butter flour tortillas from the H-E-B Bakery.",
    price: 2.47,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-bakery-butter-flour-tortillas/411475",
    productCategory: { id: "tortillas", name: "Tortillas" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 24,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000411475-1",
      "https://images.heb.com/is/image/HEBGrocery/000411475-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000411475-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/000411475-2?wid=150&hei=150",
    ],
  },
  {
    id: "1890911",
    fullDisplayName: "H-E-B Bakery Corn Flour Tortillas Mitad y Mitad",
    productDescription:
      "Half-corn, half-flour tortillas baked fresh in the H-E-B Bakery.",
    price: 2.98,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-bakery-corn-flour-tortillas-mitad-y-mitad-/1890911",
    productCategory: { id: "tortillas", name: "Tortillas" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 24,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001890911-1",
      "https://images.heb.com/is/image/HEBGrocery/001890911-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001890911-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/001890911-2?wid=150&hei=150",
    ],
  },
  {
    id: "465325",
    fullDisplayName: "H-E-B Bakery Flour Tortillas",
    productDescription: "Classic soft flour tortillas from the H-E-B Bakery.",
    price: 3.96,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-bakery-flour-tortillas/465325",
    productCategory: { id: "tortillas", name: "Tortillas" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 24,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000465325-1",
      "https://images.heb.com/is/image/HEBGrocery/000465325-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000465325-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/000465325-2?wid=150&hei=150",
    ],
  },
  {
    id: "324983",
    fullDisplayName: "H-E-B Original Fajita Flour Tortillas",
    productDescription: "Fajita-size original flour tortillas.",
    price: 2.12,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-original-fajita-flour-tortillas/324983",
    productCategory: { id: "tortillas", name: "Tortillas" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 24,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000324983-1",
      "https://images.heb.com/is/image/HEBGrocery/000324983-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000324983-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/000324983-2?wid=150&hei=150",
    ],
  },
  {
    id: "126598",
    fullDisplayName: "H-E-B Queso Oaxaca Mexican Style Mozzarella Cheese",
    productDescription:
      "Mexican-style mozzarella (Oaxaca) cheese that pulls and melts for tacos.",
    price: 3.79,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-queso-oaxaca-mexican-style-mozzarella-cheese/126598",
    productCategory: { id: "cheese", name: "Cheese" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 12,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000126598-1",
      "https://images.heb.com/is/image/HEBGrocery/000126598-2",
      "https://images.heb.com/is/image/HEBGrocery/000126598-3",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000126598-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/000126598-2?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/000126598-3?wid=150&hei=150",
    ],
  },
  {
    id: "2159976",
    fullDisplayName: "H-E-B Pico de Gallo Mild",
    productDescription:
      "Fresh mild pico de gallo with tomato, onion, and cilantro.",
    price: 5.23,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-pico-de-gallo-mild/2159976",
    productCategory: { id: "salsa-dips", name: "Salsa & Dips" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 12,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/002159976-1",
      "https://images.heb.com/is/image/HEBGrocery/002159976-2",
      "https://images.heb.com/is/image/HEBGrocery/002159976-3",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/002159976-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/002159976-2?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/002159976-3?wid=150&hei=150",
    ],
  },
  {
    id: "318627",
    fullDisplayName: "Fresh Large Hass Avocado",
    productDescription: "Fresh large Hass avocado, sold individually.",
    price: 1.47,
    productPageURL:
      "https://www.heb.com/product-detail/fresh-large-hass-avocado/318627",
    productCategory: { id: "produce", name: "Produce" },
    brand: null,
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 24,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000318627-1",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000318627-1?wid=150&hei=150",
    ],
  },
  {
    id: "1195293",
    fullDisplayName:
      "H-E-B Mi Tienda Mexican Style Pork for Tacos Carne al Pastor",
    productDescription:
      "Marinated carne al pastor — seasoned pork ready to cook for tacos.",
    price: 8.65,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-mi-tienda-mexican-style-pork-for-tacos-carne-al-pastor/1195293",
    productCategory: { id: "meat", name: "Meat" },
    brand: { name: "H-E-B Mi Tienda", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 12,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001195293-1",
      "https://images.heb.com/is/image/HEBGrocery/001195293-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001195293-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/001195293-2?wid=150&hei=150",
    ],
  },
  {
    id: "2114508",
    fullDisplayName:
      "H-E-B Mi Tienda Seasoned Diced Beef for Tacos Bistec Norteño",
    productDescription:
      "Seasoned diced beef (bistec norteño) ready to cook for tacos.",
    price: 12.37,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-mi-tienda-seasoned-diced-beef-for-tacos-bistec-norte-o/2114508",
    productCategory: { id: "meat", name: "Meat" },
    brand: { name: "H-E-B Mi Tienda", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 12,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/002114508-1",
      "https://images.heb.com/is/image/HEBGrocery/002114508-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/002114508-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/002114508-2?wid=150&hei=150",
    ],
  },
  {
    id: "2114506",
    fullDisplayName:
      "H-E-B Mi Tienda Seasoned Diced Chicken Thighs for Tacos Pollo Casero",
    productDescription:
      "Seasoned diced chicken thighs (pollo casero) ready to cook for tacos.",
    price: 6.61,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-mi-tienda-seasoned-diced-chicken-thighs-for-tacos-pollo-casero/2114506",
    productCategory: { id: "meat", name: "Meat" },
    brand: { name: "H-E-B Mi Tienda", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 12,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/002114506-1",
      "https://images.heb.com/is/image/HEBGrocery/002114506-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/002114506-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/002114506-2?wid=150&hei=150",
    ],
  },
  {
    id: "1875976",
    fullDisplayName: "H-E-B Texas Style Refried Charro Beans",
    productDescription: "Texas-style refried charro beans.",
    price: 1.48,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-texas-style-refried-charro-beans/1875976",
    productCategory: { id: "beans", name: "Beans" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 24,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001875976-1",
      "https://images.heb.com/is/image/HEBGrocery/001875976-2",
      "https://images.heb.com/is/image/HEBGrocery/001875976-3",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001875976-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/001875976-2?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/001875976-3?wid=150&hei=150",
    ],
  },
  {
    id: "1502231",
    fullDisplayName: "Rustico Di Casa Asaro Unfiltered Extra Virgin Olive Oil",
    productDescription: "Unfiltered extra virgin olive oil.",
    price: 19.98,
    productPageURL:
      "https://www.heb.com/product-detail/rustico-di-casa-asaro-unfiltered-extra-virgin-olive-oil/1502231",
    productCategory: { id: "oils", name: "Oils & Vinegars" },
    brand: { name: "Rustico Di Casa Asaro", isOwnBrand: false },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 6,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001502231-1",
      "https://images.heb.com/is/image/HEBGrocery/001502231-2",
      "https://images.heb.com/is/image/HEBGrocery/001502231-3",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001502231-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/001502231-2?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/001502231-3?wid=150&hei=150",
    ],
  },
  {
    id: "1539077",
    fullDisplayName: "H-E-B Shredded Fresh Iceberg Lettuce",
    productDescription:
      "Fresh crisp shredded iceberg lettuce, washed and ready to enjoy for your taco night.",
    price: 3.64,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-shredded-fresh-iceberg-lettuce-16-oz/1539077",
    productCategory: { id: "produce", name: "Produce" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 12,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001539077-1",
      "https://images.heb.com/is/image/HEBGrocery/001539077-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/001539077-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/001539077-2?wid=150&hei=150",
    ],
  },
  {
    id: "5183523",
    fullDisplayName: "H-E-B Fresh Diced Tomatoes",
    productDescription:
      "Freshly diced red tomatoes, perfect for topping tacos or mixing into a quick salsa.",
    price: 3.98,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-fresh-diced-tomatoes-8-oz/5183523",
    productCategory: { id: "produce", name: "Produce" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 12,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/005183523-1",
      "https://images.heb.com/is/image/HEBGrocery/005183523-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/005183523-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/005183523-2?wid=150&hei=150",
    ],
  },
  {
    id: "593995",
    fullDisplayName: "H-E-B Fresh Diced White Onions",
    productDescription:
      "Pre-diced crisp white onions, eliminating prep work and tears for taco night.",
    price: 2.98,
    productPageURL:
      "https://www.heb.com/product-detail/h-e-b-fresh-diced-white-onions-7-oz/593995",
    productCategory: { id: "produce", name: "Produce" },
    brand: { name: "H-E-B", isOwnBrand: true },
    minimumOrderQuantity: 1,
    maximumOrderQuantity: 12,
    productImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000593995-1",
      "https://images.heb.com/is/image/HEBGrocery/000593995-2",
    ],
    thumbnailImageUrls: [
      "https://images.heb.com/is/image/HEBGrocery/000593995-1?wid=150&hei=150",
      "https://images.heb.com/is/image/HEBGrocery/000593995-2?wid=150&hei=150",
    ],
  },
];
