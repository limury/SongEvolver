import pandas as pd


if __name__ == "__main__":
    data = pd.read_csv('src/scripts/data.csv', index_col=0)
    dataMin = data[data.columns[:-3]].min()
    dataMax = data[data.columns[:-3]].max()
    data = pd.concat([dataMin, dataMax-dataMin], axis=1)
    data.columns = ['subtract', 'divide']
    data = data.transpose()
    data.to_csv('src/scripts/normalizationParams.csv')
    print(data)