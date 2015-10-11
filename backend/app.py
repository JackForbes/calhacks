#!/usr/bin/env python
from flask import Flask, jsonify, render_template, request
from cachetools import cached, LRUCache
import wolframalpha
import requests

WOLFRAM_APP_ID = 'KJKLV3-YJ959ULJVY'
UA_API_KEY = 'mz6nzfvhha2jd28ufqutjdxhdyrkp5cd',
UA_AUTHORIZATION = 'Bearer e8a59c745466dd170e2027e99112b4a716241c50',

client = wolframalpha.Client(WOLFRAM_APP_ID)

ACTIVITY_MET_VALUES = {
    'running': 8,
    'walking': 2,
    'cycling': 6,
}

app = Flask(__name__)
client = wolframalpha.Client(WOLFRAM_APP_ID)
cache = LRUCache(maxsize=256)

@cached(cache)
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
    data = [
        {name: {'hours':  calories / (met * weight)}
         for (name, met) in ACTIVITY_MET_VALUES.items()}
    ]
    return jsonify({'activities': data}), 200

@app.route('/ua_route', methods=['GET'])
def get_ua_route():
    """Gets Under Armour routes."""
    payload = {
        'Content-Type': 'application/json',
        'close_to_location': '37.774929,-122.41941550',
        'maximum_distance': 10000,
        'minimum_distance': 1
    }
    headers = {
        'Api-Key': 'mz6nzfvhha2jd28ufqutjdxhdyrkp5cd',
        'Authorization': 'Bearer e8a59c745466dd170e2027e99112b4a716241c50',
    }
    res = requests.get('https://oauth2-api.mapmyapi.com/v7.1/route/',
            params=payload,
            headers=headers)
    print res
    route_json = res.json()
    first_route = route_json['_embedded']['routes'][0]['_links']
    return jsonify(first_route), 200

@app.route("/")
def hello():
    return render_template('base.html')

if __name__ == "__main__":
    app.run(debug=True)
