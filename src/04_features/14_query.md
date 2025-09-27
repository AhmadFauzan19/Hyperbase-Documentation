# Query API

The Query API provides advanced filtering, sorting, and pagination capabilities for retrieving records from your collections. This powerful feature allows you to build complex queries to fetch exactly the data you need.

## Endpoint

```
POST 
{base_url}/api/rest/project/{project_id}/collection/{collection_id}/records
```

## Request Structure

The Query API accepts a JSON payload with the following structure:

### Basic Structure 

```JSON
{
    "fields": ["field1", "field2", "field3"],
    "filters": [],
    "orders": [],
    "limit": 100
}
```

### Field Selection 

Use the fields array to specify which fields you want to retrieve from your records. This helps optimize your queries by only fetching the data you actually need.

```JSON
{
    "fields": ["idle_time", "timestamp", "state"]
}
```

### Filters 

The filters array allows you to apply complex filtering logic to your queries. Filters support nested conditions with logical operators for building sophisticated query conditions.

#### Basic Filter Structure

```JSON
{
    "filters": [
        {
            "op": "AND",
            "children": [
                {
                    "field": "timestamp",
                    "op": "<",
                    "value": "2025-06-17T15:00:00Z"
                },
                {
                    "field": "state",
                    "op": "=",
                    "value": "Idle"
                }
            ]
        }
    ]
}
```

#### Supported Operators

##### Logical Operators:

1. AND - All conditions must be true
2. OR - At least one condition must be true

##### Comparison Operators:

1. "=" - Equal to
2. "!=" - Not equal to
3. "<" - Less than
4. "<=" - Less than or equal to
5. ">" - Greater than
6. ">=" - Greater than or equal to

### Sorting (Orders)

Use the orders array to specify how you want your results sorted. You can sort by multiple fields with different sort directions.

```JSON
{
    "orders": [
        {
            "field": "timestamp",
            "kind": "desc"
        }
    ]
}
```

#### Sort Options

1. "kind": "asc" - Ascending order (A-Z, 0-9, oldest to newest)
2. "kind": "desc" - Descending order (Z-A, 9-0, newest to oldest)

#### Multiple Sort Fields

You can sort by multiple fields. The first field has the highest priority:

```JSON
{
    "orders": [
        {
            "field": "state",
            "kind": "asc"
        },
        {
            "field": "timestamp", 
            "kind": "desc"
        }
    ]
}
```

### Pagination

Use the limit parameter to control how many records are returned in a single request:

```JSON
{
    "limit": 50
}
```

### Complete Example

Here's a comprehensive example that demonstrates all features working together:

```JSON
{
    "fields": ["idle_time", "timestamp", "state", "user_id"],
    "filters": [
        {
            "op": "AND",
            "children": [
                {
                    "field": "timestamp", 
                    "op": ">=",
                    "value": "2025-06-01T00:00:00Z"
                },
                {
                    "op": "OR",
                    "children": [
                        {
                            "field": "state",
                            "op": "=", 
                            "value": "Idle"
                        },
                        {
                            "field": "state",
                            "op": "=",
                            "value": "Active"
                        }
                    ]
                }
            ]
        }
    ],
    "orders": [
        {
            "field": "timestamp",
            "kind": "desc"
        }
    ],
    "limit": 100
}
```

This query will:

- Return only idle_time, timestamp, state, and user_id fields
- Filter records where timestamp is after June 1, 2025 AND state is either "Idle" or "Active"
- Sort results by timestamp in descending order (newest first)
- Limit results to 100 records