FROM python:3.11

WORKDIR /app

# Copy backend folder into container
COPY backend-drf /app

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "stock_prediction_main.wsgi", "--bind", "0.0.0.0:8000"]