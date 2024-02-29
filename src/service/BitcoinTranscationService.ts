// GraphqlService.ts
const GRAPHQL_ENDPOINT = 'https://graphql.bitquery.io/';
const API_KEY = 'BQYShcD5hXomTo6y398EB4BMwdN3BlfN';

interface GraphqlResponse<T> {
  data: T;
}

export const getBitcoinTransactions = async (pageNumber?: number) => {
  const query = `
    {
      bitcoin(network: bitcoin) {
        transactions(
          options: { desc: ["block.height", "index"], limit: 10, offset: ${pageNumber ?? 0} }
          date: { since: "2023-07-13", till: "2023-07-20" }
        ) {
          block {
            timestamp {
              time(format: "%Y-%m-%d %H:%M:%S")
            }
            height
          }
          inputValue
          input_value_usd: inputValue(in: USD)
          outputCount
          inputCount
          index
          hash
          feeValue
          fee_value_usd: feeValue(in: USD)
          feeValueDecimal
          minedValue
          minedValueDecimal
          outputValue
          outputValueDecimal
          txCoinbase
          txLocktime
          txSize
          txVersion
          txVsize
          txWeight
        }
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: GraphqlResponse<any> = await response.json();
    return data.data.bitcoin.transactions;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
