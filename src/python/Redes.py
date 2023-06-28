from sklearn.feature_extraction.text import CountVectorizer
import pysentimiento
from tensorflow.keras.models import load_model
import joblib
import requests
import json
from time import sleep
import pandas as pd
import matplotlib.pyplot as plt
import nltk
import numpy as np
import pickle

nltk.download('wordnet')



# Importar la lista desde el archivo
with open('X.pickle', 'rb') as archivo:
    X = pickle.load(archivo) #Necesario para nuevas predicciones

modelo = joblib.load('MLPPropio.pkl')
analyzer = pysentimiento.create_analyzer(task="sentiment", lang="es")


def recolectar(tematica,number_tweets):

  url = "https://api.apify.com/v2/acts/quacker~twitter-scraper/run-sync-get-dataset-items?token=apify_api_SZSJDaRLUriTHst34WimWaysfrMkLx15hcXc"
  headers = {"Content-Type": "application/json"}
  tematica=tematica
  data = {
  "addTweetViewCount": True,
  "addUserInfo": True,
  "collectOriginalRetweetOnly": False,
  "debugLog": False,
  "extendOutputFunction": "async ({ data, item, page, request, customData, Apify }) => {\n  return item;\n}",
  "extendScraperFunction": "async ({ page, request, addSearch, addProfile, _, addThread, addEvent, customData, Apify, signal, label }) => {\n \n}",
  "handle": [
    "NoticiaSRCN"
  ],
  "handlePageTimeoutSecs": 500,
  "maxIdleTimeoutSecs": 60,
  "maxRequestRetries": 6,
  "mode": "own",
  "profilesDesired": 1000,
  "proxyConfig": {
    "useApifyProxy": True
  },
  "searchMode": "live",
  "skipRetweets": False,
  "tweetsDesired": number_tweets,
  "useAdvancedSearch": False,
  "useCheerio": True,
  "startUrls": [],
  "relativeToDate": "",
  "relativeFromDate": "",
  "customData": {}
  }

  response = requests.post(url, headers=headers, json=data)


  def procesar(): 
  # Definir la URL de la API de Apify
    url = "https://api.apify.com/v2/acts/quacker~twitter-scraper/runs/last/dataset/items?token=apify_api_SZSJDaRLUriTHst34WimWaysfrMkLx15hcXc"

  # Realizar la solicitud GET a la API
    response = requests.get(url)

  # Cargar los datos en un marco de datos de pandas
    data = response.json()
    df = pd.DataFrame(data)
    tweets=df['full_text'].tolist()

    return tweets



# Función para clasificar si un tweet fue publicado por un bot o un usuario humano
def clasificar_bot_human(tweet):
  # Se inicializa un objeto de CountVectorizer para contar las frecuencias de las palabras
  vectorizer = CountVectorizer(max_features=1000)
  
  # Se entrena el objeto CountVectorizer con el conjunto de entrenamiento
  vectorizer.fit(X) #X es el conjunto de entrenamiento utilizado en la creación del modelo

  # Se transforma el nuevo tweet en un vector de frecuencia de palabras
  new_string = tweet
  new_string_counts = vectorizer.transform([new_string]).toarray()

  # Se asegura de que el vector tenga la dimensión correcta
  if new_string_counts.shape[1] != 1000:
      padding = np.zeros((1, 1000 - new_string_counts.shape[1]))
      new_string_counts = np.hstack((new_string_counts, padding))

  # Se utiliza el modelo entrenado para predecir si el tweet fue publicado por un bot
  new_string_pred_prob = modelo.predict(new_string_counts)

  # Se devuelve la probabilidad de que el tweet sea de un bot
  return new_string_pred_prob


# Función para analizar el sentimiento de los tweets
def sentimiento(tweets):
  # Se inicializan las variables necesarias
  num_tweets=len(tweets)
  pred=[]
  number_bots=0

  # Se clasifican los tweets como bot o humano y se excluyen los tweets de bots
  for i in tweets:
    bot_or_not=clasificar_bot_human(i)
    if bot_or_not == 1:
      number_bots+=1
      tweets.remove(i)

  # Se analiza el sentimiento de los tweets restantes
  for i in tweets:
    pred_aux=analyzer.predict(i)
    pred.append(pred_aux.output)

  # Se devuelve una lista con las predicciones de sentimiento de los tweets restantes, el número de bots excluidos y el número total de tweets analizados
  return pred,number_bots,num_tweets

def graficar(pred, number_bots, tematica, num_tweets):
  # Crear un dataframe a partir de las predicciones
  df = pd.DataFrame(pred)
  df = df.rename(columns={0: 'prediccion'})

  # Reemplazar los valores de las etiquetas de sentimiento por su traducción correspondiente
  df.replace({'NEG': 'Negativa'}, inplace=True)
  df.replace({'NEU': 'Neutral'}, inplace=True)
  df.replace({'POS': 'Positiva'}, inplace=True)

  # Definir los colores para cada tipo de sentimiento
  colors = ["#c81c1c", "#a3a3a3", "#3fcd20"]

  # Agrupar las predicciones por sentimiento y contar la cantidad de ocurrencias de cada sentimiento
  counts = df.groupby('prediccion').size()

  # Crear un gráfico de barras en el primer subgráfico
  fig, ax = plt.subplots(ncols=2, figsize=(10, 5))
  ax[0].bar(counts.index, counts.values, color=colors, width=0.6)

  # Configurar los títulos y etiquetas del primer subgráfico
  ax[0].set_title('Posiciones en Twitter sobre ' + tematica)
  ax[0].set_xlabel('Opinion')
  ax[0].set_ylabel('Número de ocurrencias')

  # Configurar el texto que muestra el número de bots detectados y excluidos del análisis
  #plt.text(-1, 0, "Numero de bots detectados y excluidos del analisis: "+str(number_bots), ha='right', fontsize=9)

  # Definir las categorías y valores para el gráfico de torta en el segundo subgráfico
  categorias = ["Bot", 'Humano']
  valores = [number_bots, num_tweets - number_bots]
  colores = ['lightblue', 'lightgreen']

  # Crear un gráfico de torta en el segundo subgráfico
  ax[1].pie(valores, labels=categorias, colors=colores, autopct='%1.1f%%')
  ax[1].set_title('Bots identificados y excluidos del análisis')

  # Ajustar espaciado entre subgráficos
  fig.subplots_adjust(wspace=0.7)

  # Mostrar el gráfico
  plt.show()
  return fig


def analisis(tematica, number_tweets):
  # Recolectar los tweets
  print('Recolectando los tweets...')
  recolectar(tematica, number_tweets)

  # Procesar los tweets
  print('Procesando los tweets...')
  tweets = procesar()

  # Analizar el sentimiento y excluir los bots
  print('Analizando el sentimiento y excluyendo bots...')
  pred, number_bots, num_tweets = sentimiento(tweets)

  # Crear el reporte gráfico
  print('Creando el reporte gráfico...')
  graficar(pred, number_bots, tematica, num_tweets)