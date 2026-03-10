FROM python:3.11

WORKDIR /app

# Copy backend code
COPY backend-drf /app

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Run migrations + collect static
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Start server
CMD ["gunicorn", "stock_prediction_main.wsgi:application", "--bind", "0.0.0.0:$PORT"]