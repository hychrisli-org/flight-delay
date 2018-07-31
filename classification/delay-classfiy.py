import pandas as pd
import numpy as np
from os.path import expanduser, isfile
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import normalize
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import f1_score


home = expanduser("~")
dataFile = home + '/data/255-team-proj/export/2017.csv'

df = pd.read_csv(dataFile)

print(list(df.columns.values))

df.drop(['year','fl_date','unique_carrier', 'flight_num', 'origin'],  axis=1, inplace=True)

dfLabel = df[['label']]
df.drop('label', axis=1, inplace=True)

# print (df[:1])
# print (dfLabel)

Y = dfLabel.values.ravel()
X = df.values

# normalize each feature
normX = normalize(X, axis=0)

print (normX[1])
X_train, X_test, y_train, y_test = train_test_split(normX, Y, test_size=0.25, stratify=Y)

clf = RandomForestClassifier(n_estimators=50, verbose=True)
clf = clf.fit(X_train, y_train)
pdY = clf.predict(X_test)
print(f1_score(y_test, pdY, average='macro'))



#df = df.values

# print (df[1])