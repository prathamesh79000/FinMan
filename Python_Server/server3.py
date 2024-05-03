from flask import Flask, jsonify,request
import plotly.graph_objs as go
from flask_cors import CORS
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
# from pmdarima.arima.utils import ndiffs
from statsmodels.tsa.arima.model import ARIMA
from transformers import pipeline

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/forecast/*": {"origins": "http://localhost:3000"}})
# sentiment_analysis = pipeline("sentiment-analysis")
sentiment_analysis = pipeline("sentiment-analysis", model="ProsusAI/finbert")


@app.route('/')
def hello():
    return "<h1>Hello, World!</h1>"

@app.route('/stock/<stock_symbol>')
def plot(stock_symbol):
    graph_data = preprocess_stock_data(stock_symbol=stock_symbol)

    # forcast_data = forcast_data(stock_symbol=stock_symbol)
    # Return the graph data as JSON
    return jsonify(graphData=graph_data)

def preprocess_stock_data(stock_symbol):
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=5 * 365)

    start_date_str = start_date.strftime("%Y-%m-%d")
    end_date_str = end_date.strftime("%Y-%m-%d")

    stock_data = yf.download(stock_symbol, start=start_date_str, end=end_date_str)

    data = stock_data['Close']
    graph_data = generate_line_plot(data, start_date_str, end_date_str,stock_symbol)

    return graph_data

def generate_line_plot(data, start_date_str, end_date_str,stock_symbol):
    fig = go.Figure(data=[go.Scatter(x=data.index, y=data, mode='lines')])
    fig.update_layout(
        title=f'{stock_symbol} Closing Prices from {start_date_str} to {end_date_str}',
        xaxis_title="Date",
        template='plotly_dark',
        yaxis_title="Closing Price (USD)"
    )

    # Convert the figure data to JSON
    graph_data = fig.to_json()

    return graph_data

# ----------------------------------------------------------------
@app.route('/forecast/<stock_symbol>')
def forecast(stock_symbol):
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=5 * 365)

    start_date_str = start_date.strftime("%Y-%m-%d")
    end_date_str = end_date.strftime("%Y-%m-%d")

    stock_data = yf.download(stock_symbol, start=start_date_str, end=end_date_str)

    data = stock_data['Close']
    # Check for missing values
    missing_values = data.isnull().sum()
    if missing_values:
        data = data.dropna()

    # ARIMA Model
    model = ARIMA(data, order=(6, 1, 3))
    result = model.fit()
    forecast = result.forecast(steps=10)

    return jsonify(forecast=forecast.tolist())

@app.route('/news', methods=['POST'])
def analyze_news_sentiment():
    data = request.json
    news_text = data.get('news_text')

    # Perform sentiment analysis
    result = sentiment_analysis(news_text)

    return jsonify(sentiment=result[0]['label'])
# @app.route('/chat')
# def chat_with_pdf():
#     data = request.json
#     message = data['message']
#     return message


# @app.route('/news', methods=['POST'])
# def analyze_news_sentiment():
#     data = request.json
#     news_text = data.get('news_text')

#     # Perform sentiment analysis
#     result = sentiment_analysis(news_text)

#     return jsonify(sentiment=result[0]['label'])


def ad_test(dataset):
    dftest = adfuller(dataset, autolag="AIC")
    return {'ADF Statistics': dftest[0], 'P-value': dftest[1]}

if __name__ == '__main__':
    app.run(debug=True)
