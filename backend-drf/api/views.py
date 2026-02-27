from .serializers import StockPredictionSerializers
from rest_framework.views import APIView
from rest_framework.response import Response
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime
import os 
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score


# Create your views here.
class StockPredictionAPIView(APIView):
    def post(self, request):
        # data = request.data
        serializer = StockPredictionSerializers(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data["ticker"]

            # fetch the data from yfinanace
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            
            if df.empty:
                return Response({
                    "error":"No Data Found for the given ticker"
                })
            
            df = df.reset_index()
            df.columns = df.columns.droplevel(1)
            print(df)

            # generate the basic plot
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df["Close"], label = "Closing Price")
            plt.title(f"Closing price of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()
            # save the plot to file
            plot_img_path = f"{ticker}_plot.png"
            plot_img = save_plot(plot_img_path)
            # print(plot_img )

            # 100 days of moving average plot
            ma_100 = df["Close"].rolling(100).mean()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df["Close"], label="Closing Price")
            plt.plot(ma_100 ,"r", label ="100 DMA")
            plt.title(f"100 days Moving Average of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend()
             # save the plot to file
            plot_img_path = f"{ticker}_100_dma.png"
            plot_100_ma = save_plot(plot_img_path)

            # 200 days of moving average plot
            ma_200 = df["Close"].rolling(200).mean()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df["Close"], label = "Closing Price")
            plt.plot(ma_100, "r", label = "100 DMA")    
            plt.plot(ma_200, "g", label = "200 DMA")
            plt.title(f"200 Days Moving Average of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend()
            # save the plot to file
            plot_img_path = f"{ticker}_200_dma.png" 
            plot_200_ma = save_plot(plot_img_path)


            #splitting data into traning and testing dataset
            data_training = pd.DataFrame(df["Close"][0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df["Close"][int(len(df)*0.7):int(len(df))])
            
            # Scaling - Because LSTM model required scaled data
            scaler = MinMaxScaler(feature_range=(0,1))

            scaler.fit(data_training)

            # Load ML Model
            model = load_model("stoc_prediction_model.keras")

            # Preparing test data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.transform(final_df)

            x_test  =[]
            y_test = []

            if input_data.shape[0] < 100:
                return Response({
                    "error": "Not enough data to make prediction. Need at least 100 data points."
                            })
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])

            x_test, y_test = np.array(x_test), np.array(y_test)

            # Making Prediction
            y_predicted = model.predict(x_test)


            # Revert the scaled prices to original price
            y_predicted  = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            latest_actual_price = float(y_test[-1])
            latest_predicted_price = float(y_predicted[-1])

            if latest_predicted_price > latest_actual_price :
                signal = "BUY"
            else:
                signal = "SELL"


            # print("y_predicted:- ",y_predicted)
            # print("y_test:- ", y_test)

            # Plot the final Prediction
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(y_test, "b", label ="Original Price")
            plt.plot(y_predicted, "r", label ="Predicted Price")
            plt.title("Final Prediction")
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend()

            ## save the plot to file
            plot_img_path= f"{ticker}_final_prediction.png"
            plot_final_prediction = save_plot(plot_img_path)

            # Model Evaluation
            mse  = mean_squared_error(y_test, y_predicted)

            # Root Mean Squared Error
            r2 = r2_score(y_test, y_predicted)
            confidence_score = round(r2 * 100, 2)

            # rmse
            rmse = np.sqrt(mse)


            return Response({
                # Graphs
                "message":"success",
                "plot_img":plot_img,
                "plt_100_ma":plot_100_ma,
                "plt_200_ma":plot_200_ma,
                "plt_final_prediction":plot_final_prediction,

                # #Predicted Data
                # "current_price":latest_actual_price,
                # "predicted_price":latest_predicted_price,
                # "signal":signal,
                # "confidence_score":confidence_score,

                # Model Metrics
                "mse":mse,
                "r2":r2,
                "rmse":rmse,

                #Predicted Data
                "current_price":latest_actual_price,
                "predicted_price":latest_predicted_price,
                "signal":signal,
                "confidence_score":confidence_score,
            })