FROM python:3.11

WORKDIR /app

# Copy backend code
COPY backend-drf /app

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port
EXPOSE 8000

# Start server and run migrations
CMD python manage.py migrate && \
    python manage.py collectstatic --noinput && \
    gunicorn stock_prediction_main.wsgi:application --bind 0.0.0.0:$PORT