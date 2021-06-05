'use strict'

let lstProduits = []

$('#description').keyup(function () {
    $('ul').empty()
    let recherche = $('#description').val()

    if (recherche != '' && recherche != null) {
        $.get({
            url: '/obtenir_recomandation/' + recherche,
            data: [],
            contentType: "application/json",
            dataType: 'json',
            success: function (donnees, status, jqXHR) {
                lstProduits = []
                donnees.forEach(element => {
                    $('#ulAutocomplete').append(`<li>${element[1]}</li>`)
                    lstProduits.push(element)
                });
            },
            error: function (erreur) {
                alert(erreur)
            }
        })
    }
})

$('#soumettre').click(function () {
    let recherche = $('#description').val()
    if (recherche != '' && recherche != null) {
        $.get({
            url: '/obtenir_AllProduits/' + recherche,
            data: [],
            contentType: "application/json",
            dataType: 'json',
            success: function (donnees, status, jqXHR) {
                lstProduits = []
                donnees.forEach(element => {
                    lstProduits.push(element)
                });
                creeTableau()
            },
            error: function (erreur) {
                alert(erreur)
            }
        })
    }
    else {
        lstProduits = []
        creeTableau()
    }
})

function creeTableau() {
    $('table').remove()

    $('form').after(`<table></table>`)
    $('table').attr('class', 'table container table-hover')

    if (lstProduits.length > 0) {
        $('table').append(`<thead></thead>`)
        $('thead').append(`<tr></tr>`)
        $('tr').append(`<th>Nom</th>`)
        $('tr').append(`<th>Département</th>`)
        $('tr').append(`<th>Sous-département</th>`)
        $('tr').append(`<th>Catégorie</th>`)
        $('table').append(`<tbody></tbody>`)
        lstProduits.forEach(element => {
            $('tbody').append(`<tr><td>${element[1]}</td><td>${element[2]}</td><td>${element[3]}</td><td>${element[4]}</td></tr>`)
        })
    }

    $('#description').keyup()
    lstProduits = []
}