from flask import Flask, request, jsonify
import pandas as pd
from pyspark.sql import SparkSession
from pyspark.sql.functions import sum, avg, expr, col
import pyodbc  
import pymongo  

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Initialize Spark Session
spark = SparkSession.builder \
    .appName("Data Analysis") \
    .config("spark.jars", "path_to/sqljdbc42.jar") \
    .getOrCreate()
@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file)
        else:
            return jsonify({'error': 'Unsupported file format'}), 400
        
        # Summary statistics
        summary_stats = {}
        for column in df.select_dtypes(include=['float64', 'int64']).columns:
            summary_stats[column] = {
                'sum': float(df[column].sum()),     # Convert to Python float
                'mean': float(df[column].mean()),   # Convert to Python float
                'median': float(df[column].median())  # Convert to Python float
            }

        # Data types and null counts
        data_info = {
            'data_types': df.dtypes.astype(str).to_dict(),
            'null_counts': df.isnull().sum().astype(int).to_dict()  # Ensure these are Python ints
        }

        # File path and column names to return to the front-end for PySpark code generation
        response = {
            'data_summary': summary_stats,
            'data_info': data_info,
            'columns': df.columns.tolist(),  # List of columns in the dataset
            'file_name': file.filename        # File name for PySpark code
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/sql', methods=['POST'])
def get_data_sql():
    try:
        conn_str = request.json['conn_str']
        query = request.json['query']

        # Connect to SQL Server
        with pyodbc.connect(conn_str) as conn:
            df_sql = pd.read_sql(query, conn)

        # Convert to PySpark DataFrame
        spark_df = spark.createDataFrame(df_sql)

        # Get summary statistics
        summary_df = spark_df.describe().toPandas().to_dict(orient='records')

        # Show data types and count nulls
        data_types = {col: str(spark_df.schema[col].dataType) for col in spark_df.columns}
        null_counts = {col: spark_df.filter(col(f"{col}").isNull()).count() for col in spark_df.columns}

        return jsonify({
            'data_summary': summary_df,
            'data_types': data_types,
            'null_counts': null_counts
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/mongo', methods=['POST'])
def get_data_mongo():
    try:
        mongo_uri = request.json['mongo_uri']
        db_name = request.json['db_name']
        collection_name = request.json['collection_name']

        # Connect to MongoDB
        client = pymongo.MongoClient(mongo_uri)
        db = client[db_name]
        collection = db[collection_name]

        # Retrieve data
        data = list(collection.find({}))

        # Convert _id to string and create a DataFrame
        for item in data:
            item['_id'] = str(item['_id'])  # Ensure _id is a string

        df_mongo = pd.DataFrame(data)
        spark_df = spark.createDataFrame(df_mongo)

        # Get summary statistics
        summary_df = spark_df.describe().toPandas().to_dict(orient='records')

        # Show data types and count nulls
        data_types = {col: str(spark_df.schema[col].dataType) for col in spark_df.columns}
        null_counts = {col: spark_df.filter(spark_df[col].isNull()).count() for col in spark_df.columns}

        return jsonify({
            'data_summary': summary_df,
            'data_types': data_types,
            'null_counts': null_counts
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
