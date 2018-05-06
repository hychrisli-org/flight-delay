from flask import Flask, request, jsonify

from flask_restful import reqparse, Resource, Api

app = Flask(__name__)
app.config['TRAP_BAD_REQUEST_ERRORS'] = True


@app.route('/classify', methods = ['GET', 'POST'])
def classify():
    if request.method == 'GET':
        """ Return Greeting """
        return replyMsg("You've reached the backend")

    if request.method == 'POST':

        origin = getReqVal('origin')
        dest = getReqVal('dest')
        airline = getReqVal('airline')
        flNum = getReqVal('flNum')
        flDate = getReqVal('flDate')
        depTime = getReqVal('depTime')
        arrTime = getReqVal('arrTime')
        distance = request.form.get('distance')
        vis = getReqVal('vis')
        temp = getReqVal('temp')
        liquDepth = getReqVal('liquDepth')
        snowDepth = getReqVal('snowDepth')

        if not (origin and dest and airline and flNum and flDate and depTime and arrTime and distance):
            return replyMsg("Contains Empty Input")
        return replyMsg("Got It")

def replyMsg(msg):
    return jsonify({"Message": msg})

def getReqVal(key):
    return request.form.get(key)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
