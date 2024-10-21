# app.py
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file.filename.endswith('.csv'):
        df = pd.read_csv(file)
    elif file.filename.endswith(('.xls', '.xlsx')):
        df = pd.read_excel(file)
    else:
        return jsonify({'error': 'File format not supported'}), 400

    # Calculate summary statistics
    summary_stats = {}
    for column in df.select_dtypes(include=['number']).columns:
        summary_stats[column] = {
            'sum': int(df[column].sum()),  # Convert to int
            'mean': float(df[column].mean()),  # Convert to float
            'median': float(df[column].median()),  # Convert to float
        }

    # Create a data type and null count summary
    data_info = {
        'data_types': df.dtypes.astype(str).to_dict(),  # Get data types as strings
        'null_counts': df.isnull().sum().to_dict()  # Get null counts
    }

    return jsonify({'data_summary': summary_stats, 'data_info': data_info, 'data': df.to_dict(orient='records')}), 200

if __name__ == '__main__':
    app.run(debug=True)
