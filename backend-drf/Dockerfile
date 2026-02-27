FROM python:3.10

WORKDIR /app

COPY backend-drf/requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY backend-drf .

EXPOSE 8000

CMD ["gunicorn", "stock_prediction_main.wsgi", "--bind", "0.0.0.0:8000"]