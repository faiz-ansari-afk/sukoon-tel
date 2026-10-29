/**
 * Computes cosine similarity between two numeric vectors.
 * Returns a value between -1 and 1 (or 0 if one vector is all zeros).
 */
export function cosineSimilarity(a, b) {
    if (!a || !b || a.length !== b.length || a.length === 0) {
        return 0;
    }
    var dotProduct = 0;
    var normA = 0;
    var normB = 0;
    for (var i = 0; i < a.length; i++) {
        var valA = a[i];
        var valB = b[i];
        dotProduct += valA * valB;
        normA += valA * valA;
        normB += valB * valB;
    }
    var magnitude = Math.sqrt(normA) * Math.sqrt(normB);
    if (magnitude === 0 || isNaN(magnitude)) {
        return 0;
    }
    return dotProduct / magnitude;
}
