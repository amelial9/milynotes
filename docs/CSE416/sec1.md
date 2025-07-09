---
hide:
  - navigation
  - toc
---

<small><i>Last modified: {{ git_revision_date_localized }}</i></small>

<div class="back-button">
    <br>
    <a href="javascript:history.back()">← Back</a>
    <br>
    <br>
</div>

# Section 1

```
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
from sklearn.linear_model import Ridge
from sklearn.linear_model import Lasso
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score

np.random.seed(416)


crime = pd.read_csv('Philadelphia_Crime_Rate_noNA.csv')
print(crime.head())

# One hot encoding all the county values
one_hot = pd.get_dummies(crime['County'])
#print(one_hot)

# Then concatinate the one hot columns with original dataset.
crime = pd.concat([crime, one_hot], axis=1)

# We need to drop any and all NaN values to filter our data. So we drop any rows that contain a NaN 
crime = crime.dropna()
print(crime)

input_cols = ['HousePrice', 'MilesPhila', 'PopChg', 'Bucks', 'Chester', 'Delaware', 'Montgome', 'Phila']
output_col = 'CrimeRate'


train, test = train_test_split(crime, test_size=0.2)

train_X = train[input_cols]
train_y = train[output_col]

test_X = test[input_cols]
test_y = test[output_col]

# Normalize training and test set input data (X) using statistics generated from the training set.

scaler = StandardScaler()
scaler.fit(train_X)
train_X_norm = scaler.transform(train_X)
test_X_norm = scaler.transform(test_X)

print("data type after normalizaton:", type(train_X_norm))
pd.DataFrame(train_X_norm)


ridge_model = Ridge(alpha=1.0)

def rmse(model, X, y):
    predictions = model.predict(X)
    return np.sqrt(mean_squared_error(predictions, y))

ridge_model.fit(train_X_norm, train_y)
rmse(ridge_model, train_X_norm, train_y)

# Perform 5-fold cross validation with Ridge model
ridge_CV_scores = cross_val_score(ridge_model, train_X, train_y, cv=5, scoring=rmse)

# Perform 5-fold cross validation on Ridge models with a range of alpha values. # For each alpha, print the alpha value and the corresponding mean CV score.
for reg_coef in [0.0001, 0.1, 1, 10, 100, 1000, 10e4, 10e7]:
    ridge_model = Ridge(alpha=reg_coef)
    ridge_CV_scores = cross_val_score(ridge_model, train_X_norm, train_y, cv=5, scoring=rmse)
    print(reg_coef, ridge_CV_scores.mean(), sep='\t')


print("Reg coeff. | ", "Intercept | ", input_cols)
print("_________________________________________________")
for reg_coef in [0.0001, 0.1, 1, 10, 100, 1000, 10e4, 10e7]:
    ridge_model = Ridge(alpha=reg_coef)
    ridge_model.fit(train_X_norm, train_y)
    print(reg_coef," | ", ridge_model.intercept_, " | ", ridge_model.coef_)
    print()
    
linear_reg_model = LinearRegression()
linear_reg_model.fit(train_X_norm, train_y)
print(linear_reg_model.intercept_, linear_reg_model.coef_)

print("Ridge", rmse(Ridge(alpha=100).fit(train_X_norm, train_y), test_X_norm, test_y))
print("LinearRegression", rmse(LinearRegression().fit(train_X_norm, train_y), test_X_norm, test_y))

print("Ridge", rmse(Ridge(alpha=100).fit(train_X, train_y), test_X, test_y))
print("LinearRegression", rmse(LinearRegression().fit(train_X, train_y), test_X, test_y))
```
