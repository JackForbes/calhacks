#!/usr/bin/env python

from flask import Flask, jsonify, render_template, request
import wolframalpha

app = Flask(__name__)

# WOLFRAM API
WOLFRAM_APP_ID = 'KJKLV3-YJ959ULJVY'

client = wolframalpha.Client(WOLFRAM_APP_ID)

ACTIVITY_MET_VALUES = {
    'running': 8,
    'walking': 2,
    'cycling': 6,
}

def get_calories_from_wa(name):
    query = 'calories in {}'.format(name)
    print('WolframAlpha query: {}'.format(query))
    res = client.query(query)
    pod = res.pods[1]
    calories = float(pod.text.split()[0])
    return calories

@app.route("/burn", methods=['GET'])
def burn():
    # calories = met * weight * hours
    calories = float(
        request.args.get('calories') or
        get_calories_from_wa(request.args['name'])
    )
    weight = float(request.args['weight'])
    data = [{name: calories / (met * weight) for (name, met) in ACTIVITY_MET_VALUES.items()}]
    return jsonify({'activities': data}), 200

@app.route("/")
def hello():
    return render_template('base.html')

if __name__ == "__main__":
    app.run(debug=True)
