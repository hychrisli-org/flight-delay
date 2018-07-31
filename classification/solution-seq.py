import xgboost
import numpy as np
from os.path import expanduser
import pandas as pd
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
from sklearn.preprocessing import normalize, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, classification_report
from imblearn.over_sampling import SMOTE
from collections import Counter
from xgboost import plot_importance
from matplotlib import pyplot
from sklearn.model_selection import StratifiedKFold, RandomizedSearchCV

home = expanduser("~")
dataFile = home + '/data/255-team-proj/export/sfo-seq.csv'

df = pd.read_csv(dataFile)
df = df.sample(n=50000)

df.drop(['fl_date'], axis=1, inplace=True)

dfLabel = df[['label']]
df.drop('label', axis=1, inplace=True)
print(list(df.columns.values))


def toAsciiStr(x):
    vals = [str(ord(c)) for c in x]
    return ''.join(vals)



df['unique_carrier'] = df['unique_carrier'].apply(lambda x: toAsciiStr(x))

print (df[:1])

Y = dfLabel.values.ravel()
X = df.values

standardScaler = StandardScaler().fit(X)
print(standardScaler.mean_)
print(standardScaler.scale_)
X = standardScaler.transform(X)

print(X[1])

# normalize each feature
normX = normalize(X)

print (normX[1])

X_train, X_test, y_train, y_test = train_test_split(normX, Y, test_size=0.25, shuffle=False)

X_train = np.reshape(X_train, (X_train.shape[0], 1, X_train.shape[1]))
X_test = np.reshape(X_test, (X_test.shape[0], 1, X_test.shape[1]))


look_back = 1
model = Sequential()
model.add(LSTM(1, input_shape=(1, 12)))
model.add(Dense(1))
model.compile(loss='mean_squared_error', optimizer='adam')
model.fit(X_train, y_train, epochs=10, batch_size=1, verbose=2)

pdY = model.predict(X_test)
preds = [ 1 if value >= 0.25 else 0 for value in pdY]

print (preds)

truCounter = Counter(y_test)
predCounter = Counter(preds)

print("ground truth: ", truCounter.most_common())
print("pred: ", predCounter.most_common())
print(f1_score(y_test, preds, average='macro'))
print(classification_report(y_test, preds))
