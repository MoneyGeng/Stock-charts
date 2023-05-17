from flask import Flask, jsonify, send_file
import json

app = Flask(__name__, static_folder='static')

# Serve the index.html file
@app.route("/")
def home():
    return send_file('C:/Users/John/Desktop/Data Analytics Bootcamp/Data-Analytics-Bootcamp/UTOR-VIRT-DATA-PT-12-2022-U-LOLC-main/Project 3/Stock-charts/index.html')

# Define a route to fetch the stock data
@app.route("/data")
def get_data():
    file_path = "C:/Users/John/Desktop/Data Analytics Bootcamp/Data-Analytics-Bootcamp/UTOR-VIRT-DATA-PT-12-2022-U-LOLC-main/Project 3/Stock-charts/Resources/stock_data.json"
    with open(file_path, 'r') as f:
        stock_data = json.load(f)
    return jsonify(stock_data)


if __name__ == "__main__":
    app.run(debug=True)