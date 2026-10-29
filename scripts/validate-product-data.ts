import fs from 'fs';
import path from 'path';

interface LocalizedString {
  en: string;
  hi: string;
}

interface Variant {
  id: string;
  packSize: string;
  mrp: number;
}

interface Product {
  id: string;
  slug: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  images: {
    primary: string;
  };
  variants: Variant[];
}

interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  image: string;
}

function runValidation() {
  console.log('--- Starting Product and Category Data Validation ---');

  const productsPath = path.resolve(process.cwd(), 'src/data/products.json');
  const categoriesPath = path.resolve(process.cwd(), 'src/data/categories.json');

  if (!fs.existsSync(productsPath)) {
    throw new Error(`Products file missing at ${productsPath}`);
  }
  if (!fs.existsSync(categoriesPath)) {
    throw new Error(`Categories file missing at ${categoriesPath}`);
  }

  const productsRaw = fs.readFileSync(productsPath, 'utf-8');
  const categoriesRaw = fs.readFileSync(categoriesPath, 'utf-8');

  const products: Product[] = JSON.parse(productsRaw);
  const categories: Category[] = JSON.parse(categoriesRaw);

  console.log(`Found ${products.length} products and ${categories.length} categories.`);

  // Exactly 4 categories check
  if (categories.length !== 4) {
    throw new Error(`Expected exactly 4 categories, found ${categories.length}`);
  }

  const categoryIds = new Set<string>();
  const categorySlugs = new Set<string>();

  for (const cat of categories) {
    if (!cat.id || !cat.slug || !cat.name?.en || !cat.name?.hi) {
      throw new Error(`Invalid category entry: ${JSON.stringify(cat)}`);
    }
    if (categoryIds.has(cat.id)) {
      throw new Error(`Duplicate category id: ${cat.id}`);
    }
    if (categorySlugs.has(cat.slug)) {
      throw new Error(`Duplicate category slug: ${cat.slug}`);
    }
    categoryIds.add(cat.id);
    categorySlugs.add(cat.slug);

    // Verify category image in public/
    const catImgPath = path.resolve(process.cwd(), 'public', cat.image.replace(/^\//, ''));
    if (!fs.existsSync(catImgPath)) {
      console.warn(`[Warning] Category image not found on disk: ${catImgPath}`);
    }
  }

  const productIds = new Set<string>();
  const productSlugs = new Set<string>();

  for (const prod of products) {
    if (!prod.id || !prod.slug) {
      throw new Error(`Product missing id or slug: ${JSON.stringify(prod)}`);
    }
    if (productIds.has(prod.id)) {
      throw new Error(`Duplicate product id: ${prod.id}`);
    }
    if (productSlugs.has(prod.slug)) {
      throw new Error(`Duplicate product slug: ${prod.slug}`);
    }
    productIds.add(prod.id);
    productSlugs.add(prod.slug);

    if (!categoryIds.has(prod.categoryId)) {
      throw new Error(`Product ${prod.id} references non-existent categoryId: ${prod.categoryId}`);
    }

    if (!prod.name?.en || !prod.name?.hi) {
      throw new Error(`Product ${prod.id} missing English or Hindi name`);
    }

    if (!prod.variants || prod.variants.length === 0) {
      throw new Error(`Product ${prod.id} has no variants`);
    }

    for (const v of prod.variants) {
      if (!v.id || !v.packSize || typeof v.mrp !== 'number' || v.mrp <= 0) {
        throw new Error(`Product ${prod.id} has invalid variant: ${JSON.stringify(v)}`);
      }
    }

    if (!prod.images?.primary) {
      throw new Error(`Product ${prod.id} missing primary image`);
    }

    const primaryImgPath = path.resolve(process.cwd(), 'public', prod.images.primary.replace(/^\//, ''));
    if (!fs.existsSync(primaryImgPath)) {
      console.warn(`[Warning] Product primary image not found on disk: ${primaryImgPath}`);
    }
  }

  console.log('✓ Validation successful: All products, categories, variants, and references are valid!');
}

try {
  runValidation();
} catch (err) {
  console.error('Validation failed:', err);
  process.exit(1);
}

