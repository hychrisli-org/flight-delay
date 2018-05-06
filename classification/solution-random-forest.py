import pandas as pd
from os.path import expanduser
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import normalize, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import f1_score, classification_report
from imblearn.over_sampling import SMOTE

home = expanduser("~")
dataFile = home + '/data/255-team-proj/export/cluster1-all-weather.csv'

df = pd.read_csv(dataFile)
df = df.dropna()
df = df.sample(n=500000)

df.drop(['fl_date'], axis=1, inplace=True)
dfLabel = df[['label']]
df.drop('label', axis=1, inplace=True)

print(list(df.columns.values))

# print (df[:1])
# print (dfLabel)


def toAsciiStr(x):
    vals = [str(ord(c)) for c in x]
    return ''.join(vals)


df['unique_carrier'] = df['unique_carrier'].apply(lambda x: toAsciiStr(x))


Y = dfLabel.values.ravel()
X = df.values

standardScaler = StandardScaler().fit(X)
print(standardScaler.mean_)
print(standardScaler.scale_)
X = standardScaler.transform(X)


# normalize each feature
normX = normalize(X)
print (normX[1])

X_train, X_test, y_train, y_test = train_test_split(normX, Y, test_size=0.25, stratify=Y)
sm = SMOTE(n_jobs=4)
X_train, y_train = sm.fit_sample(X_train, y_train)

clf = RandomForestClassifier(n_estimators=600, max_depth=6, verbose=True, n_jobs=-1)
clf = clf.fit(X_train, y_train)
pdY = clf.predict(X_test)
print(f1_score(y_test, pdY, average='macro'))
print(classification_report(y_test, pdY))


#df = df.values

# print (df[1])
