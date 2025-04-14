# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies if any (e.g., for certain Python packages)
# RUN apt-get update && apt-get install -y --no-install-recommends some-package && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
# Consider using --no-cache-dir for smaller image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY app.py .
# --> ADD THIS LINE TO COPY THE TEMPLATES DIRECTORY <--
COPY templates /app/templates

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
# Using waitress for production
CMD ["waitress-serve", "--host=0.0.0.0", "--port=5000", "app:app"]

# Alternatively, for development/testing:
# CMD ["python", "app.py"]