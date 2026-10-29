var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Normalizes query string: trims, lowercases, removes punctuation while preserving numbers and Devanagari.
 */
export function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[₹,./\\?!@#$%^&*()_+=[\]{};:'"<>~`|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
var COMMON_STOPWORDS = new Set(['oil', 'tel', 'के', 'का', 'की', 'में', 'and', 'for', 'the', 'से', 'को', 'है']);
export function scoreProductKeywords(product, query) {
    var _a, _b, _c, _d;
    var normalizedQuery = normalizeText(query);
    if (!normalizedQuery) {
        return { productId: product.id, score: 0, matchedTerms: [] };
    }
    var queryTokens = normalizedQuery
        .split(' ')
        .map(function (t) { return t.trim(); })
        .filter(function (t) { return t.length > 0; });
    var rawScore = 0;
    var matchedTerms = [];
    var nameEn = normalizeText(product.name.en);
    var nameHi = normalizeText(product.name.hi);
    var subtitleEn = normalizeText(product.subtitle.en);
    var subtitleHi = normalizeText(product.subtitle.hi);
    var descEn = normalizeText(product.description.en);
    var descHi = normalizeText(product.description.hi);
    var keywordsEn = (((_a = product.searchKeywords) === null || _a === void 0 ? void 0 : _a.en) || []).map(normalizeText);
    var keywordsHi = (((_b = product.searchKeywords) === null || _b === void 0 ? void 0 : _b.hi) || []).map(normalizeText);
    // 1. Exact full name match
    if (nameEn === normalizedQuery || nameHi === normalizedQuery) {
        rawScore += 1.5;
        matchedTerms.push('exact_full_name');
    }
    else if (nameEn.includes(normalizedQuery) || nameHi.includes(normalizedQuery)) {
        rawScore += 0.8;
        matchedTerms.push('name_phrase');
    }
    // 2. Token-by-token evaluation
    var nonStopwordMatches = 0;
    var nonStopwordTokens = 0;
    var _loop_1 = function (token) {
        var isStop = COMMON_STOPWORDS.has(token);
        if (!isStop)
            nonStopwordTokens++;
        var tokenMatched = false;
        // Check in product names
        if (nameEn.includes(token) || nameHi.includes(token)) {
            rawScore += isStop ? 0.08 : 0.35;
            tokenMatched = true;
            matchedTerms.push(token);
        }
        // Check in pack sizes and prices
        for (var _e = 0, _f = product.variants; _e < _f.length; _e++) {
            var v = _f[_e];
            var vSize = normalizeText(v.packSize);
            var vPrice = v.mrp.toString();
            if (vSize === token || token === vSize.replace(/\s+/g, '')) {
                rawScore += 0.45;
                tokenMatched = true;
                matchedTerms.push(v.packSize);
            }
            if (token === vPrice || token === "\u20B9".concat(vPrice) || token === "rs".concat(vPrice)) {
                rawScore += 0.35;
                tokenMatched = true;
                matchedTerms.push("\u20B9".concat(vPrice));
            }
        }
        // Check keywords
        if (keywordsEn.some(function (kw) { return kw === token || kw.includes(token); }) ||
            keywordsHi.some(function (kw) { return kw === token || kw.includes(token); })) {
            rawScore += isStop ? 0.05 : 0.25;
            tokenMatched = true;
            matchedTerms.push(token);
        }
        // Check indications
        var indications = __spreadArray(__spreadArray([], (((_c = product.indications) === null || _c === void 0 ? void 0 : _c.en) || []), true), (((_d = product.indications) === null || _d === void 0 ? void 0 : _d.hi) || []), true).map(normalizeText);
        if (indications.some(function (ind) { return ind.includes(token); })) {
            rawScore += 0.3;
            tokenMatched = true;
            matchedTerms.push(token);
        }
        // Subtitle & description
        if (subtitleEn.includes(token) || subtitleHi.includes(token)) {
            rawScore += isStop ? 0.03 : 0.15;
            tokenMatched = true;
        }
        else if (descEn.includes(token) || descHi.includes(token)) {
            rawScore += isStop ? 0.02 : 0.08;
            tokenMatched = true;
        }
        if (tokenMatched && !isStop) {
            nonStopwordMatches++;
        }
    };
    for (var _i = 0, queryTokens_1 = queryTokens; _i < queryTokens_1.length; _i++) {
        var token = queryTokens_1[_i];
        _loop_1(token);
    }
    // If query had distinctive tokens but none matched this product, heavily scale down
    if (nonStopwordTokens > 0 && nonStopwordMatches === 0) {
        rawScore *= 0.1;
    }
    return {
        productId: product.id,
        score: rawScore,
        matchedTerms: Array.from(new Set(matchedTerms)),
    };
}
