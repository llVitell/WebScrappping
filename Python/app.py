import requests
from bs4 import BeautifulSoup
import json

url = 'https://listado.mercadolibre.com.pe'
itemToFilter = 'celular'

response = requests.get(url + '/' + itemToFilter)

soup = BeautifulSoup(response.content, 'html.parser')

products = soup.find_all('div',class_ = 'poly-card')
product_list = []

for item in products:
    title = item.find('h2', class_= 'poly-component__title').text
    price = item.find('div', class_= 'poly-price__current').text

    product_list.append({
        'title': title,
        'price': price
    })

for product in product_list:
    print(json.dumps(product, ensure_ascii=False, indent=4))