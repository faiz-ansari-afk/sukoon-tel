import fs from 'fs';
import path from 'path';

interface Product {
  id: string;
  slug: string;
  categoryId: string;
  name: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  tagline?: { en: string; hi: string };
  description: { en: string; hi: string };
  detailedDescription?: { en: string; hi: string };
  variants: Array<{ packSize: string; mrp: number }>;
  ingredients?: { en: string[]; hi: string[] };
  indications?: { en: string[]; hi: string[] };
  searchKeywords?: { en: string[]; hi: string[] };
}

interface Category {
  id: string;
  name: { en: string; hi: string };
}

async function generateEmbeddings() {
  console.log('=== Starting Build-Time Product Embedding Generation ===');
  const MODEL_NAME = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';

  const productsPath = path.resolve(process.cwd(), 'src/data/products.json');
  const categoriesPath = path.resolve(process.cwd(), 'src/data/categories.json');
  const outputPath = path.resolve(process.cwd(), 'src/generated/product-embeddings.json');

  if (!fs.existsSync(productsPath)) {
    throw new Error(`Products file not found: ${productsPath}`);
  }

  const products: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  const categories: Category[] = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  console.log(`Loading multilingual transformer model: ${MODEL_NAME}...`);
  const { pipeline } = await import('@xenova/transformers');
  const extractor = await pipeline('feature-extraction', MODEL_NAME);
  console.log('Model loaded successfully.');

  const records = [];

  for (const product of products) {
    const category = categoryMap.get(product.categoryId);
    const categoryNameEn = category ? category.name.en : '';
    const categoryNameHi = category ? category.name.hi : '';

    const sizesStr = product.variants.map((v) => `${v.packSize} MRP Rs ${v.mrp}`).join(', ');
    const ingredientsEn = product.ingredients?.en?.join(', ') || '';
    const ingredientsHi = product.ingredients?.hi?.join(', ') || '';
    const indicationsEn = product.indications?.en?.join(', ') || '';
    const indicationsHi = product.indications?.hi?.join(', ') || '';
    const keywordsEn = product.searchKeywords?.en?.join(' ') || '';
    const keywordsHi = product.searchKeywords?.hi?.join(' ') || '';

    // Build comprehensive document text
    const documentText = [
      `Product: ${product.name.en} | ${product.name.hi}`,
      `Category: ${categoryNameEn} | ${categoryNameHi}`,
      `Subtitle: ${product.subtitle.en} | ${product.subtitle.hi}`,
      product.tagline ? `Tagline: ${product.tagline.en} | ${product.tagline.hi}` : '',
      `Description: ${product.description.en} | ${product.description.hi}`,
      `Available Sizes and Prices: ${sizesStr}`,
      `Key Ingredients: ${ingredientsEn} | ${ingredientsHi}`,
      `Indications & Uses: ${indicationsEn} | ${indicationsHi}`,
      `Search Terms: ${keywordsEn} | ${keywordsHi}`,
    ]
      .filter(Boolean)
      .join('\n');

    console.log(`Generating embedding for [${product.id}]: ${product.name.en} / ${product.name.hi}...`);

    const output = await extractor(documentText, {
      pooling: 'mean',
      normalize: true,
    });

    // Convert Float32Array to standard JS Array with rounded precision (6 decimal places for compact JSON)
    const rawVector = Array.from(output.data as Float32Array);
    const vector = rawVector.map((val) => Number(val.toFixed(6)));

    records.push({
      productId: product.id,
      slug: product.slug,
      nameEn: product.name.en,
      nameHi: product.name.hi,
      documentText,
      vector,
    });
  }

  const dimension = records[0]?.vector?.length || 384;

  const resultDatabase = {
    metadata: {
      model: MODEL_NAME,
      dimension,
      generatedAt: new Date().toISOString(),
      productCount: records.length,
      version: '1.0.0',
    },
    records,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(resultDatabase, null, 2), 'utf-8');

  console.log(`✓ Product embeddings generated successfully for ${records.length} products.`);
  console.log(`✓ Saved to: ${outputPath} (Dimension: ${dimension})`);
}

generateEmbeddings().catch((err) => {
  console.error('Error generating product embeddings:', err);
  process.exit(1);
});

