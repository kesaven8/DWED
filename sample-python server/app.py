from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/items")
def get_items():
    return jsonify(["apple", "banana", "orange"])


if __name__ == "__main__":
    app.run(debug=True)
