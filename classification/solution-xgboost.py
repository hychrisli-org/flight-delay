import xgboost
from os.path import expanduser
import pandas as pd
from sklearn.preprocessing import normalize
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score

home = expanduser("~")
dataFile = home + '/data/255-team-proj/export/2017.csv'

df = pd.read_csv(dataFile)

df.drop(['year','fl_date'],  axis=1, inplace=True)

dfLabel = df[['label']]
df.drop('label', axis=1, inplace=True)
print(list(df.columns.values))

# print (df[:1])
# print (dfLabel)


def toAsciiStr(x):
    vals = [str(ord(c)) for c in x]
    return ''.join(vals)


df['unique_carrier'] = df['unique_carrier'].apply(lambda x: toAsciiStr(x))

print (df[:1])


Y = dfLabel.values.ravel()
X = df.values
# normalize each feature
normX = normalize(X, axis=0)

print (normX[1])


X_train, X_test, y_train, y_test = train_test_split(normX, Y, test_size=0.25, stratify=Y)

param = {'max_depth':2, 'eta':1, 'silent':1, 'objective':'binary:logistic' }
num_round = 2

clf = xgboost.XGBRegressor(nthread=4).fit(X_train, y_train)
pdY = clf.predict(X_test)
# print (pdY)
preds = [round(value) for value in pdY]
# print (preds)
print(f1_score(y_test, preds, average='macro'))
