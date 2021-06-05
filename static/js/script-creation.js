'use strict'

$.get({
    url: '/obtenir_description',
    data: [],
    contentType: "application/json",
    dataType: 'json',
    success: function (donnees, status, jqXHR) {
        donnees.forEach(element => {
            $('#departement').append(`<option value="${element[0]}">${element[1]}</option>`)
        });
    },
    error: function (erreur) {
        alert(erreur)
    }
})

$('#departement').change(function () {
    $("#sousdepartement option[value!='']").each(function () {
        $(this).remove();
    });
    $("#categorie option[value!='']").each(function () {
        $(this).remove();
    });

    const id = $("#departement").val();
    if (id != null && id != "") {
        $.get({
            url: '/obtenir_sousdescription/' + id,
            data: [],
            contentType: "application/json",
            dataType: 'json',
            success: function (donnees, status, jqXHR) {
                donnees.forEach(element => {
                    $('#sousdepartement').append(`<option value="${element[0]}">${element[1]}</option>`)
                });
            },
            error: function (erreur) {
                alert(erreur)
            }
        })
    }
});

$('#sousdepartement').change(function () {
    $("#categorie option[value!='']").each(function () {
        $(this).remove();
    });

    const id = $("#sousdepartement").val();
    if (id != null && id != "") {
        $.get({
            url: '/obtenir_categorie/' + id,
            data: [],
            contentType: "application/json",
            dataType: 'json',
            success: function (donnees, status, jqXHR) {
                donnees.forEach(element => {
                    $('#categorie').append(`<option value="${element[0]}">${element[1]}</option>`)
                });
            },
            error: function (erreur) {
                alert(erreur)
            }
        })
    }
});

$('#soumettre').click(function () {
    $("form[name='formCreer']").validate({
        rules: {
            description: "required",
            departement: "required",
            sousdepartement: "required",
            categorie: "required"
        },
        messages: {
            description: "La description est invalide!",
            departement: "Le département est invalide!",
            sousdepartement: "Le sous département est invalide!",
            categorie: "La catégorie est invalide!"
        },
        submitHandler: function () {
            EnregisterDonner()
        }
    });
})

function EnregisterDonner() {
    let desc = $('#description').val()
    let dep = $('#departement option:selected').val()
    let sdep = $('#sousdepartement option:selected').val()
    let cat = $('#categorie option:selected').val()
    let donnees = [desc, dep, sdep, cat]
    $.post({
        url: '/cree_produit',
        data: JSON.stringify(donnees),
        contentType: "application/json",
        dataType: 'json',
        success: function (donnees, status, jqXHR) {
            $('#alert').removeClass('d-none')
            setTimeout(function () {
                $('#alert').addClass('d-none')
            }, 2000);
        },
        error: function (erreur) {
            alert(erreur)
        }
    })
}
