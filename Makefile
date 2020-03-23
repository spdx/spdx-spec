.PHONY=build serve clean

build:
	mkdocs build --clean	

serve:
	mkdocs serve

clean:
	rm -rf site
