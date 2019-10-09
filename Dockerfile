FROM python
RUN mkdir /home/spdx/
WORKDIR /home/spdx/
COPY . /home/spdx/
RUN pip install -r requirements.txt
EXPOSE 8000
ENTRYPOINT ["mkdocs", "serve", "-a", "0.0.0.0:8000"]
