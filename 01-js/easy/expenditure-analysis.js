/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  if(!transactions.length){
    return [];
  }

  const category_total = new Map();

  for(const transaction of transactions){
    const {category,price}=transaction;
    const current_total=category_total.get(category) || 0;
    category_total.set(category, current_total+price);
  }

  return Array.from(category_total,([category, totalSpent])=>({category, totalSpent,}));
}

module.exports = calculateTotalSpentByCategory;
