#!/usr/bin/env python
import json
from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask.ext.sqlalchemy import SQLAlchemy
from cachetools import cached, LRUCache
import wolframalpha
import requests

WOLFRAM_APP_ID = 'KJKLV3-YJ959ULJVY'

UA_API_KEY = 'mz6nzfvhha2jd28ufqutjdxhdyrkp5cd',
UA_AUTHORIZATION = 'Bearer e8a59c745466dd170e2027e99112b4a716241c50',

GETTY_KEY = '3u6z26bed7k6ydnvsarzj38a'
GETTY_SECRET = 'qYxxJ3mQ9p9K8jdV7rhtncxMyKtXedZEWFxxUMnqNkvRD'
GETTY_BASE_URL = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best'

ACTIVITY_MET_VALUES = {
    'running': 8,
    'walking': 2,
    'cycling': 6,
}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
client = wolframalpha.Client(WOLFRAM_APP_ID)
cache = LRUCache(maxsize=256)

class Pleasure(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=True)
    url = db.Column(db.String(512))

    def __init__(self, name, url=None):
        self.name = name
        self.url = url or get_getty_image_url(name)

@cached(cache)
def get_calories_from_wa(name):
    query = 'calories in {}'.format(name)
    print('WolframAlpha query: {}'.format(query))
    res = client.query(query)
    pod = res.pods[1]
    calories = float(pod.text.split()[0])
    return calories


@cached(cache)
def get_getty_image_url(name):
    params = {'phrase': name}
    headers = {'Api-Key': GETTY_KEY}
    resp = requests.get(GETTY_BASE_URL, headers=headers, params=params)
    print(len(resp.json()['images'][0]['display_sizes']))
    return resp.json()['images'][0]['display_sizes'][0]['uri']

@app.route('/api/pleasures', methods=['GET', 'POST', 'OPTIONS'])
def pleasure():
    if request.method == 'POST':
        data = json.loads(request.data)
        name = data['name']
        url = data.get('url')
        if not Pleasure.query.filter_by(name=name).first():
            pleasure = Pleasure(name, url)
            db.session.add(pleasure)
            db.session.commit()

        pleasures = [{
            'id': p.id,
            'name': p.name,
            'url': p.url,
            'count': 0
        } for p in Pleasure.query.all()]
        resp = jsonify({'pleasures': pleasures})
        resp.status_code = 201
        resp.headers = {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Origin': '*'
        }
        return resp

    elif request.method == 'GET':
        pleasures = [{
            'id': p.id,
            'name': p.name,
            'url': p.url,
            'count': 0
        } for p in Pleasure.query.all()]
        resp = jsonify({'pleasures': pleasures})
        resp.status_code = 201
        resp.headers = {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Origin': '*'
        }
        return resp

    elif request.method == 'OPTIONS':
        resp = jsonify({})
        resp.status_code = 200
        resp.headers = {
            'Access-Control-Allow-Headers': request.headers['Access-Control-Request-Headers'],
            'Access-Control-Allow-Methods': request.headers['Access-Control-Request-Method'],
            'Access-Control-Allow-Origin': '*'
        }
        return resp

@app.route("/api/burn", methods=['GET'])
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

@app.route('/api/ua_route', methods=['GET'])
def get_ua_route():
    """Gets Under Armour routes."""
    payload = {
        'Content-Type': 'application/json',
        'close_to_location': '37.774929,-122.41941550',
        'maximum_distance': 10000,
        'minimum_distance': 1
    }
    headers = {
        'Api-Key': UA_API_KEY,
        'Authorization': UA_AUTHORIZATION,
    }
    res = requests.get('https://oauth2-api.mapmyapi.com/v7.1/route/',
            params=payload,
            headers=headers)
    route_json = res.json()
    first_route = route_json['_embedded']['routes'][0]['_links']
    return jsonify(first_route), 200

    first_route = route_json['_embedded']['routes'][0]['_links']

@app.route('/api/embedded_route', methods=['GET'])
def test_embed():
    """Supply me with a route_id."""
    route = {}
    route['id'] = request.args.get('route_id')
    # default route (for demo fallback)
    if not route['id']:
        route['id'] = 504251502
    return render_template('embed.html', route=route)

# convert time activity into alternate activities
# def equivalent_activities

@app.route("/")
def hello():
    return render_template('base.html')

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
