import xgboost
from os.path import expanduser
import pandas as pd
from sklearn.preprocessing import normalize, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import StratifiedKFold, RandomizedSearchCV

home = expanduser("~")
dataFile = home + '/data/255-team-proj/export/cluster1-2017.csv'

df = pd.read_csv(dataFile)
df = df.sample(n=50000)

df.drop(['year','fl_date', 'cluster'],  axis=1, inplace=True)

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

# X_train, X_test, y_train, y_test = train_test_split(normX, Y, test_size=0.25, stratify=Y)

param = {'max_depth':6, 'n_estimators':100, 'silent':0, 'objective':'binary:logistic' }
num_round = 2

srchParams = {
        'max_depth': [3, 6, 10, 14],
        'min_child_weight': [1, 5, 10],
        'gamma': [0.5, 1, 1.5, 2, 5],
        'subsample': [0.6, 0.8, 1.0],
        'colsample_bytree': [0.6, 0.8, 1.0],
        }


sm = SMOTE()
X_train, y_train = sm.fit_sample(X_train, y_train)

folds = 3
paramComb = 5

clf = xgboost.XGBRegressor(learning_rate=0.02, n_estimators=600, objective='binary:logistic')
skf = StratifiedKFold(n_splits=folds, shuffle = True, random_state = 1001)
randomSearch = RandomizedSearchCV(clf, param_distributions=srchParams, n_iter=paramComb, scoring='roc_auc', n_jobs=4, cv=skf.split(X_train,y_train), verbose=3, random_state=1001 )

# Best [CV]  subsample=0.6, colsample_bytree=0.8, max_depth=6, gamma=0.5, min_child_weight=1, score=0.691634742326, total=  13.9s
# Best With imbalance Learn
# [CV]  subsample=0.8, colsample_bytree=0.8, max_depth=14, gamma=1.5, min_child_weight=10, score=0.914886687653, total= 1.7min

# clf.fit(X_train, y_train)
# pdY = clf.predict(X_test)
# print (pdY)
# preds = [round(value) for value in pdY]
# print (preds)
# print(f1_score(y_test, preds, average='macro'))

randomSearch.fit(X_train, y_train)
print (randomSearch.best_estimator_)
