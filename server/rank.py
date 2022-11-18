import requests
import pandas as pd
import sys

url = 'https://www.baseball-reference.com/leagues/majors/2022.shtml'
html = requests.get(url).content
df_list = pd.read_html(html)
df = df_list[-1]
stats = []
ranks = []
abb = {
    "Los Angeles Dodgers"   : "LAD", 
    "Boston Red Sox"        : "Bos", 
    "New York Mets"         : "NYM",
    "Toronto Blue Jays"     : "Tor",
    "St. Louis Cardinals"   : "StL",
    "New York Yankees"      : "NYY", 
    "Cleveland Guardians"   : "Cle",
    "Colorado Rockies"      : "Col",
    "Philadelphia Phillies" : "Phi",
    "Houston Astros"        : "Hou",
    "Minnesota Twins"       : "Min",
    "San Francisco Giants"  : "SF",
    "Washington Nationals"  : "Wsh",
    "San Diego Padres"      : "SD",
    "Chicago Cubs"          : "ChC", 
    "Milwaukee Brewers"     : "Mil", 
    "Chicago White Sox"     : "ChW", 
    "Atlanta Braves"        : "Atl", 
    "Cincinnati Reds"       : "Cin",
    "Miami Marlins"         : "Mia",
    "Kansas City Royals"    : "KC",
    "Texas Rangers"         : "Tex",
    "Seattle Mariners"      : "Sea",
    "Arizona Diamondbacks"  : "Ari", 
    "Tampa Bay Rays"        : "TB",
    "Los Angeles Angels"    : "LAA",
    "Baltimore Orioles"     : "Bal",
    "Pittsburgh Pirates"    : "Pit", 
    "Oakland Athletics"     : "Oak",
    "Detroit Tigers"        : "Det"
}

for index, row in df.iterrows():
    if index > 29:
        break
    team = row['Tm']
    hits = int(row['H'])
    runs = int(row['R'])
    bb = int(row['BB'])
    so = int(row['SO'])
    score = (so - hits - bb - 2*runs) / int(row['G'])
    stats.append({"team":team, "score": score})

stats.sort(key=lambda x: x['score'])

for index, tm in enumerate(stats):
    #print(index, tm)
    ranks.append({abb[tm['team']]:index+1})

print(ranks)
sys.stdout.flush()