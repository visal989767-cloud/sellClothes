
/* Thread&Co — Product Catalog */

const PRODUCTS = [
  {
    id: 1,
    name: "Classic White Tee",
    category: "Tops",
    price: 24,
    color: "#e8e6df",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    desc: "Soft 100% cotton crew-neck tee with a relaxed everyday fit."
  },
  {
    id: 2,
    name: "Oversized Black Tee",
    category: "Tops",
    price: 29,
    color: "#1f2328",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=85",
    desc: "Heavyweight cotton with a boxy, oversized streetwear cut."
  },
  {
    id: 3,
    name: "Linen Button Shirt",
    category: "Tops",
    price: 54,
    color: "#9db4c0",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=85",
    desc: "Breathable linen shirt, ideal for warm days and smart-casual looks."
  },
  {
    id: 4,
    name: "Striped Long Sleeve",
    category: "Tops",
    price: 39,
    color: "#3b5b92",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85",
    desc: "Midweight jersey long sleeve with a classic Breton stripe."
  },
  {
    id: 5,
    name: "Slim Fit Chinos",
    category: "Bottoms",
    price: 59,
    color: "#c2a878",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=85",
    desc: "Stretch cotton twill chinos with a clean, tapered leg."
  },
  {
    id: 6,
    name: "Dark Wash Jeans",
    category: "Bottoms",
    price: 79,
    color: "#243a5e",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
    desc: "Straight-fit denim with a deep indigo wash and a little stretch."
  },
  {
    id: 7,
    name: "Jogger Sweatpants",
    category: "Bottoms",
    price: 45,
    color: "#6b6f76",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=85",
    desc: "Brushed fleece joggers with an elastic cuff and drawstring waist."
  },
  {
    id: 8,
    name: "Denim Jacket",
    category: "Outerwear",
    price: 99,
    color: "#4f7396",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=85",
    desc: "A timeless trucker jacket in washed, rigid denim."
  },
  {
    id: 9,
    name: "Bomber Jacket",
    category: "Outerwear",
    price: 119,
    color: "#3d4a3a",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=85",
    desc: "Lightweight olive bomber with ribbed trims and a front zip."
  },
  {
    id: 10,
    name: "Wool Overcoat",
    category: "Outerwear",
    price: 189,
    color: "#7a5c48",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=85",
    desc: "Tailored wool-blend overcoat for cold-weather layering."
  },
  {
    id: 11,
    name: "Everyday Hoodie",
    category: "Tops",
    price: 64,
    color: "#b8aaa0",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
    desc: "A soft fleece hoodie with a roomy fit for easy layering."
  },
  {
    id: 12,
    name: "Relaxed Blue Jeans",
    category: "Bottoms",
    price: 84,
    color: "#55728d",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85",
    desc: "Relaxed-leg denim in a versatile mid-blue wash."
  },
  {
    id: 13,
    name: "Straight Leg Jeans",
    category: "Bottoms",
    price: 82,
    color: "#344b67",
    image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=800&q=85",
    desc: "Classic straight-leg jeans made for everyday wear."
  },
  {
    id: 14,
    name: "Soft Knit Cardigan",
    category: "Tops",
    price: 72,
    color: "#b39b83",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=85",
    desc: "A cozy knit cardigan that layers easily over your favorite tee."
  },
  {
    id: 15,
    name: "Cotton Summer Dress",
    category: "Dresses",
    price: 68,
    color: "#d9b6a4",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85",
    desc: "An easy, breezy cotton dress for sunny days and weekend plans."
  },
  {
    id: 16,
    name: "Canvas Utility Jacket",
    category: "Outerwear",
    price: 108,
    color: "#69745b",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=85",
    desc: "A practical layer with a relaxed fit and everyday utility pockets."
  }
];

/* Additional product photos for the product detail page */

const dressPhotos = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85"
];

/* Create up to three gallery images per product */

PRODUCTS.forEach(product => {
  const categoryPhotos = product.category === "Dresses"
    ? dressPhotos
    : PRODUCTS
        .filter(item =>
          item.category === product.category &&
          item.id !== product.id
        )
        .map(item => item.image);

  product.images = [
    ...new Set([product.image, ...categoryPhotos])
  ].slice(0, 3);
});

/* Available clothing sizes */

const SIZES = ["S", "M", "L", "XL"];

export { PRODUCTS, SIZES };
