#!/bin/bash

# Test script for DApp Rankings API
# Make sure the server is running on localhost:3001

BASE_URL="http://localhost:3001"

echo "🧪 Testing DApp Rankings API"
echo "================================"

# Test health check
echo "1. Testing Health Check..."
curl -s "$BASE_URL/health" | jq '.'
echo -e "\n"

# Test API info
echo "2. Testing API Info..."
curl -s "$BASE_URL/api" | jq '.'
echo -e "\n"

# Test all rankings - verify we get exactly 15 DApps
echo "3. Testing All Rankings (should return 15 DApps)..."
response=$(curl -s "$BASE_URL/api/dapps/rankings")
total=$(echo "$response" | jq '.total')
echo "Total DApps found: $total"
echo "$response" | jq '.data[0:3]'
echo -e "\n"

# Test top DApps (default)
echo "4. Testing Top DApps (default)..."
curl -s "$BASE_URL/api/dapps/top" | jq '.data[0:3]'
echo -e "\n"

# Test top 5 DApps
echo "5. Testing Top 5 DApps..."
curl -s "$BASE_URL/api/dapps/top/5" | jq '.'
echo -e "\n"

# Test top 15 DApps (all available)
echo "6. Testing Top 15 DApps (all available)..."
response=$(curl -s "$BASE_URL/api/dapps/top/15")
total=$(echo "$response" | jq '.total')
echo "Total DApps returned: $total"
echo "$response" | jq '.data | length'
echo "First 3 DApps:"
echo "$response" | jq '.data[0:3]'
echo -e "\n"

# Test DApps by category - DEX
echo "7. Testing DApps by Category (DEX)..."
curl -s "$BASE_URL/api/dapps/by-category/DEX" | jq '.'
echo -e "\n"

# Test DApps by category - AI
echo "8. Testing DApps by Category (AI)..."
curl -s "$BASE_URL/api/dapps/by-category/AI" | jq '.'
echo -e "\n"

# Test DApps by category - Infra
echo "9. Testing DApps by Category (Infra)..."
curl -s "$BASE_URL/api/dapps/by-category/Infra" | jq '.'
echo -e "\n"

# Test statistics
echo "10. Testing Statistics..."
stats_response=$(curl -s "$BASE_URL/api/dapps/stats")
total_dapps=$(echo "$stats_response" | jq '.data.total_dapps')
echo "Total DApps in stats: $total_dapps"
echo "$stats_response" | jq '.'
echo -e "\n"

# Test invalid category
echo "11. Testing Invalid Category..."
curl -s "$BASE_URL/api/dapps/by-category/INVALID" | jq '.'
echo -e "\n"

# Test invalid limit
echo "12. Testing Invalid Limit..."
curl -s "$BASE_URL/api/dapps/top/100" | jq '.'
echo -e "\n"

# Test 404
echo "13. Testing 404..."
curl -s "$BASE_URL/api/invalid-endpoint" | jq '.'
echo -e "\n"

# Summary test - verify data consistency
echo "14. Data Consistency Check..."
all_rankings=$(curl -s "$BASE_URL/api/dapps/rankings" | jq '.total')
top_15=$(curl -s "$BASE_URL/api/dapps/top/15" | jq '.total')
stats_total=$(curl -s "$BASE_URL/api/dapps/stats" | jq '.data.total_dapps')

echo "All rankings total: $all_rankings"
echo "Top 15 total: $top_15"
echo "Stats total: $stats_total"

if [ "$all_rankings" -eq "$top_15" ] && [ "$all_rankings" -eq "$stats_total" ]; then
    echo "✅ Data consistency check PASSED - All endpoints return same total count"
else
    echo "❌ Data consistency check FAILED - Totals don't match"
fi
echo -e "\n"

echo "✅ API Testing Complete!"
echo "📊 Summary: Tested $all_rankings DApps across all endpoints" 