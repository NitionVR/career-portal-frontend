.PHONY: install start build test lint pre-commit-install pre-commit-run clean venv

NPM_INSTALL_COMMAND = npm install
NG_SERVE_COMMAND = npm start
NG_BUILD_COMMAND = npm run build
NG_TEST_COMMAND = npm test
NG_LINT_COMMAND = npm run lint

VENV_DIR = .pre-commit-venv
PYTHON = $(VENV_DIR)/bin/python
PIP = $(VENV_DIR)/bin/pip
PRE_COMMIT = $(VENV_DIR)/bin/pre-commit

install:
	@echo "Installing Node.js dependencies..."
	$(NPM_INSTALL_COMMAND)
	@echo "Creating Python virtual environment for pre-commit..."
	$(MAKE) venv
	@echo "Installing pre-commit hooks..."
	$(MAKE) pre-commit-install

start:
	@echo "Starting Angular development server..."
	$(NG_SERVE_COMMAND)

build:
	@echo "Building Angular application for production..."
	$(NG_BUILD_COMMAND)

test:
	@echo "Running Angular tests..."
	$(NG_TEST_COMMAND)

lint:
	@echo "Running Angular linting..."
	$(NG_LINT_COMMAND)

pre-commit-install:
	@echo "Installing pre-commit hooks..."
	$(PRE_COMMIT) install

pre-commit-run:
	@echo "Running pre-commit checks..."
	$(PRE_COMMIT) run --all-files

clean:
	@echo "Cleaning build artifacts and node_modules..."
	rm -rf dist
	rm -rf node_modules
	rm -rf $(VENV_DIR)
	@echo "Cleaning npm cache..."
	npm cache clean --force

venv:
	@echo "Creating Python virtual environment..."
	python3 -m venv $(VENV_DIR)
	@echo "Installing pre-commit in virtual environment..."
	$(PIP) install pre-commit
