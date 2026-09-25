# Sample Flask server

## Prerequisites

- Install Python 3.9 or newer with pip and add Python to your PATH.
- Open PowerShell in the repository root (`DWED`).
- An internet connection is needed to install Flask the first time.

Check that Python is available:

```powershell
python --version
python -m pip --version
```

If Windows does not recognize `python`, try `py` instead in the commands below.

## First-time setup

Enter the server folder (keep the quotes because the folder name contains a space):

```powershell
cd "sample-python server"
```

Create a virtual environment and install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

These commands use the virtual environment directly, so activating it is not required.

## Start the server

From the `sample-python server` folder, run:

```powershell
.\.venv\Scripts\python.exe app.py
```

Keep the terminal open while using the server. It listens at http://127.0.0.1:5000.

## Test the endpoint

Open http://127.0.0.1:5000/items in a browser, or run this command in another PowerShell terminal:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:5000/items" -Method Get
```

`GET /items` returns the following static JSON list (PowerShell displays the parsed list):

```json
["apple", "banana", "orange"]
```

The root URL `/` has no endpoint and returns 404; use `/items`.

## Stop and restart

Press `Ctrl+C` in the server terminal to stop it.

To restart later, open PowerShell in the repository root and run:

```powershell
cd "sample-python server"
.\.venv\Scripts\python.exe app.py
```

You only need to create the virtual environment once. Reinstall dependencies if you recreate the environment or change `requirements.txt`.

## Troubleshooting

- **Python is not recognized:** install Python with the PATH option enabled, then reopen PowerShell, or use the Windows `py` launcher.
- **No module named flask:** run `.\.venv\Scripts\python.exe -m pip install -r requirements.txt` from this folder.
- **Virtual environment executable is missing:** repeat the first-time setup steps.
- **Port 5000 is already in use:** stop the other server, or start this app on a different port:

  ```powershell
  .\.venv\Scripts\python.exe -m flask --app app run --debug --port 5001
  ```

  Then use http://127.0.0.1:5001/items.

The server runs locally with Flask's development debugger enabled and is intended for development.
