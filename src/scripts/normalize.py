import pandas as pd

if __name__ == "__main__":
    data = pd.read_csv('src/data/data.csv', index_col=0)
    # extract columns that we want to normalize
    columns = data.columns[:-3]
    # get maximum and minimum
    dataMax = data[columns].max()
    dataMin = data[columns].min()
    # print normalization parameters
    divideBy = dataMax - dataMin
    output = pd.concat([dataMin, divideBy], axis=1)
    output.columns = ['subtract', 'divide']
    output = output.transpose()
    output.to_csv('src/data/spotifyTrackDataNormalizationParams.csv')
    print(output)