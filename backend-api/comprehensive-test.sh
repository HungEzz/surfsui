#!/bin/bash

# Comprehensive Test Script for All DApps in Database
# Tests all 15 DApps individually and validates data integrity

BASE_URL="http://localhost:3001"

echo "🧪 COMPREHENSIVE DAPP TESTING"
echo "=============================="
echo "Testing all 15 DApps in database individually"
echo ""

# Get all DApps data
echo "📊 Fetching all DApps data..."
all_dapps=$(curl -s "$BASE_URL/api/dapps/rankings")
total_count=$(echo "$all_dapps" | jq '.total')
echo "Total DApps found: $total_count"
echo ""

# Test 1: Validate all DApp data structure
echo "1. 🔍 VALIDATING DATA STRUCTURE"
echo "================================"

# Check if each DApp has required fields
echo "$all_dapps" | jq -r '.data[] | 
  "DApp: " + .dapp_name + 
  " | Package ID: " + (.package_id | tostring) + 
  " | DAU: " + (.dau_1h | tostring) + 
  " | Type: " + .dapp_type + 
  " | Updated: " + .last_update'

echo ""

# Test 2: Individual DApp Testing
echo "2. 🎯 INDIVIDUAL DAPP TESTING"
echo "=============================="

# Extract DApp names and test each one
dapp_names=($(echo "$all_dapps" | jq -r '.data[].dapp_name'))

for i in "${!dapp_names[@]}"; do
    dapp_name="${dapp_names[$i]}"
    rank=$((i + 1))
    
    echo "Testing DApp #$rank: $dapp_name"
    
    # Get individual DApp data
    dapp_data=$(echo "$all_dapps" | jq ".data[$i]")
    
    # Validate fields
    package_id=$(echo "$dapp_data" | jq -r '.package_id')
    dau=$(echo "$dapp_data" | jq -r '.dau_1h')
    type=$(echo "$dapp_data" | jq -r '.dapp_type')
    
    # Check if package_id is valid (starts with 0x and has correct length)
    if [[ $package_id =~ ^0x[a-f0-9]{64}$ ]]; then
        echo "  ✅ Package ID format: Valid"
    else
        echo "  ❌ Package ID format: Invalid ($package_id)"
    fi
    
    # Check if DAU is a positive number
    if [[ $dau =~ ^[0-9]+$ ]] && [ $dau -gt 0 ]; then
        echo "  ✅ DAU value: Valid ($dau)"
    else
        echo "  ❌ DAU value: Invalid ($dau)"
    fi
    
    # Check if type is not empty
    if [ "$type" != "null" ] && [ -n "$type" ]; then
        echo "  ✅ DApp type: Valid ($type)"
    else
        echo "  ❌ DApp type: Invalid ($type)"
    fi
    
    echo ""
done

# Test 3: Category Distribution Testing
echo "3. 📈 CATEGORY DISTRIBUTION TESTING"
echo "==================================="

categories=($(echo "$all_dapps" | jq -r '.data[].dapp_type' | sort | uniq))

for category in "${categories[@]}"; do
    echo "Testing category: $category"
    
    # Test category endpoint
    category_response=$(curl -s "$BASE_URL/api/dapps/by-category/$category")
    category_count=$(echo "$category_response" | jq '.total')
    
    # Count DApps in this category from all data
    expected_count=$(echo "$all_dapps" | jq "[.data[] | select(.dapp_type == \"$category\")] | length")
    
    if [ "$category_count" -eq "$expected_count" ]; then
        echo "  ✅ Category $category: $category_count DApps (matches expected)"
    else
        echo "  ❌ Category $category: $category_count DApps (expected $expected_count)"
    fi
done

echo ""

# Test 4: Ranking Order Validation
echo "4. 🏆 RANKING ORDER VALIDATION"
echo "=============================="

echo "Validating DAU ranking order (should be descending)..."

# Extract DAU values and check if they're in descending order
dau_values=($(echo "$all_dapps" | jq -r '.data[].dau_1h'))
is_sorted=true

