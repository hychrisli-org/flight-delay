from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from data_handler import readAirportClusters
from datetime import datetime
from sklearn.preprocessing import normalize
from sklearn.externals import joblib
import pandas as pd

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['TRAP_BAD_REQUEST_ERRORS'] = True
clusterDict = readAirportClusters()
xgboost_clusters = ['pkls/xgboost_cluster0.pkl',
                    'pkls/xgboost_cluster1.pkl',
                    'pkls/xgboost_cluster2.pkl',
                    'pkls/xgboost_cluster3.pkl']
carrierLkp = { 'UAL': 'UA', 'AAL': 'AA', 'DAL':'DL', 'SWA':'WN'}


@app.route('/classify', methods = ['GET', 'POST'])
@cross_origin()
def classify():
    if request.method == 'GET':
        """ Return Greeting """
        return replyMsg("You've reached the backend")

    if request.method == 'POST':

        form = request.get_json()
        print(form)
        origin = form.get('origin')
        dest =form.get('dest')
        airline = carrierLkp.get(form.get('airline'))
        depTimeStr = form.get('depTimeStr')
        arrTimeStr = form.get('arrTimeStr')
        distance = form.get('distance')

        print (origin, dest, airline, depTimeStr, arrTimeStr, distance)

        if not (origin and dest and airline and depTimeStr and arrTimeStr and distance):
            return replyMsg("Contains Empty Input")



        cluster = clusterDict.get(dest)
        depDatetime = datetime.strptime(str(depTimeStr), '%Y-%m-%d %H:%M:%S')
        arrDatetime = datetime.strptime(str(arrTimeStr), '%Y-%m-%d %H:%M:%S')

        month = arrDatetime.month
        dayOfMonth = arrDatetime.day
        dayOfWeek = arrDatetime.weekday() + 1
        airlineVal = int(''.join(str(ord(c)) for c in airline))
        originVal = int(''.join(str(ord(c)) for c in origin))
        destVal = int(''.join(str(ord(c)) for c in dest))
        crsDepTime = int(datetime.strftime(depDatetime, '%H%M'))
        crsArrTime = int(datetime.strftime(arrDatetime, '%H%M'))

        print(depDatetime, arrDatetime)
        print(month, dayOfMonth, dayOfWeek,airlineVal, originVal, destVal, crsDepTime, crsArrTime)

        df = pd.DataFrame([month, dayOfMonth, dayOfWeek, airlineVal, originVal, destVal, crsDepTime, crsArrTime, distance]).T
        print(df)
        df.columns = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9']
        xNorm = normalize(df, norm='l2', axis=0)
        gs_best = joblib.load(xgboost_clusters[int(cluster)])

        res = gs_best.predict(xNorm)
        print(res)

        return jsonify({"pred": res[0]})

def replyMsg(msg):
    return jsonify({"Message": msg})

def getReqVal(key):
    return request.form.get(key)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
