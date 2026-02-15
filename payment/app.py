from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/health")
def health():
    return "OK", 200

@app.route("/pay", methods=["POST"])
def pay():
    return jsonify({"status": "Payment Successful"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)