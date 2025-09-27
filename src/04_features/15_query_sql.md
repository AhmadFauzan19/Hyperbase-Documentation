# SQL Query API

The SQL Query API allows you to execute SQL queries directly against your collections using familiar SQL syntax. This feature is particularly useful when working with backends like ScyllaDB that don't natively support SQL queries, providing a more intuitive way to interact with your data.

## Endpoint

```
POST 
{base_url}/api/rest/project/{project_id}/collection/{collection_id}/records/query
```

## Request Structure

The SQL Query API accepts a JSON payload with a query field containing your SQL statement:

```JSON
{
    "query": "SELECT * FROM 'data' LIMIT 10"
}
```

## Supported SQL Keywords

| **Keyword** | **Deskripsi Penggunaan** |
|-------------|---------------------------|
| SELECT      | Mengambil data dari tabel. |
| WHERE       | Menyaring data berdasarkan kondisi tertentu. |
| LIMIT       | Membatasi jumlah baris yang ditampilkan. |
| ORDER BY    | Mengurutkan data berdasarkan kolom tertentu. |
| GROUP BY    | Mengelompokkan data untuk agregasi. |
| AVG, SUM    | Menghitung rata-rata dan jumlah total nilai. |
| COUNT, MIN, MAX | Menghitung jumlah data, nilai minimum, dan maksimum. |
| HAVING      | Menyaring hasil agregasi. |
| SUBQUERY    | Menjalankan kueri di dalam kueri lain. |
| CAST        | Mengubah tipe data suatu kolom. |
| DISTINCT    | Menghilangkan nilai duplikat. |
