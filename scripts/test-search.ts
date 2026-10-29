import { searchProducts } from '../src/lib/search/semantic-search';

async function testQueries() {
  const testQueries = [
    'Sukoon oil 100 ml',
    'नगीना सुकून तेल',
    'hair oil',
    'बालों का तेल',
    'pain relief product',
    'पेन किलर',
    'कमर दर्द',
    'दिमाग की ताजगी',
    '290',
  ];

  console.log('=== Testing Vector & Hybrid Search Execution ===');

  for (const q of testQueries) {
    const res = await searchProducts(q, { useSemantic: true });
    console.log('\n----------------------------------------');
    console.log(`Query: "${q}"`);
    console.log(`Results (${res.results.length}):`);
    res.results.forEach((r, i) => {
      console.log(
        `  ${i + 1}. ${r.product.name.en} (${r.product.name.hi}) | Score: ${r.score.toFixed(3)} | Match: ${r.matchedBy}`
      );
    });
  }
}

testQueries().catch(console.error);

