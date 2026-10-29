import fs from 'fs';
import path from 'path';
function runValidation() {
    var _a, _b, _c, _d, _e;
    console.log('--- Starting Product and Category Data Validation ---');
    var productsPath = path.resolve(process.cwd(), 'src/data/products.json');
    var categoriesPath = path.resolve(process.cwd(), 'src/data/categories.json');
    if (!fs.existsSync(productsPath)) {
        throw new Error("Products file missing at ".concat(productsPath));
    }
    if (!fs.existsSync(categoriesPath)) {
        throw new Error("Categories file missing at ".concat(categoriesPath));
    }
    var productsRaw = fs.readFileSync(productsPath, 'utf-8');
    var categoriesRaw = fs.readFileSync(categoriesPath, 'utf-8');
    var products = JSON.parse(productsRaw);
    var categories = JSON.parse(categoriesRaw);
    console.log("Found ".concat(products.length, " products and ").concat(categories.length, " categories."));
    // Exactly 4 categories check
    if (categories.length !== 4) {
        throw new Error("Expected exactly 4 categories, found ".concat(categories.length));
    }
    var categoryIds = new Set();
    var categorySlugs = new Set();
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var cat = categories_1[_i];
        if (!cat.id || !cat.slug || !((_a = cat.name) === null || _a === void 0 ? void 0 : _a.en) || !((_b = cat.name) === null || _b === void 0 ? void 0 : _b.hi)) {
            throw new Error("Invalid category entry: ".concat(JSON.stringify(cat)));
        }
        if (categoryIds.has(cat.id)) {
            throw new Error("Duplicate category id: ".concat(cat.id));
        }
        if (categorySlugs.has(cat.slug)) {
            throw new Error("Duplicate category slug: ".concat(cat.slug));
        }
        categoryIds.add(cat.id);
        categorySlugs.add(cat.slug);
        // Verify category image in public/
        var catImgPath = path.resolve(process.cwd(), 'public', cat.image.replace(/^\//, ''));
        if (!fs.existsSync(catImgPath)) {
            console.warn("[Warning] Category image not found on disk: ".concat(catImgPath));
        }
    }
    var productIds = new Set();
    var productSlugs = new Set();
    for (var _f = 0, products_1 = products; _f < products_1.length; _f++) {
        var prod = products_1[_f];
        if (!prod.id || !prod.slug) {
            throw new Error("Product missing id or slug: ".concat(JSON.stringify(prod)));
        }
        if (productIds.has(prod.id)) {
            throw new Error("Duplicate product id: ".concat(prod.id));
        }
        if (productSlugs.has(prod.slug)) {
            throw new Error("Duplicate product slug: ".concat(prod.slug));
        }
        productIds.add(prod.id);
        productSlugs.add(prod.slug);
        if (!categoryIds.has(prod.categoryId)) {
            throw new Error("Product ".concat(prod.id, " references non-existent categoryId: ").concat(prod.categoryId));
        }
        if (!((_c = prod.name) === null || _c === void 0 ? void 0 : _c.en) || !((_d = prod.name) === null || _d === void 0 ? void 0 : _d.hi)) {
            throw new Error("Product ".concat(prod.id, " missing English or Hindi name"));
        }
        if (!prod.variants || prod.variants.length === 0) {
            throw new Error("Product ".concat(prod.id, " has no variants"));
        }
        for (var _g = 0, _h = prod.variants; _g < _h.length; _g++) {
            var v = _h[_g];
            if (!v.id || !v.packSize || typeof v.mrp !== 'number' || v.mrp <= 0) {
                throw new Error("Product ".concat(prod.id, " has invalid variant: ").concat(JSON.stringify(v)));
            }
        }
        if (!((_e = prod.images) === null || _e === void 0 ? void 0 : _e.primary)) {
            throw new Error("Product ".concat(prod.id, " missing primary image"));
        }
        var primaryImgPath = path.resolve(process.cwd(), 'public', prod.images.primary.replace(/^\//, ''));
        if (!fs.existsSync(primaryImgPath)) {
            console.warn("[Warning] Product primary image not found on disk: ".concat(primaryImgPath));
        }
    }
    console.log('✓ Validation successful: All products, categories, variants, and references are valid!');
}
try {
    runValidation();
}
catch (err) {
    console.error('Validation failed:', err);
    process.exit(1);
}
