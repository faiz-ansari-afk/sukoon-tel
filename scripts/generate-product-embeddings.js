var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import fs from 'fs';
import path from 'path';
function generateEmbeddings() {
    return __awaiter(this, void 0, void 0, function () {
        var MODEL_NAME, productsPath, categoriesPath, outputPath, products, categories, categoryMap, pipeline, extractor, records, _i, products_1, product, category, categoryNameEn, categoryNameHi, sizesStr, ingredientsEn, ingredientsHi, indicationsEn, indicationsHi, keywordsEn, keywordsHi, documentText, output, rawVector, vector, dimension, resultDatabase;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    console.log('=== Starting Build-Time Product Embedding Generation ===');
                    MODEL_NAME = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
                    productsPath = path.resolve(process.cwd(), 'src/data/products.json');
                    categoriesPath = path.resolve(process.cwd(), 'src/data/categories.json');
                    outputPath = path.resolve(process.cwd(), 'src/generated/product-embeddings.json');
                    if (!fs.existsSync(productsPath)) {
                        throw new Error("Products file not found: ".concat(productsPath));
                    }
                    products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
                    categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
                    categoryMap = new Map(categories.map(function (c) { return [c.id, c]; }));
                    console.log("Loading multilingual transformer model: ".concat(MODEL_NAME, "..."));
                    return [4 /*yield*/, import('@xenova/transformers')];
                case 1:
                    pipeline = (_q.sent()).pipeline;
                    return [4 /*yield*/, pipeline('feature-extraction', MODEL_NAME)];
                case 2:
                    extractor = _q.sent();
                    console.log('Model loaded successfully.');
                    records = [];
                    _i = 0, products_1 = products;
                    _q.label = 3;
                case 3:
                    if (!(_i < products_1.length)) return [3 /*break*/, 6];
                    product = products_1[_i];
                    category = categoryMap.get(product.categoryId);
                    categoryNameEn = category ? category.name.en : '';
                    categoryNameHi = category ? category.name.hi : '';
                    sizesStr = product.variants.map(function (v) { return "".concat(v.packSize, " MRP Rs ").concat(v.mrp); }).join(', ');
                    ingredientsEn = ((_b = (_a = product.ingredients) === null || _a === void 0 ? void 0 : _a.en) === null || _b === void 0 ? void 0 : _b.join(', ')) || '';
                    ingredientsHi = ((_d = (_c = product.ingredients) === null || _c === void 0 ? void 0 : _c.hi) === null || _d === void 0 ? void 0 : _d.join(', ')) || '';
                    indicationsEn = ((_f = (_e = product.indications) === null || _e === void 0 ? void 0 : _e.en) === null || _f === void 0 ? void 0 : _f.join(', ')) || '';
                    indicationsHi = ((_h = (_g = product.indications) === null || _g === void 0 ? void 0 : _g.hi) === null || _h === void 0 ? void 0 : _h.join(', ')) || '';
                    keywordsEn = ((_k = (_j = product.searchKeywords) === null || _j === void 0 ? void 0 : _j.en) === null || _k === void 0 ? void 0 : _k.join(' ')) || '';
                    keywordsHi = ((_m = (_l = product.searchKeywords) === null || _l === void 0 ? void 0 : _l.hi) === null || _m === void 0 ? void 0 : _m.join(' ')) || '';
                    documentText = [
                        "Product: ".concat(product.name.en, " | ").concat(product.name.hi),
                        "Category: ".concat(categoryNameEn, " | ").concat(categoryNameHi),
                        "Subtitle: ".concat(product.subtitle.en, " | ").concat(product.subtitle.hi),
                        product.tagline ? "Tagline: ".concat(product.tagline.en, " | ").concat(product.tagline.hi) : '',
                        "Description: ".concat(product.description.en, " | ").concat(product.description.hi),
                        "Available Sizes and Prices: ".concat(sizesStr),
                        "Key Ingredients: ".concat(ingredientsEn, " | ").concat(ingredientsHi),
                        "Indications & Uses: ".concat(indicationsEn, " | ").concat(indicationsHi),
                        "Search Terms: ".concat(keywordsEn, " | ").concat(keywordsHi),
                    ]
                        .filter(Boolean)
                        .join('\n');
                    console.log("Generating embedding for [".concat(product.id, "]: ").concat(product.name.en, " / ").concat(product.name.hi, "..."));
                    return [4 /*yield*/, extractor(documentText, {
                            pooling: 'mean',
                            normalize: true,
                        })];
                case 4:
                    output = _q.sent();
                    rawVector = Array.from(output.data);
                    vector = rawVector.map(function (val) { return Number(val.toFixed(6)); });
                    records.push({
                        productId: product.id,
                        slug: product.slug,
                        nameEn: product.name.en,
                        nameHi: product.name.hi,
                        documentText: documentText,
                        vector: vector,
                    });
                    _q.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    dimension = ((_p = (_o = records[0]) === null || _o === void 0 ? void 0 : _o.vector) === null || _p === void 0 ? void 0 : _p.length) || 384;
                    resultDatabase = {
                        metadata: {
                            model: MODEL_NAME,
                            dimension: dimension,
                            generatedAt: new Date().toISOString(),
                            productCount: records.length,
                            version: '1.0.0',
                        },
                        records: records,
                    };
                    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
                    fs.writeFileSync(outputPath, JSON.stringify(resultDatabase, null, 2), 'utf-8');
                    console.log("\u2713 Product embeddings generated successfully for ".concat(records.length, " products."));
                    console.log("\u2713 Saved to: ".concat(outputPath, " (Dimension: ").concat(dimension, ")"));
                    return [2 /*return*/];
            }
        });
    });
}
generateEmbeddings().catch(function (err) {
    console.error('Error generating product embeddings:', err);
    process.exit(1);
});
