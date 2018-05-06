

def readAirportClusters():
    d = {}
    with open("data/cluster.dat") as f:
        for line in f:
            (key, val) = line.split()
            d[key] = val
    return d
