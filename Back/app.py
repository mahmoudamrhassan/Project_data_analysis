from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)