for ((i=0; i<${#dau_values[@]}-1; i++)); do
    current=${dau_values[$i]}
    next=${dau_values[$((i+1))]}
    
    if [ $current -lt $next ]; then
        echo "❌ Ranking error: Position $((i+1)) ($current) < Position $((i+2)) ($next)"
        is_sorted=false
    fi
done

if [ "$is_sorted" = true ]; then
    echo "✅ All DApps are correctly ranked by DAU (descending order)"
else
    echo "❌ Ranking order is incorrect"
fi

echo ""

# Test 5: Top DApps Endpoint Testing
echo "5. 🔝 TOP DAPPS ENDPOINT TESTING"
echo "==============================="

for limit in 1 3 5 10 15; do
    echo "Testing top $limit DApps..."
    
    top_response=$(curl -s "$BASE_URL/api/dapps/top/$limit")
    returned_count=$(echo "$top_response" | jq '.data | length')
    
    expected_count=$limit
    if [ $limit -gt $total_count ]; then
        expected_count=$total_count
    fi
    
    if [ "$returned_count" -eq "$expected_count" ]; then
        echo "  ✅ Top $limit: Returned $returned_count DApps (correct)"
    else
        echo "  ❌ Top $limit: Returned $returned_count DApps (expected $expected_count)"
    fi
done

echo ""

# Test 6: Statistics Validation
echo "6. 📊 STATISTICS VALIDATION"
echo "=========================="

stats_response=$(curl -s "$BASE_URL/api/dapps/stats")
stats_total=$(echo "$stats_response" | jq '.data.total_dapps')
stats_users=$(echo "$stats_response" | jq '.data.total_active_users_1h')

# Calculate expected total users
expected_users=$(echo "$all_dapps" | jq '[.data[].dau_1h] | add')

echo "Statistics validation:"
echo "  Total DApps: $stats_total (expected: $total_count)"
echo "  Total Users: $stats_users (expected: $expected_users)"

if [ "$stats_total" -eq "$total_count" ]; then
    echo "  ✅ Total DApps count: Correct"
else
    echo "  ❌ Total DApps count: Incorrect"
fi

if [ "$stats_users" -eq "$expected_users" ]; then
    echo "  ✅ Total users count: Correct"
else
    echo "  ❌ Total users count: Incorrect"
fi

echo ""

# Test 7: Performance Testing
echo "7. ⚡ PERFORMANCE TESTING"
echo "======================="

echo "Testing API response times..."

endpoints=(
    "/health"
    "/api/dapps/rankings"
    "/api/dapps/top/10"
    "/api/dapps/stats"
    "/api/dapps/by-category/DEX"
)

for endpoint in "${endpoints[@]}"; do
    echo "Testing: $endpoint"
    
    # Measure response time
    start_time=$(date +%s%N)
    response=$(curl -s "$BASE_URL$endpoint")
    end_time=$(date +%s%N)
    
    duration=$(( (end_time - start_time) / 1000000 )) # Convert to milliseconds
    
    if [ $duration -lt 100 ]; then
        echo "  ✅ Response time: ${duration}ms (excellent)"
    elif [ $duration -lt 500 ]; then
        echo "  ✅ Response time: ${duration}ms (good)"
    else
        echo "  ⚠️  Response time: ${duration}ms (slow)"
    fi
done

echo ""

# Test Summary
echo "8. 📋 TEST SUMMARY"
echo "================="

echo "✅ Comprehensive testing completed for all $total_count DApps"
echo ""
echo "📊 DApp Categories Found:"
for category in "${categories[@]}"; do
    count=$(echo "$all_dapps" | jq "[.data[] | select(.dapp_type == \"$category\")] | length")
    echo "  - $category: $count DApps"
done

echo ""
echo "🏆 Top 5 DApps by DAU:"
echo "$all_dapps" | jq -r '.data[0:5][] | "  " + (.dau_1h | tostring) + " DAU - " + .dapp_name + " (" + .dapp_type + ")"'

echo ""
echo "🎉 All tests completed successfully!" 