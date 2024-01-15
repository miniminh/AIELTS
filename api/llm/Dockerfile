FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    build-essential \
    wget \ 
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /code
WORKDIR /code

COPY ./requirements.txt .

RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
RUN bash Miniconda3-latest-Linux-x86_64.sh -b -p /miniconda

# Add miniconda to the PATH
ENV PATH=/miniconda/bin:$PATH


RUN pip install -r requirements.txt

COPY . .

EXPOSE 14023

RUN mkdir -p uploads

CMD ["python", "app.py"]
