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
import precomputedEmbeddings from '../../generated/product-embeddings.json';
import productsData from '../../data/products.json';
import { cosineSimilarity } from './similarity';
import { scoreProductKeywords, normalizeText } from './keyword-search';
import { embeddingModelManager } from './embedding-model';
var products = productsData;
var embeddingsDb = precomputedEmbeddings;
export function searchProducts(query_1) {
    return __awaiter(this, arguments, void 0, function (query, options) {
        var _a, useSemantic, _b, minScoreThreshold, cleanQuery, keywordMap, _i, products_1, product, res, usedVectorSearch, vectorScores, queryVector, _c, _d, record, sim, err_1, combinedResults, _e, products_2, product, kw, rawSim, finalScore, matchType, normalizedSim;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = options.useSemantic, useSemantic = _a === void 0 ? true : _a, _b = options.minScoreThreshold, minScoreThreshold = _b === void 0 ? 0.15 : _b;
                    cleanQuery = normalizeText(query);
                    if (!cleanQuery) {
                        return [2 /*return*/, {
                                results: [],
                                modelStatus: embeddingModelManager.getStatus(),
                                usedVectorSearch: false,
                            }];
                    }
                    keywordMap = new Map();
                    for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                        product = products_1[_i];
                        res = scoreProductKeywords(product, cleanQuery);
                        keywordMap.set(product.id, { score: res.score, terms: res.matchedTerms });
                    }
                    usedVectorSearch = false;
                    vectorScores = new Map();
                    if (!useSemantic) return [3 /*break*/, 4];
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, embeddingModelManager.embedQuery(cleanQuery)];
                case 2:
                    queryVector = _f.sent();
                    usedVectorSearch = true;
                    for (_c = 0, _d = embeddingsDb.records; _c < _d.length; _c++) {
                        record = _d[_c];
                        sim = cosineSimilarity(queryVector, record.vector);
                        vectorScores.set(record.productId, sim);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _f.sent();
                    console.warn('Vector embedding unavailable, falling back to keyword search:', err_1);
                    return [3 /*break*/, 4];
                case 4:
                    combinedResults = [];
                    for (_e = 0, products_2 = products; _e < products_2.length; _e++) {
                        product = products_2[_e];
                        kw = keywordMap.get(product.id) || { score: 0, terms: [] };
                        rawSim = vectorScores.get(product.id);
                        finalScore = 0;
                        matchType = 'keyword';
                        if (usedVectorSearch && typeof rawSim === 'number') {
                            normalizedSim = Math.max(0, Math.min(1, (rawSim - 0.2) / 0.55));
                            if (kw.score > 0.3) {
                                matchType = 'hybrid';
                                finalScore = kw.score * 0.65 + normalizedSim * 0.35;
                            }
                            else if (kw.score > 0) {
                                matchType = 'hybrid';
                                finalScore = kw.score * 0.4 + normalizedSim * 0.6;
                            }
                            else {
                                matchType = 'vector';
                                finalScore = normalizedSim;
                            }
                        }
                        else {
                            matchType = 'keyword';
                            finalScore = kw.score;
                        }
                        if (finalScore >= minScoreThreshold) {
                            combinedResults.push({
                                product: product,
                                score: finalScore,
                                matchedBy: matchType,
                                matchedTerms: kw.terms,
                            });
                        }
                    }
                    // 4. Sort descending by score
                    combinedResults.sort(function (a, b) { return b.score - a.score; });
                    return [2 /*return*/, {
                            results: combinedResults,
                            modelStatus: embeddingModelManager.getStatus(),
                            usedVectorSearch: usedVectorSearch,
                        }];
            }
        });
    });
}
