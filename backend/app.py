#!/usr/bin/env python

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

ACTIVITY_MET_VALUES = {
    'running': 150,
    'walking': 100,
    'cycling': 125,
}

@app.route("/burn", methods=['GET'])
def burn():
    # calories = met * weight * hours
    calories = float(request.args['calories'])
    weight = float(request.args['weight'])
    data = [{name: calories / (met * weight) for (name, met) in ACTIVITY_MET_VALUES.items()}]
    return jsonify({'activities': data}), 200

@app.route("/")
def hello():
    return render_template('base.html')

if __name__ == "__main__":
    app.run(debug=True)
