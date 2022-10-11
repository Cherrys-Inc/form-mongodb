# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import json

from bson import json_util
from pymongo import MongoClient
from flask import Flask, request

app = Flask(__name__)
conn = MongoClient()
# database
db = conn.database

# Created or Switched to collection names: my_gfg_collection
collection = db.form


@app.route('/add', methods=['POST'])
def create():
    json_data = request.get_json(force=True)
    collection.insert_one(json_data)
    print("done")
    return "Record added"


def parse_json(data):
    return json.loads(json_util.dumps(data))


@app.route('/display/<string:email>', methods=['GET'])
def findbyid(email):

    myquery = {"email": email}
    user = collection.find_one(myquery)
    print(email, user)
    return parse_json(user)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
