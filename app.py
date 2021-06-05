from flask import Flask, render_template, request, jsonify, redirect, url_for
from bd import obtenir_connexion

app = Flask(__name__)


@app.route('/')
def acceuil():
    return render_template('index.html')

@app.route('/obtenir_description')
def obtenir_description():
    connexion = obtenir_connexion()
    curseur = connexion.cursor()
    curseur.execute('SELECT * FROM departements')
    lstDescription = curseur.fetchall()
    connexion.close()

    return jsonify(lstDescription)

@app.route('/obtenir_sousdescription/<string:id>')
def obtenir_sousdescription(id):
    connexion = obtenir_connexion()
    curseur = connexion.cursor()
    curseur.execute('SELECT * FROM sousdepartements WHERE idDepartement=%s', (id,))
    lstSousDescription = curseur.fetchall()
    connexion.close()

    return jsonify(lstSousDescription)

@app.route('/obtenir_categorie/<string:id>')
def obtenir_categorie(id):
    connexion = obtenir_connexion()
    curseur = connexion.cursor()
    curseur.execute('SELECT * FROM categories WHERE idSousDepartement=%s', (id,))
    lstCategorie = curseur.fetchall()
    connexion.close()
    
    return jsonify(lstCategorie)

@app.route('/cree_produit', methods=['POST'])
def cree_produit_post():
    produit = request.json

    connexion = obtenir_connexion()
    curseur = connexion.cursor()
    curseur.execute('INSERT INTO produits(nom, dpartement, sousDepartement, categorie) VALUES (%s, %s, %s, %s)', (produit[0], produit[1], produit[2], produit[3]))
    connexion.commit()
    connexion.close()

    return jsonify(produit)

@app.route('/recherche')
def recherche():
    return render_template('recherche.html')

@app.route('/obtenir_recomandation/<string:recherche>')
def obtenir_recomandation(recherche):
    connexion = obtenir_connexion()
    curseur = connexion.cursor()
    var = '%' + recherche + '%'
    curseur.execute('SELECT * FROM produits WHERE nom LIKE %s LIMIT 5', (var,))
    lstRecomandation = curseur.fetchall()
    connexion.close()
    return jsonify(lstRecomandation)

@app.route('/obtenir_AllProduits/<string:recherche>')
def obtenir_AllProduits(recherche):
    connexion = obtenir_connexion()
    curseur = connexion.cursor()
    var = '%' + recherche + '%'
    curseur.execute('SELECT * FROM produits WHERE nom LIKE %s', (var,))
    lstAllProduits = curseur.fetchall()
    connexion.close()
    return jsonify(lstAllProduits)

if __name__ == '__main__':
    app.run(debug=True)
