import xgboost
from os.path import expanduser
import pandas as pd
from sklearn.preprocessing import normalize, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import StratifiedKFold, RandomizedSearchCV

home = expanduser("~")
dataFile = home + '/data/255-team-proj/export/sfo.csv'

df = pd.read_csv(dataFile)
# df = df.sample(n=500000)

df.drop(['year', 'fl_date', 'dest'], axis=1, inplace=True)

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

standardScaler = StandardScaler().fit(X)
print(standardScaler.mean_)
print(standardScaler.scale_)
X = standardScaler.transform(X)

print(X[1])

# normalize each feature
normX = normalize(X)

print (normX[1])

X_train = normX
y_train = Y

X_train, X_test, y_train, y_test = train_test_split(normX, Y, test_size=0.25, stratify=Y)

sm = SMOTE(n_jobs=4)
X_train, y_train = sm.fit_sample(X_train, y_train)

clf = xgboost.XGBRegressor(learning_rate=0.02, subsample=0.6, colsample_bytree=0.8, max_depth=10, gamma=1.5,
                           min_child_weight=1, n_estimators=600, objective='binary:logistic', n_jobs=4)

clf.fit(X_train, y_train)
pdY = clf.predict(X_test)
# print (pdY)
preds = [round(value) for value in pdY]
# print (preds)
print(f1_score(y_test, preds, average='macro'))
